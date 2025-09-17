import { useState } from "react";
import { service } from "../../services/config.services";
import { AxiosError } from "axios";
import { initialEnrollmentForm, type EnrollmentFormData } from "../../types/types";
import EnrollmentForm from "../../components/private/enrollment/EnrollmentForm";

type PropsEnrollment = {
  courseId: string;
}

function EnrollmentNewPage(props: PropsEnrollment) {
  const [formData, setFormData] = useState<EnrollmentFormData>(initialEnrollmentForm);
  const handleSubmit = async (formData: EnrollmentFormData) => {
    try {
      await service.post(`/enrollment/${props.courseId}`, { ...formData });
      return null;
    } catch (error) {
      console.log("Error login: ", error);
      if (error instanceof AxiosError && error.response) {
        return Object.fromEntries(
          Object.entries(error.response.data).map(([fieldName, value]) => [
            fieldName,
            typeof value === "object" && value && "message" in value ? value.message : "unknown error",
          ])
        );
      }
      return { general: "Unknown error" };
    }
  };

  return (
    <div>
      <EnrollmentForm actionText="Create" handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
    </div>
  );
}
export default EnrollmentNewPage;

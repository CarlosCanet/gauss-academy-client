import { useState } from "react";
import { AxiosError } from "axios";
import { initialEnrollmentForm, type EnrollmentFormData } from "../types/types";
import EnrollmentForm from "../components/enrollment/EnrollmentForm";
import { createEnrollment } from "../services/enrollment.services";

type PropsEnrollment = {
  courseId: string;
}

function EnrollmentNewPage(props: PropsEnrollment) {
  const [formData, setFormData] = useState<EnrollmentFormData>(initialEnrollmentForm);
  const handleSubmit = async (formData: EnrollmentFormData) => {
    try {
      await createEnrollment(props.courseId, formData);
      return null;
    } catch (error) {
      console.error("Error login: ", error);
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

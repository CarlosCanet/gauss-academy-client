import { useState } from "react";
import { AxiosError } from "axios";
import { initialClassForm, type ClassFormData } from "../types/types";
import ClassForm from "../components/classCourse/ClassForm";
import { createClass } from "../services/class.services";

type PropsClass = {
  courseId: string;
}

function ClassNewPage(props: PropsClass) {
  const [formData, setFormData] = useState<ClassFormData>(initialClassForm);
  const handleSubmit = async (formData: ClassFormData) => {
    try {
      await createClass(props.courseId, formData);
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
      <ClassForm actionText="Create" handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
    </div>
  );
}
export default ClassNewPage;

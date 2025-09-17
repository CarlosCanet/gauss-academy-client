import { useState } from "react";
import CourseForm from "../../components/private/course/CourseForm";
import { service } from "../../services/config.services";
import { initialCourseForm, type CourseFormData } from "../../types/types";
import { AxiosError } from "axios";

function CourseNewPage() {
  const [formData, setFormData] = useState<CourseFormData>(initialCourseForm);
  const handleSubmit = async (formData: CourseFormData) => {
    try {
      await service.post("/course", { ...formData });
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
      <CourseForm actionText="Create" handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
    </div>
  );
}
export default CourseNewPage;

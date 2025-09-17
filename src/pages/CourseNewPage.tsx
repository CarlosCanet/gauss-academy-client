import { useState } from "react";
import CourseForm from "../components/course/CourseForm";
import { initialCourseForm, type CourseFormData } from "../types/types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { createCourse } from "../services/course.services";

function CourseNewPage() {
  const [formData, setFormData] = useState<CourseFormData>(initialCourseForm);
  const navigate = useNavigate();
  
  const handleSubmit = async (formData: CourseFormData) => {
    try {
      await createCourse(formData);
      navigate(-1);
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
      <CourseForm actionText="Create" handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
    </div>
  );
}
export default CourseNewPage;

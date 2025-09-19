import { useState } from "react";
import CourseForm from "../components/course/CourseForm";
import { initialCourseForm, type CourseFormData } from "../types/types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { createCourse } from "../services/course.services";
import { Alert } from "@mui/material";

function CourseNewPage() {
  const [formData, setFormData] = useState<CourseFormData>(initialCourseForm);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: CourseFormData) => {
    try {
      await createCourse(formData);
      navigate(-1);
      return null;
    } catch (error) {
      console.error("Error login: ", error);
      setShowErrorAlert(true);
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
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error with the course. Please try again.
        </Alert>
      )}
    </div>
  );
}
export default CourseNewPage;

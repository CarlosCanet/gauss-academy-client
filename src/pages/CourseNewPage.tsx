import { useState } from "react";
import CourseForm from "../components/course/CourseForm";
import { initialCourseForm, type CourseFormData } from "../types/types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { createCourse } from "../services/course.services";
import { Alert, Box, Typography } from "@mui/material";

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 2, md: 4 }, }}>
        <Typography variant="h4" textAlign="center">Create new course</Typography>
        <CourseForm actionText="Create" handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      </Box>
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error with the course. Please try again.
        </Alert>
      )}
    </div>
  );
}
export default CourseNewPage;

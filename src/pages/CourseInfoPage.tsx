import { useNavigate, useParams } from "react-router";
import CourseForm from "../components/course/CourseForm";
import { initialCourseForm, type CourseFormData } from "../types/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { editCourse, getCourse, transformCourseToForm } from "../services/course.services";
import LoadingGauss from "../components/UI/LoadingGauss";
import { Alert } from "@mui/material";

function CourseInfoPage() {
  const [formData, setFormData] = useState<CourseFormData>(initialCourseForm);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const { courseId } = useParams();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const course = await getCourse(courseId!);
      setFormData(transformCourseToForm(course));
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
  };

  const handleSubmit = async (formData: CourseFormData) => {
    try {
      await editCourse(courseId!, formData);
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
      {!formData ? <LoadingGauss /> : <CourseForm actionText="Edit" handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />}
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error with the course. Please try again.
        </Alert>
      )}
    </div>
  );
}
export default CourseInfoPage;

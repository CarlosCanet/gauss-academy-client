import { useNavigate } from "react-router";
import CourseInfoForm from "../../components/private/courseInfo/CourseInfoForm";
import { service } from "../../services/config.services";
import type { CourseInfoFormData, CourseInfoFormErrors } from "../../types/types";
import { AxiosError } from "axios";

function CourseInfoPage() {
  const navigate = useNavigate();
  const handleSubmit = async (formData: CourseInfoFormData) => {
    try {
      await service.put("/user/profile", { ...formData });
      navigate("/login");
      return null;
    } catch (error) {
      console.log("Error login: ", error);
      if (error instanceof AxiosError && error.response) {
        return Object.fromEntries(Object.entries(error.response.data).map(([fieldName, value]) => [fieldName, typeof value === "object" && value && "message" in value ? value.message : "unknown error"]));
      }
      return { general: "Unknown error" };
    }
  };

  return (
    <div>
      <CourseInfoForm actionText="Edit" handleSubmit={handleSubmit} />
    </div>
  );
}
export default CourseInfoPage;

import { useNavigate, useParams } from "react-router";
import { service } from "../services/config.services";
import { initialClassForm, type ClassFormData } from "../types/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { transformClassToForm, transformResponseToClass } from "../utils/transformData";
import ClassForm from "../components/classCourse/ClassForm";

function ClassInfoPage() {
  const [formData, setFormData] = useState<ClassFormData>(initialClassForm);
  const navigate = useNavigate();
  const { courseId } = useParams();
  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/course/${courseId}`);
      const oneClass = transformResponseToClass(response.data)
      setFormData(transformClassToForm(oneClass));
    } catch (error) {
      console.log(error)
    }
  };


  const handleSubmit = async (formData: ClassFormData) => {
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
      <ClassForm actionText="Edit" handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
    </div>
  );
}
export default ClassInfoPage;

import { useEffect, useState } from "react";
import type { CourseClass } from "../types/types";
import { service } from "../services/config.services";
import { transformResponseToClasses } from "../utils/transformData";
import ClassList from "../components/classCourse/ClassList";
import { useParams } from "react-router";



function CourseClassListPage() {
  const [courseClasses, setCourseClasses] = useState<CourseClass[]>([]);
  const { courseId } = useParams();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/class/${courseId}`);
      console.log(response.data);
      setCourseClasses(transformResponseToClasses(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return <ClassList classList={courseClasses} />;
}
export default CourseClassListPage;

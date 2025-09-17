import { useContext, useEffect, useState } from "react";
import type { Course, Enrollment } from "../types/types";
import { service } from "../services/config.services";
import CourseList from "../components/course/CourseList";
import { AuthContext } from "../context/auth.context";
import { Button } from "@mui/material";

function MyCoursesPage() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const { role } = useContext(AuthContext);
  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      if (role === "Admin") {
        const response = await service.get("/course");
        console.log("Admin:", response.data);
        setMyCourses(response.data);
        return;
      }
      const response = await service.get("/enrollment/my-enrollments");
      const enrollments: Enrollment[] = response.data;
      setMyCourses(enrollments.map((enrollment) => enrollment.course as Course));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      const response = await service.delete(`/course/${courseId}`);
      console.log(response);
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <CourseList courseList={myCourses} onDelete={onDeleteCourse} />
      {role === "Admin" && (
          <Button href="/course/newCourse" variant="contained">Create new course</Button>
      )}
    </div>
  );
}
export default MyCoursesPage;

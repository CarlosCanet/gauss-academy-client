import { useContext, useEffect, useState } from "react";
import type { Course } from "../types/types";
import CourseList from "../components/course/CourseList";
import { AuthContext } from "../context/auth.context";
import { Button } from "@mui/material";
import { deleteCourse, getAllCourses } from "../services/course.services";
import { getMyEnrollments } from "../services/enrollment.services";

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
        const courses = await getAllCourses();
        console.log("Admin:", courses);
        setMyCourses(courses);
        return;
      }
      const enrollments = await getMyEnrollments();
      setMyCourses(enrollments.map((enrollment) => enrollment.course as Course));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      const response = await deleteCourse(courseId);
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

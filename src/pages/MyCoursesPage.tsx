import { useContext, useEffect, useState } from "react";
import type { Course } from "../types/types";
import CourseList from "../components/course/CourseList";
import { AuthContext } from "../context/auth.context";
import { Button } from "@mui/material";
import { deleteCourse, getAllActiveCourses, getAllCourses } from "../services/course.services";
import { getMyEnrollments } from "../services/enrollment.services";
import LoadingGauss from "../components/UI/LoadingGauss";

function MyCoursesPage() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [activeCourses, setActiveCourses] = useState<Course[]>([]);
  const { role } = useContext(AuthContext);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      if (role === "Admin") {
        const courses = await getAllCourses();
        setActiveCourses(courses);
        return;
      }
      const enrollments = await getMyEnrollments();
      setMyCourses(enrollments.map((enrollment) => enrollment.course as Course));
      const activeCourses = await getAllActiveCourses();
      setActiveCourses(activeCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {role === "Student" &&
        (myCourses.length === 0 ? (
          <LoadingGauss />
        ) : (
          <>
            <CourseList titleList="My courses" courseList={myCourses} onDelete={onDeleteCourse} />
            <CourseList
              titleList="Other courses"
              courseList={activeCourses.filter((course) => myCourses.every((myCourse) => myCourse._id !== course._id))}
            />
          </>
        ))}
      {role === "Admin" &&
        (activeCourses.length === 0 ? (
          <LoadingGauss />
        ) : (
          <>
            <CourseList titleList="Active courses" courseList={activeCourses} onDelete={onDeleteCourse} />
            <Button href="/course/newCourse" variant="contained">
              Create new course
            </Button>
          </>
        ))}
    </div>
  );
}
export default MyCoursesPage;

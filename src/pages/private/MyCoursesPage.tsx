import { useEffect, useState } from "react";
import type { Course, Enrollment } from "../../types/types";
import { service } from "../../services/config.services";
import CourseList from "../../components/private/course/CourseList";
import EnrollmentList from "../../components/private/enrollment/EnrollmentList";
import UserList from "../../components/private/user/UserList";

function MyCoursesPage() {
  const [myEnrollments, setMyEnrollments] = useState<Enrollment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/enrollment/my-enrollments");
      setMyEnrollments(response.data);
      const userResponse = await service.get("/user");
      setUsers(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CourseList courseList={myEnrollments.map((enrollment) => enrollment.course as Course)} />
      <EnrollmentList enrollmentList={myEnrollments} />
      <UserList userList={users} />
    </div>
  );
}
export default MyCoursesPage;

import ClassList from "../components/classCourse/ClassList";
import { useParams } from "react-router";

function CourseClassListPage() {
  const { courseId } = useParams();

  return <ClassList courseId={courseId!} />;
}
export default CourseClassListPage;

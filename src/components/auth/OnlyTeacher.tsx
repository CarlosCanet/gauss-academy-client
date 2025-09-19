import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router";

type OnlyRegisteredProps = {
  children: React.ReactNode;
};

function OnlyTeacher(props: OnlyRegisteredProps) {
  const { isLoggedIn, role } = useContext(AuthContext);
  return (isLoggedIn && role === "Teacher") ? props.children : <Navigate to="/profile" />
}
export default OnlyTeacher;
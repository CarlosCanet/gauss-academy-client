import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router";

type OnlyRegisteredProps = {
  children: React.ReactNode;
};

function OnlyRegistered(props: OnlyRegisteredProps) {
  const { isLoggedIn, role } = useContext(AuthContext);
  const roles = ["Teacher", "Staff", "Admin"];
  return (isLoggedIn && role && roles.includes(role)) ? props.children : <Navigate to="/login" />
}
export default OnlyRegistered;
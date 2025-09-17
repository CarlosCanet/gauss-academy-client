import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router";

type OnlyRegisteredProps = {
  children: React.ReactNode;
};

function OnlyRegistered(props: OnlyRegisteredProps) {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? props.children : <Navigate to="/login" />
}
export default OnlyRegistered;
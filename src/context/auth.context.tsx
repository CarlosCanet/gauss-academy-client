import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "../types/user";
import { verifyUser } from "../services/user.services";


// Context component (that sends the state contexts and functions)
type AuthContextType = {
  isLoggedIn: boolean;
  loggedUserId: string | null;
  role: Role | null;
  authenticateUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedUserId: null,
  role: null,
  authenticateUser: async () => {},
});

function AuthWrapper(props: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedUserId, setLoggedUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const checkedUser = await verifyUser();
      setIsLoggedIn(true);
      setLoggedUserId(checkedUser._id);
      setUsername(checkedUser.firstName);
      setRole(checkedUser.role);
      setIsAuthenticating(false);
    } catch (error) {
      console.log("Error authenticating: ", error);
      setIsLoggedIn(false);
      setUsername(null);
      setLoggedUserId(null);
      setRole(null);
      setIsAuthenticating(false);
    }
  }

  const passedContext = { isLoggedIn, loggedUserId, role, username, authenticateUser };

  if (isAuthenticating) {
    return (
      <h3>Authenticating user...</h3>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}
export { AuthWrapper, AuthContext }

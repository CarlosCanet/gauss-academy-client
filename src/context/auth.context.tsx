import { createContext, useEffect, useState, type ReactNode } from "react";
import { service } from "../services/config.services";
import type { Role } from "../types/types";

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
  const [role, setRole] = useState<Role>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await service.get("/auth/verify");
      console.log("Ok", response);
      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setUsername(response.data.firstName);
      setRole(response.data.role);
      setIsAuthenticating(false);
    } catch (error) {
      console.log("Nope", error);
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
export {AuthWrapper, AuthContext }

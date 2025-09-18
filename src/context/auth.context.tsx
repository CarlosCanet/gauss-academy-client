import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "../types/user";
import { getMyProfile, verifyUser } from "../services/user.services";

// Context component (that sends the state contexts and functions)
type AuthContextType = {
  isLoggedIn: boolean;
  loggedUserId: string | null;
  username: string | null;
  profileImgUrl: string | null;
  role: Role | null;
  authenticateUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedUserId: null,
  username: null,
  profileImgUrl: null,
  role: null,
  authenticateUser: async () => {},
});

type userContextType = Omit<AuthContextType, "authenticateUser"> & { isAuthenticating: boolean };

function AuthWrapper(props: { children: ReactNode }) {
  const [userContext, setUserContext] = useState<userContextType>({
    isLoggedIn: false,
    loggedUserId: null,
    username: null,
    profileImgUrl: null,
    role: null,
    isAuthenticating: true,
  });
  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      await verifyUser();
      const userProfile = await getMyProfile();
      setUserContext({isLoggedIn: true,
        loggedUserId: userProfile._id,
        username: userProfile.firstName,
        profileImgUrl: userProfile.profileImageUrl,
        role: userProfile.role,
        isAuthenticating: false,
      });
    } catch (error) {
      console.error("Error authenticating: ", error);
      setUserContext({ isLoggedIn: false, loggedUserId: null, username: null, profileImgUrl: null, role: null, isAuthenticating: false });
    }
  };

  const passedContext = { ...userContext, authenticateUser };

  if (userContext.isAuthenticating) {
    return <h3>Authenticating user...</h3>;
  }

  return <AuthContext.Provider value={passedContext}>{props.children}</AuthContext.Provider>;
}
export { AuthWrapper, AuthContext };

import { Stack } from "@mui/material";
import SignInCard from "../../components/auth/SignInCard";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router";

function LoginPage() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to={"/my-courses"} />;
  }

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      sx={{
        justifyContent: "center",
        gap: { xs: 6, sm: 12 },
        p: { xs: 2, sm: 4 },
        m: "auto",
      }}>
      {/* <Content /> */}
      <SignInCard />
    </Stack>
  );
}
export default LoginPage;

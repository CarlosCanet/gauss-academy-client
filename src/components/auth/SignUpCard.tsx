import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { service } from "../../services/config.services";
import { AxiosError } from "axios";
import UserInfoForm from "../user/UserForm";
import type { UserFormData } from "../../types/user";

function SignUpCard() {
  const navigate = useNavigate();

  const handleSubmit = async (formData: UserFormData) => {
    try {
      const response = await service.post("/auth/signup", {...formData, mobileNumber: Number(formData.mobileNumber)});
      localStorage.setItem("authToken", response.data.authToken);
      navigate("/login");
      return null;
    } catch (error) {
      console.log("Error login: ", error);
      if (error instanceof AxiosError && error.response) {
        return Object.fromEntries(Object.entries(error.response.data).map(([fieldName, value]) => [fieldName, typeof value === "object" && value && "message" in value ? value.message : "unknown error"]));
      }
      return { general: "Unknown error" };
    }
  };

  return (
    <Card variant="outlined" sx={{ padding: "25px" }}>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>Gauss Academy</Box>
      <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
        Sign up
      </Typography>
      <UserInfoForm handleSubmit={handleSubmit} actionText="Sign up"/>
    </Card>
  );
}
export default SignUpCard;

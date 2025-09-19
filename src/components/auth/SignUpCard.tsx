import { Alert, Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import UserInfoForm from "../user/UserForm";
import type { UserFormData } from "../../types/user";
import { signUpUser } from "../../services/user.services";
import { useState } from "react";

function SignUpCard() {
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: UserFormData) => {
    try {
      await signUpUser(formData);
      navigate("/login");
      return null;
    } catch (error) {
      console.error("Error login: ", error);
      setShowErrorAlert(true);
      if (error instanceof AxiosError && error.response) {
        return Object.fromEntries(
          Object.entries(error.response.data).map(([fieldName, value]) => [
            fieldName,
            typeof value === "object" && value && "message" in value ? value.message : "unknown error",
          ])
        );
      }
      return { general: "Unknown error" };
    }
  };

  return (
    <Card variant="outlined" sx={{ padding: "30px" }}>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>Gauss Academy</Box>
      <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", mb: 3 }}>
        Sign up
      </Typography>
      <UserInfoForm handleSubmit={handleSubmit} actionText="Sign up" />
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error with the signup. Please try again.
        </Alert>
      )}
    </Card>
  );
}
export default SignUpCard;

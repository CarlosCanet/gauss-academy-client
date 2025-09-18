import { Alert, AlertTitle, Grid } from "@mui/material";
import UserInfoForm from "../components/user/UserForm";
import type { UserFormData } from "../types/user";
import { AxiosError } from "axios";
import { editProfile } from "../services/user.services";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { authenticateUser } = useContext(AuthContext);
  const handleSubmit = async (formData: UserFormData) => {
    try {
      await editProfile(formData);
      await authenticateUser();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return null;
    } catch (error) {
      console.error("Error login: ", error);
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
    <Grid container spacing={3} sx={{ marginTop: 5 }}>
      <Grid size={10} offset={1}>
        <UserInfoForm handleSubmit={handleSubmit} actionText="Edit info" />
      </Grid>
      {showAlert && (
        <Grid size={4} offset={7}>
          <Alert severity="success">
            <AlertTitle>Profile changed</AlertTitle>
            The new data is already changed.
          </Alert>
        </Grid>
      )}
    </Grid>
  );
}
export default ProfilePage;

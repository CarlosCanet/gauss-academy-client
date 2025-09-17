import { Button, Grid, Typography } from "@mui/material";
import UserInfoForm from "../../components/private/user/UserForm";
import type { UserFormData } from "../../types/user";
import { service } from "../../services/config.services";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function ProfilePage() {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const handleSubmit = async (formData: UserFormData) => {
    try {
      await service.put("/user/profile", { ...formData, mobileNumber: Number(formData.mobileNumber) });
      navigate("/login");
      return null;
    } catch (error) {
      console.log("Error login: ", error);
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
    <Grid container spacing={3}>
      <Grid size={10} offset={1}>
        <Typography align="center">Profile</Typography>
        <UserInfoForm handleSubmit={handleSubmit} actionText="Edit info" />
      </Grid>
      {role === "Admin" && (
        <Grid size={10} offset={1}>
          <Button href="/course/newCourse" variant="contained">Create new course</Button>
        </Grid>
      )}
    </Grid>
  );
}
export default ProfilePage;

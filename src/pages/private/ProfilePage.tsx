import { Grid, Typography } from "@mui/material";
import UserInfoForm from "../../components/private/user/UserForm";
import type { UserFormData } from "../../types/user";
import { service } from "../../services/config.services";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

function ProfilePage() {
  const navigate = useNavigate();
  const handleSubmit = async (formData: UserFormData) => {
    try {
      await service.put("/user/profile", { ...formData, mobileNumber: Number(formData.mobileNumber) });
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
    <Grid container>
      <Grid size={10} offset={1}>
        <Typography align="center">Profile</Typography>
        <UserInfoForm handleSubmit={handleSubmit} actionText="Edit info" />
      </Grid>
    </Grid>
  );
}
export default ProfilePage;

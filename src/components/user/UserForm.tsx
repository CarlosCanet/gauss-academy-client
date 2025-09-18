import { Avatar, Button, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext, useEffect, useState } from "react";
import { initialUser, type UserFormData, type UserFormErrors } from "../../types/user";
import { getMyProfile, transformUserToForm, uploadImage } from "../../services/user.services";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router";

type PropsUserInfo = {
  handleSubmit: (formData: UserFormData) => Promise<UserFormErrors | null>;
  actionText: string;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface FileInfo {
  file: File | null;
  previewURL: string;
}

function UserInfoForm(props: PropsUserInfo) {
  const [formData, setFormData] = useState<UserFormData>(initialUser);
  const [formErrors, setFormErrors] = useState<UserFormErrors>({});
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileInfo, setFileInfo] = useState<FileInfo>({ file: null, previewURL: "" });
  const { isLoggedIn, profileImgUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    return () => URL.revokeObjectURL(fileInfo.previewURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const userData = await getMyProfile();
      setFormData(transformUserToForm(userData));
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    if (fileInfo.previewURL) {
      URL.revokeObjectURL(fileInfo.previewURL);
    }
    setFileInfo({ file: event.target.files[0], previewURL: URL.createObjectURL(event.target.files[0]) });
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let newFormData = { ...formData };
    try {
      if (fileInfo.file) {
        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append("image", fileInfo.file);
        console.log("Uploading");
        const cloudinaryImageUrl = await uploadImage(uploadData);
        setIsUploading(false);
        newFormData = { ...newFormData, profileImageUrl: cloudinaryImageUrl };
        setFormData(newFormData);
      }
      const errors = await props.handleSubmit(newFormData);
      if (errors) {
        setFormErrors(errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container component="form" onSubmit={onSubmit} noValidate spacing={3} sx={{ alignItems: "center" }}>
      <Grid size={{ xs: 6, lg: 3 }} offset={{ lg: 3 }}>
        <Avatar
          sx={{ width: 150, height: 150 }}
          alt="Profile image"
          src={fileInfo.previewURL ? fileInfo.previewURL : isLoggedIn ? (profileImgUrl as string) : ""}
        />
      </Grid>
      <Grid size={6}>
        <Button component="label" role={undefined} variant="contained" startIcon={<CloudUploadIcon />} loading={isUploading}>
          Upload image
          <VisuallyHiddenInput type="file" onChange={onUpload} multiple />
        </Button>
      </Grid>
      <TextField
        error={Boolean(formErrors.email)}
        helperText={formErrors.email}
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="your@email.com"
        label="Email"
        autoComplete="email"
        autoFocus
        required
        fullWidth
        variant="outlined"
        // color={formErrors.email ? "primary" : "error"}
      />
      {!isLoggedIn && (
        <TextField
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={onChange}
          required
          fullWidth
          variant="outlined"
        />
      )}
      <TextField
        error={Boolean(formErrors.firstName)}
        helperText={formErrors.firstName}
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={onChange}
        placeholder="Your first name"
        label="First name"
        autoComplete="given-name"
        required
        fullWidth
        variant="outlined"
      />
      <TextField
        error={Boolean(formErrors.lastName)}
        helperText={formErrors.lastName}
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={onChange}
        placeholder="Your last name"
        label="Last name"
        autoComplete="family-name"
        required
        fullWidth
        variant="outlined"
      />
      <Grid
        size={6}
        component={TextField}
        error={Boolean(formErrors.dateOfBirth)}
        helperText={formErrors.dateOfBirth}
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={onChange}
        placeholder="01/05/1990"
        label="Date of birth"
        autoComplete="date"
        required
        fullWidth
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Grid
        size={6}
        component={TextField}
        error={Boolean(formErrors.dni)}
        helperText={formErrors.dni}
        type="text"
        name="dni"
        value={formData.dni}
        onChange={onChange}
        placeholder="DNI or NIE"
        label="DNI or NIE"
        autoComplete="on"
        required
        fullWidth
        variant="outlined"
      />
      <TextField
        error={Boolean(formErrors.mobileNumber)}
        helperText={formErrors.mobileNumber}
        type="tel"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={onChange}
        placeholder="666112233"
        label="Mobile number"
        autoComplete="tel"
        required
        fullWidth
        variant="outlined"
      />
      <Grid size={3} offset={3}>
        <Button type="submit" fullWidth variant="contained">
          {props.actionText}
        </Button>
      </Grid>
      <Grid size={3}>
        <Button variant="outlined" fullWidth color="error" onClick={()=> navigate(-1)}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
export default UserInfoForm;

import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { service } from "../../../services/config.services";
import { initialUser, type UserFormData, type UserFormErrors } from "../../../types/user";

type PropsUserInfo = {
  handleSubmit: (formData: UserFormData) => Promise<UserFormErrors | null>;
  actionText: string;
};

function UserInfoForm(props: PropsUserInfo) {
  const [formData, setFormData] = useState<UserFormData>(initialUser);
  const [formErrors, setFormErrors] = useState<UserFormErrors>({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/user/profile");
      setFormData({...response.data, dateOfBirth: response.data.dateOfBirth.slice(0,10)});
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = await props.handleSubmit(formData);
    if (errors) {
      setFormErrors(errors);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
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
      <TextField name="password" type="password" label="Password" autoComplete="new-password" value={formData.password} onChange={onChange} required fullWidth variant="outlined" />
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
      <TextField
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
      <TextField error={Boolean(formErrors.dni)} helperText={formErrors.dni} type="text" name="dni" value={formData.dni} onChange={onChange} placeholder="DNI or NIE" label="DNI or NIE" autoComplete="on" required fullWidth variant="outlined" />
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
      <TextField
        error={Boolean(formErrors.profileImageUrl)}
        helperText={formErrors.profileImageUrl}
        type="text"
        name="profileImageUrl"
        value={formData.profileImageUrl}
        onChange={onChange}
        placeholder="Image URL"
        label="Your profile image"
        autoComplete="url"
        required
        fullWidth
        variant="outlined"
      />

      <Button type="submit" fullWidth variant="contained">
        {props.actionText}
      </Button>
    </Box>
  );
}
export default UserInfoForm;

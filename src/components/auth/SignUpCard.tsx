import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { service } from "../../services/config.services";
import { AxiosError } from "axios";

interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  dni: string;
  mobileNumber: string;
  profileImageUrl: string;
}

type SignUpFormErrors = Partial<Record<keyof SignUpFormData, string>>;

function SignUpCard() {
  const [formData, setFormData] = useState<SignUpFormData>({ email: "", password: "", firstName: "", lastName: "", dateOfBirth: new Date(), dni: "", mobileNumber: "", profileImageUrl: "" });
  const [formErrors, setFormErrors] = useState<SignUpFormErrors>({});
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await service.post("/auth/signup", {...formData, mobileNumber: Number(formData.mobileNumber)});
      localStorage.setItem("authToken", response.data.authToken);
      navigate("/login");
      console.log("Welcome!");
    } catch (error) {
      console.log("Error login: ", error);
      if (error instanceof AxiosError && error.response) {
        setFormErrors(Object.fromEntries(Object.entries(error.response.data).map(([fieldName, value]) => [fieldName, typeof value === "object" && value && "message" in value ? value.message : "unknown error"])));
      }
    }
  };

  return (
    <Card variant="outlined" sx={{ padding: "25px" }}>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>Gauss Academy</Box>
      <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
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
          label="Firt name"
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
          Sign up
        </Button>
      </Box>
    </Card>
  );
}
export default SignUpCard;

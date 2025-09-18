import { Box, Button, Card, Link, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router"
import { AuthContext } from "../../context/auth.context";
import type { UserCredentials } from "../../types/user";
import { loginUser } from "../../services/user.services";


function SignInCard() {
  const [formData, setFormData] = useState<UserCredentials>({ email: "", password: "" });
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await loginUser(formData);
      localStorage.setItem("authToken", response.authToken);
      await authenticateUser();
      navigate("/my-courses");
    } catch (error) {
      console.error("Error login: ", error);
    }
  }

  return (
    <Card variant="outlined" sx={{padding: "25px"}}>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        Gauss Academy
      </Box>
       <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
      <TextField
          error={false}
          // helperText="error"
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
          color="primary" //{emailError ? "error" : "primary"}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          value={formData.password}
          onChange={onChange}
          required
          fullWidth
          variant="outlined"
        />

        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
         <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              component={LinkRouter}
              to="/signup"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  )
}
export default SignInCard
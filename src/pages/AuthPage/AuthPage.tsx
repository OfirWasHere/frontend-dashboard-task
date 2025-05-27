import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../../hooks/useAuth";
import { VisibilityOff, Visibility } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageStep, setPageStep] = useState<number>(0);
  const [showPassword, setShowPassword] = useState(false);
  const { firebaseLogin, firebaseSignUp, firebaseGoogleAuthLogin } = useAuth();

  const submitDetails = () => {
    // TODO: Add validation for email and password with errors
    if (pageStep === 0) {
      firebaseLogin({ email, password });
    } else if (pageStep === 1) {
      firebaseSignUp({ email, password });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormChangeToSignupOrLogin = () => {
    setPageStep((prevStep) => (prevStep === 0 ? 1 : 0));
  };

  return (
    <div>
      <Box height={"80vh"} display="flex" alignItems="center">
        <Box
          sx={{
            maxWidth: 400,
            margin: "auto",
            padding: 2,
            backgroundColor: "#f5f5f5",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" textAlign="center">
            {pageStep === 1 ? "Signup" : "Login"}
          </Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {/* TODO: Add hide/show password */}
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body1" sx={{ pb: 2 }}>
            {pageStep === 1 ? "Have an account?," : "Not Registered?,"}
            <Button
              onClick={() => handleFormChangeToSignupOrLogin()}
              variant="text"
              style={{ color: "#1976d2" }}
            >
              {pageStep === 1 ? "Login" : "Signup"}
            </Button>
          </Typography>
          <Button onClick={submitDetails} variant="contained" fullWidth>
            Submit
          </Button>
          <Divider sx={{ my: 2 }}>OR</Divider>
          <Button
            variant="outlined"
            fullWidth
            endIcon={<GoogleIcon />}
            onClick={() => {
              firebaseGoogleAuthLogin();
            }}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Login;

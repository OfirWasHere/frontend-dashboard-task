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
import useIsMobile from "../../hooks/useIsMobile";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageStep, setPageStep] = useState<number>(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState<string | null>("");
  const { firebaseLogin, firebaseSignUp, firebaseGoogleAuthLogin } = useAuth();
  const isMobile = useIsMobile();
  const submitDetails = async () => {
    // TODO: Add validation for email and password with proper errors
    let response;
    if (pageStep === 0) {
      response = await firebaseLogin({ email, password });
      setErrorText(response);
      return;
    } else if (pageStep === 1) {
      response = await firebaseSignUp({ email, password });
      setErrorText(response);
      return;
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
      <Box
        sx={{
          height: "100vh",
          background: "linear-gradient(to right, #52357B, #5459AC)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            height: isMobile ? "60vh" : "auto",
            margin: "auto",
            padding: 5,
            backgroundColor: "#f5f5f5",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" textAlign="center">
            {pageStep === 1 ? "Signup" : "Login"}
          </Typography>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorText("");
            }}
            value={email}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={errorText.length > 0}
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorText("");
            }}
            value={password}
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            error={errorText.length > 0}
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
          <Typography color="error">{errorText}</Typography>
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

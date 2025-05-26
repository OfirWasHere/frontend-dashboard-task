import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageStep, setPageStep] = useState<number>(0);

  const submitDetails = () => {};
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
            {pageStep === 0 ? "Signup" : "Login"}
          </Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Typography variant="body1" sx={{ pb: 2 }}>
            {pageStep === 0 ? "Have an account?," : "Not Registered?,"}
            <Button
              onClick={() => handleFormChangeToSignupOrLogin()}
              variant="text"
              style={{ color: "#1976d2" }}
            >
              {pageStep === 0 ? "Login" : "Signup"}
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
            onClick={() => {}}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Login;

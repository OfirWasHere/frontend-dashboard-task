import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";

type navbarProps = { title: string };

function Navbar({ title }: navbarProps) {
  const { firebaseLogout } = useAuth();

  return (
    <AppBar position="static" sx={{ boxShadow: "2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" fontWeight={600}>{title}</Typography>
        <Button
          variant="contained"
          onClick={() => firebaseLogout()}
          sx={{
            borderRadius: 2,
            bgcolor: "#212121",
            color: "#fff",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#424242",
            },
          }}
        >
          log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

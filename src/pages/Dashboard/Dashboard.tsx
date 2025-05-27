import { Button } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";

function Dashboard() {
  const { firebaseLogout } = useAuth();
  return (
    <div>
      <Button variant="contained" onClick={() => firebaseLogout()}>
        log out
      </Button>
    </div>
  );
}

export default Dashboard;

import { Button } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { GetAllDataFromFireStore } from "../../services/dashboardService";

function Dashboard() {
  const { firebaseLogout } = useAuth();

  return (
    <div>
      <Button variant="contained" onClick={() => firebaseLogout()}>
        log out
      </Button>
      <Button variant="contained" onClick={GetAllDataFromFireStore}></Button>
    </div>
  );
}

export default Dashboard;

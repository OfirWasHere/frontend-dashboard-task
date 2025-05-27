import { Button } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import {
  addVisit,
  fetchAllVisits,
} from "../../services/dashboardService";
import { VisitDataModal } from "../../utils/types";

function Dashboard() {
  const { firebaseLogout } = useAuth();
  
  return (
    <div>
      {/* <Button variant="contained" onClick={() => firebaseLogout()}>
        log out
      </Button> */}
      <Button variant="contained" onClick={fetchAllVisits}>
        Fetch all data
      </Button>
      <Button
        variant="contained"
        onClick={() => addVisit({ date: "2023-10-01", visits: 100 })}
      >
        add data to firestore
      </Button>
    </div>
  );
}

export default Dashboard;

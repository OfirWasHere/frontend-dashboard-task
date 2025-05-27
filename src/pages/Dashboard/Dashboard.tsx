import { Button } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import {
  addVisits,
  deleteVisits,
  editVisits,
  fetchAllVisits,
} from "../../services/dashboardService";

function Dashboard() {
  const { firebaseLogout } = useAuth();
  let currentDay = new Date();

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
        onClick={() =>
          addVisits({
            visits: 100,
            date: currentDay.toISOString().split("T")[0],
          })
        }
      >
        add data to firestore
      </Button>
      <Button
        variant="contained"
        onClick={() => deleteVisits("D9AADJBq7OUv7KUovxY6")}
      >
        remove date from db
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          editVisits({
            id: "u9dyP8xivWnUSvviWHeK",
            visits: 40,
            date: currentDay.toISOString().split("T")[0],
          })
        }
      >
        edit vists editVisits
      </Button>
    </div>
  );
}

export default Dashboard;

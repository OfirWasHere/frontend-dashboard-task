import { Box, Button, FormControl, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addVisits,
  deleteVisits,
  editVisits,
  fetchAllVisits,
} from "../../services/DataService";
import { VisitDataModal } from "../../utils/types";
import useAuth from "../../hooks/useAuth";
import InsertDataForm from "../../components/InsertDataForm/InsertDataForm";
import useIsMobile from "../../hooks/useIsMobile";
import AppTable from "../../components/AppTable/AppTable";

function Dashboard() {
  const [visits, setVisits] = useState<VisitDataModal[] | null>(null);
  const { firebaseLogout } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      // const data = await fetchAllVisits();
      // if (data) {
      // setVisits(data);
      // }
    };
    fetchData();
  }, []);

  const handleDeleteClick = (id: string) => {
    deleteVisits(id);
    const updatedVisitsArr = visits.filter((item) => {
      return item.id !== id;
    });
    setVisits(updatedVisitsArr);
  };

  const handleSave = (
    updatedVisitsList: number,
    updatedDate: string,
    id: string
  ) => {
    editVisits({ id: id, visits: updatedVisitsList, date: updatedDate });
    const index = visits.findIndex((item) => item.id === id);
    const updatedVisitsArr = [...visits];
    updatedVisitsArr[index] = { visits: updatedVisitsList, date: updatedDate };
    setVisits(updatedVisitsArr);
  };

  const handleAddVisits = async (data: VisitDataModal) => {
    if (data) {
      addVisits(data);
      const result = await fetchAllVisits();
      if (result) {
        setVisits(result);
      }
    }
  };

  return (
    <div>
      <Box m={isMobile ? 0 : 4}>
        <Typography variant="h3" textAlign={"center"}>
          Analytics Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <AppTable
            tableDataRows={visits}
            handleDeleteClick={handleDeleteClick}
            handleSave={handleSave}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <InsertDataForm
            headerText="addVisits"
            submitFormAction={(data) => handleAddVisits(data)}
          />
        </Box>
        {/* <Button variant="contained" onClick={() => firebaseLogout()}>
          log out
        </Button> */}
      </Box>
    </div>
  );
}
export default Dashboard;

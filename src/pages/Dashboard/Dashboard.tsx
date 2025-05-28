import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addVisits,
  deleteVisits,
  editVisits,
  fetchAllVisits,
} from "../../services/DataService";
import { VisitDataModal } from "../../utils/types";
import InsertDataForm from "../../components/InsertDataForm/InsertDataForm";
import useIsMobile from "../../hooks/useIsMobile";
import AppTable from "../../components/AppTable/AppTable";
import AppChart from "../../components/AppChart/AppChart";
import Navbar from "../../components/Navbar/Navbar";
import AppTableFilters from "../../components/AppTable/AppTableFilters";

function Dashboard() {
  const [visits, setVisits] = useState<VisitDataModal[] | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await fetchAllVisits();
    //   if (data) {
    //     setVisits(data);
    //   }
    // };
    // fetchData();
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
      <Navbar title={"Analytics Dashboard"} />
      <Box m={isMobile ? 0 : 4}>
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
        {/* <AppTableFilters /> */}
        <AppTable
          tableDataRows={visits}
          handleDeleteClick={handleDeleteClick}
          handleSave={handleSave}
        />
        <Box sx={{ pt: 5 }}>
          <AppChart visitsData={visits} />
        </Box>
      </Box>
    </div>
  );
}
export default Dashboard;

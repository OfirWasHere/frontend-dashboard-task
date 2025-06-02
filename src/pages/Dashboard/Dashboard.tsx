import InsertDataForm from "../../components/InsertDataForm/InsertDataForm";
import useIsMobile from "../../hooks/useIsMobile";
import AppTable from "../../components/AppTable/AppTable";
import AppChart from "../../components/AppChart/AppChart";
import Navbar from "../../components/Navbar/Navbar";
import AppTableFilters from "../../components/AppTable/AppTableFilters";
import useDashboard from "../../hooks/useDashboard";
import { Box, Divider } from "@mui/material";

function Dashboard() {
  const isMobile = useIsMobile();
  const {
    TableHeadClickedSort,
    handleAddVisits,
    handleDeleteClick,
    handleFilters,
    handleSave,
    filteredData,
    visits,
  } = useDashboard();

  return (
    <div>
      <Navbar title={"Analytics Dashboard"} />
      <Box m={isMobile ? 0 : 4} sx={{ maxWidth: 1600, mx: "auto", px: 5 }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "stretch" : "flex-start"}
          gap={4}
          my={isMobile ? 2 : 4}
        >
          <AppTableFilters handleFilters={handleFilters} />
          <InsertDataForm
            headerText="Add new data"
            submitFormAction={(data) => handleAddVisits(data)}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Divider sx={{ my: 2 }} />
        </Box>
        <AppTable
          tableDataRows={filteredData}
          handleDeleteClick={handleDeleteClick}
          handleSave={handleSave}
          TableHeadClickedSort={TableHeadClickedSort}
        />
        <Box sx={{ my: 6 }}>
          <Divider sx={{ my: 2 }} />
        </Box>
        <AppChart visitsData={visits} />
      </Box>
    </div>
  );
}
export default Dashboard;

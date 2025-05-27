import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteVisits, fetchAllVisits } from "../../services/DataService";
import AppTable from "../../components/common/AppTable";
import { VisitDataModal } from "../../utils/types";

function DashboardV2() {
  const [visits, setVisits] = useState<VisitDataModal[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllVisits();
      if (data) {
        setVisits(data);
      }
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

  const handleEditClickSave = (id: string) => {};

  return (
    <div>
      <Box m={4}>
        <Typography variant="h3">Analytics Dashboard</Typography>
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
            handleEditClickSave={handleEditClickSave}
          />
        </Box>
      </Box>
    </div>
  );
}

export default DashboardV2;

import { Box } from "@mui/material";
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

  return (
    <div>
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
        />
      </Box>
    </div>
  );
}

export default DashboardV2;

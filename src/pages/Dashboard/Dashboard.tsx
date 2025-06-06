import { Box, Divider } from "@mui/material";
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
  const [filteredData, setFilteredData] = useState<VisitDataModal[]>(visits);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllVisits();
      if (data) {
        setVisits(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (visits) {
      setFilteredData(visits);
    }
  }, [visits]);

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

  const handleFilters = (
    maxAmount: number,
    minAmount: number,
    mimDate: string,
    maxDate: string
  ) => {
    if (
      maxAmount === 0 &&
      minAmount === 0 &&
      mimDate === "" &&
      maxDate === ""
    ) {
      setFilteredData(visits);
      return;
    }

    const result = visits.filter(
      (item) =>
        (minAmount === 0 || item.visits > minAmount) &&
        (maxAmount === 0 || item.visits < maxAmount) &&
        (mimDate === "" || item.date >= mimDate) &&
        (maxDate === "" || item.date <= maxDate)
    );

    setFilteredData(result);
  };

  const TableHeadClickedSort = (sortType: string) => {
    let result;

    if (sortType === "VisitsUp") {
      result = [...filteredData].sort((a, b) => a.visits - b.visits);
    } else if (sortType === "VisitsDown") {
      result = [...filteredData].sort((a, b) => b.visits - a.visits);
    }
    if (sortType === "DateUp") {
      result = [...filteredData].sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortType === "DateDown") {
      result = [...filteredData].sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    setFilteredData(result);
  };

  return (
    <div>
      <Navbar title={"Analytics Dashboard"} />
      <Box m={isMobile ? 0 : 4} sx={{ maxWidth: 1600, mx: "auto", px: 5 }}>
        <Box>
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
        <Box>
          <AppChart visitsData={visits} />
        </Box>
      </Box>
    </div>
  );
}
export default Dashboard;

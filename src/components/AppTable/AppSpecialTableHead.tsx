import { TableRow, TableCell, TableHead } from "@mui/material";
import { ArrowDownwardRounded } from "@mui/icons-material";
import { ArrowUpwardRounded } from "@mui/icons-material";
import { useState } from "react";

type AppSpecialTableHeadProps = {
  TableHeadClickedSort: (sortType: string) => void;
};

function AppSpecialTableHead({
  TableHeadClickedSort,
}: AppSpecialTableHeadProps) {
  const [sortedByVisits, setSortedByVisits] = useState<boolean>(true);
  const [sortedByDate, setSortedByDate] = useState<boolean>(true);

  function handleSortByVisit() {
    if (sortedByVisits) {
      TableHeadClickedSort("VisitsUp");
      setSortedByVisits(false);
    } else {
      TableHeadClickedSort("VisitsDown");
      setSortedByVisits(true);
    }
  }

  function handleSortByDate() {
    if (sortedByVisits) {
      TableHeadClickedSort("DateUp");
      setSortedByDate(false);
    } else {
      TableHeadClickedSort("DateDown");
      setSortedByDate(true);
    }
  }
  
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
        <TableCell align="center" padding="checkbox">
          Delete
        </TableCell>
        <TableCell align="center" padding="checkbox">
          Edit
        </TableCell>
        <TableCell align="right">ID</TableCell>

        <TableCell
          align="right"
          onClick={() => handleSortByVisit()}
          sx={{ cursor: "pointer" }}
        >
          {sortedByVisits ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
          Visits
        </TableCell>

        <TableCell
          align="right"
          onClick={() => handleSortByDate()}
          sx={{ cursor: "pointer" }}
        >
          {sortedByDate ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
          Date
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default AppSpecialTableHead;

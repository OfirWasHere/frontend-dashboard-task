import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { TableRow, TableCell, TableHead } from "@mui/material";

function AppSpecialTableHead() {
  // TODO implement simple sorting
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

        <TableCell align="right" sx={{ cursor: "pointer" }}>
          Visits
        </TableCell>

        <TableCell align="right" sx={{ cursor: "pointer" }}>
          Date
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default AppSpecialTableHead;

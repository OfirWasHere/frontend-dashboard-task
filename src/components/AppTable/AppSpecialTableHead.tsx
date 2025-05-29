import { TableRow, TableCell, TableHead } from "@mui/material";

type AppSpecialTableHeadProps = {
  TableHeadClickedSort: (sortType: string) => void;
};

function AppSpecialTableHead({
  TableHeadClickedSort,
}: AppSpecialTableHeadProps) {
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
          onClick={() => TableHeadClickedSort("Visits")}
          sx={{ cursor: "pointer" }}
        >
          Visits
        </TableCell>

        <TableCell
          align="right"
          onClick={() => TableHeadClickedSort("Visits")}
          sx={{ cursor: "pointer" }}
        >
          Date
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default AppSpecialTableHead;

import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { VisitDataModal } from "../../utils/types";
import { Delete } from "@mui/icons-material";

type AppTableProps = {
  tableDataRows: VisitDataModal[] | null;
  handleDeleteClick: (id: string) => void;
};

function AppTable({ tableDataRows, handleDeleteClick }: AppTableProps) {
  return (
    <div>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Visit Table
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead color="primary">
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell
                  align="center"
                  padding="checkbox"
                >
                  Delete
                </TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Visits</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableDataRows && tableDataRows.length > 0 ? (
                tableDataRows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="right">
                      <Delete sx={{ cursor: "pointer" }} onClick={() => handleDeleteClick(row.id)} />
                    </TableCell>
                    <TableCell align="right">{index}</TableCell>
                    <TableCell align="right">{row.visits}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default AppTable;

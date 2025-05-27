import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { VisitDataModal } from "../../utils/types";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

type AppTableProps = {
  tableDataRows: VisitDataModal[] | null;
  handleDeleteClick: (id: string) => void;
  handleEditClickSave: (id: string) => void;
};

function AppTable({
  tableDataRows,
  handleDeleteClick,
  handleEditClickSave,
}: AppTableProps) {
  const [editedRow, setEditedRow] = useState<number>(null);
  const [updatedVisit, setUpdateForVisit] = useState<VisitDataModal>(undefined);

  function handleEditClick(rowIndex: number) {
    setEditedRow(rowIndex);
    console.log(rowIndex);
  }

  return (
    <div>
      <Box>
        <Button variant="contained" sx={{ mb: 1 }}>
          <Typography variant="h6">Add more</Typography>
        </Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead color="primary">
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell align="center" padding="checkbox">
                  Delete
                </TableCell>
                <TableCell align="center" padding="checkbox">
                  Edit
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
                      <Delete
                        sx={{ cursor: "pointer" }}
                        // onClick={() => handleDeleteClick(row.id)}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => handleEditClick(index)}
                      sx={{ cursor: "pointer" }}
                    >
                      Edit
                    </TableCell>
                    <TableCell align="right">{index}</TableCell>
                    {editedRow && editedRow === index ? (
                      <>
                        <TableCell>
                          <TextField type="text" value={row.visits} />
                        </TableCell>
                        <TableCell>
                          <TextField type="date" value={row.date} />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.visits}</TableCell>
                      </>
                    )}
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

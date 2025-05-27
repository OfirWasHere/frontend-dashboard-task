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
import { useState } from "react";

type EnhancedTableHeadProps = {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function EnhancedTableHead({ onSelectAllClick }: EnhancedTableHeadProps) {
  return (
    <TableHead color="primary">
      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
        <TableCell align="center" padding="checkbox">
          {/* <Checkbox onChange={onSelectAllClick} /> */}
        </TableCell>
        <TableCell align="right">ID</TableCell>
        <TableCell align="right">Visits</TableCell>
        <TableCell align="right">Date</TableCell>
      </TableRow>
    </TableHead>
  );
}

type AppTableProps = {
  tableDataRows: VisitDataModal[] | null;
};

function AppTable({ tableDataRows }: AppTableProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // const newSelected = rows.map((n) => n.id);
      // setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <div>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Visit Table
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <EnhancedTableHead onSelectAllClick={handleSelectAllClick} />
            <TableBody>
              {tableDataRows && tableDataRows.length > 0 ? (
                tableDataRows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="right">
                      {/* <Checkbox onSelect={()=> {setSelected}}/> */}
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

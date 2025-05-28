import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  IconButton,
  TablePagination,
} from "@mui/material";
import { VisitDataModal } from "../../utils/types";
import { Cancel, Delete, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import AppTableFilters from "./AppTableFilters";
import AppSpecialTableHead from "./AppSpecialTableHead";

type AppTableProps = {
  tableDataRows: VisitDataModal[] | null;
  handleDeleteClick: (id: string) => void;
  handleSave: (visits: number, date: string, id: string) => void;
};

function AppTable({
  tableDataRows,
  handleDeleteClick,
  handleSave,
}: AppTableProps) {
  const [editedRow, setEditedRow] = useState<number>(null);
  const [newVisitAmount, setNewVisitAmount] = useState<number>(0);
  const [filteredData, setFilteredData] =
    useState<VisitDataModal[]>(tableDataRows);
  const [newDate, setNewDate] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (tableDataRows) {
      setFilteredData(tableDataRows);
    }
  }, [tableDataRows]);

  function handleEditClick(rowIndex: number) {
    setNewVisitAmount(0);
    setNewDate("");
    setEditedRow(rowIndex);
  }

  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewVisitAmount(Number(event.target.value));
  }

  function handleDateChange(value: Dayjs | null) {
    if (value) {
      setNewDate(value.format("YYYY-MM-DD"));
    } else {
      setNewDate("");
    }
  }

  function handleEditCancel() {
    setNewVisitAmount(0);
    setNewDate("");
    setEditedRow(null);
  }

  function handleSaveClick(date: string, visits: number, id: string) {
    const updatedDate = newDate === "" ? date : newDate;

    const updatedVisits =
      visits !== newVisitAmount &&
      newVisitAmount !== 0 &&
      newVisitAmount !== null
        ? newVisitAmount
        : visits;

    handleSave(updatedVisits, updatedDate, id);
    handleEditCancel();
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      setFilteredData(tableDataRows);
      return;
    }

    const result = tableDataRows.filter(
      (item) =>
        (minAmount === 0 || item.visits > minAmount) &&
        (maxAmount === 0 || item.visits < maxAmount) &&
        (mimDate === "" || item.date >= mimDate) &&
        (maxDate === "" || item.date <= maxDate)
    );

    setFilteredData(result);
  };

  return (
    <div>
      <Box>
        <TableContainer>
          <Table sx={{ minWidth: isMobile ? "90vw" : "80vw" }}>
            <AppSpecialTableHead />
            <TableBody>
              {filteredData && filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell align="right">
                        <Delete
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleDeleteClick(row.id)}
                        />
                      </TableCell>
                      {editedRow !== null && editedRow === index ? (
                        <TableCell>
                          <Box display="flex" justifyContent="center" gap={1}>
                            <IconButton
                              color="success"
                              onClick={() =>
                                handleSaveClick(row.date, row.visits, row.id)
                              }
                            >
                              <Save fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={handleEditCancel}
                            >
                              <Cancel fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      ) : (
                        <TableCell
                          onClick={() => handleEditClick(index)}
                          sx={{ cursor: "pointer" }}
                        >
                          Edit
                        </TableCell>
                      )}
                      <TableCell align="right">
                        {index + rowsPerPage * page + 1}
                      </TableCell>
                      {editedRow !== null && editedRow === index ? (
                        <>
                          <TableCell>
                            <TextField
                              type="number"
                              placeholder={String(row.visits)}
                              value={newVisitAmount !== 0 ? newVisitAmount : ""}
                              onChange={handleTextFieldChange}
                            />
                          </TableCell>
                          <TableCell>
                            <DatePicker
                              label="Date"
                              value={newDate ? dayjs(newDate) : dayjs(row.date)}
                              onChange={handleDateChange}
                              sx={{ maxWidth: isMobile ? "0px" : "auto" }}
                              format="YYYY-MM-DD"
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell align="right">{row.visits}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
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
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"} alignItems={"center"}>
            <AppTableFilters handleFilters={handleFilters} />
          </Box>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </div>
  );
}

export default AppTable;

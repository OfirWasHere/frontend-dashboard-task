import { FormControl, Typography, Button, TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

type InsertDataFormProps = {
  submitText?: string;
  headerText: string;
  submitFormAction?: (payload: { visits: number; date: string }) => void;
};

function InsertDataForm({
  submitText = "submit",
  headerText = "addVisits",
  submitFormAction,
}: InsertDataFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const [visits, setVisits] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");

  function handleDateChange(value: Dayjs | null) {
    if (value) {
      setSelectedDate(value.format("YYYY-MM-DD"));
    } else {
      setSelectedDate("");
    }
  }

  const handleSubmit = () => {
    const dateToUse = selectedDate || today;
    if (visits === 0) return;

    const payload = {
      visits,
      date: dateToUse,
    };
    submitFormAction?.(payload);
  };

  return (
    <div>
      <FormControl>
        <Typography textAlign={"center"} variant="h6">
          {headerText}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            placeholder="Amount"
            type="number"
            required
            value={visits !== 0 ? visits : ""}
            onChange={(e) => setVisits(Number(e.target.value))}
            sx={{ my: 1 }}
          />
          <DatePicker
            label="Date"
            value={selectedDate ? dayjs(selectedDate) : dayjs(today)}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            sx={{ my: 1 }}
          />
        </Box>
        <Box display={"flex"}>
          <Button
            disabled={visits === 0}
            onClick={handleSubmit}
            fullWidth
            sx={{ display: "flex", alignContent: "center", mt: 2 }}
            variant="contained"
          >
            <Typography variant="h6" mt={0}>
              {submitText}
            </Typography>
          </Button>
        </Box>
      </FormControl>
    </div>
  );
}

export default InsertDataForm;

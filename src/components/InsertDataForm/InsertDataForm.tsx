import { FormControl, Typography, Button, TextField } from "@mui/material";
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
  useEffect(() => {
    setSelectedDate(today);
  }, []);

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
        <Typography variant="h6">{headerText}</Typography>

        <TextField
          placeholder="Amount"
          type="number"
          required
          value={visits !== 0 ? visits : ""}
          onChange={(e) => setVisits(Number(e.target.value))}
          sx={{ my: 1 }}
        />

        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          sx={{ my: 1 }}
        />

        <Button
          disabled={visits === 0}
          onClick={handleSubmit}
          sx={{ display: "flex", alignContent: "center", mt: 2 }}
          variant="contained"
        >
          <Typography variant="h6">{submitText}</Typography>
        </Button>
      </FormControl>
    </div>
  );
}

export default InsertDataForm;

import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
  Box,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type AppTableFiltersProps = {
  handleFilters: (
    maxAmount: number,
    minAmount: number,
    mimDate: string,
    maxDate: string
  ) => void;
};

function AppTableFilters({ handleFilters }: AppTableFiltersProps) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["filter by date", "filter by visits"];
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [mimDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const isMobile = useIsMobile();

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  const handleMinAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinAmount(Number(event.target.value));
  };

  const handleMaxAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxAmount(Number(event.target.value));
  };

  function handleMaxDateChange(value: Dayjs | null) {
    if (value) {
      setMaxDate(value.format("YYYY-MM-DD"));
    } else {
      setMaxDate("");
    }
  }

  function handleMinDateChange(value: Dayjs | null) {
    if (value) {
      setMinDate(value.format("YYYY-MM-DD"));
    } else {
      setMinDate("");
    }
  }

  const handleRemoveAllFilters = () => {
    setSelectedOptions([]);
    setMaxAmount(Number(0));
    setMinAmount(Number(0));
    setMaxDate("");
    setMinDate("");
    handleFilters(0, 0, "", "");
  };

  return (
    <div>
      <Box my={isMobile ? 6 : 0}>
        <FormControl sx={{ mx: 2, width: isMobile ? "90%" : 300 }}>
          <InputLabel>{isMobile ? "filters" : "Select filters"} </InputLabel>
          <Select
            multiple
            value={selectedOptions}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {options.map((filterType) => (
              <MenuItem key={filterType} value={filterType}>
                <Checkbox checked={selectedOptions.includes(filterType)} />
                <ListItemText primary={filterType} />
              </MenuItem>
            ))}
          </Select>
          {selectedOptions && selectedOptions.includes("filter by date") ? (
            <Box gap={2} mt={2} display={"flex"} alignContent={"space-between"}>
              <DatePicker
                value={dayjs(mimDate)}
                onChange={handleMinDateChange}
                sx={{ minWidth: "100px" }}
                label="From date"
              />
              <DatePicker
                value={dayjs(maxDate)}
                onChange={handleMaxDateChange}
                sx={{ minWidth: "100px" }}
                label="To date"
              />
            </Box>
          ) : null}
          {selectedOptions && selectedOptions.includes("filter by visits") ? (
            <Box gap={2} mt={2} display={"flex"} alignContent={"space-between"}>
              <TextField
                sx={{ minWidth: "100px" }}
                type="number"
                placeholder="Minimum"
                value={minAmount !== 0 ? minAmount : ""}
                onChange={handleMinAmountChange}
              />
              <TextField
                sx={{ minWidth: "100px" }}
                type="number"
                placeholder="Maximum"
                value={maxAmount !== 0 ? maxAmount : ""}
                onChange={handleMaxAmountChange}
              />
            </Box>
          ) : null}
          <Box display={"flex"} justifyContent={"space-between"} mt={2}>
            <Button
              variant="contained"
              onClick={() =>
                handleFilters(maxAmount, minAmount, mimDate, maxDate)
              }
            >
              Apply Filter
            </Button>
            <Button variant="contained" onClick={handleRemoveAllFilters}>
              Remove Filters
            </Button>
          </Box>
        </FormControl>
      </Box>
    </div>
  );
}

export default AppTableFilters;

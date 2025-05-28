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
import React, { useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import { DatePicker } from "@mui/x-date-pickers";

type AppTableFiltersProps = {
  handleFilters: () => void;
};

function AppTableFilters({ handleFilters }: AppTableFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const selectableFilters = ["filter by date", "filter by visits"];
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const isMobile = useIsMobile();

  const handleChange = (event: SelectChangeEvent<typeof selectableFilters>) => {
    const {
      target: { value },
    } = event;
    setSelectedFilters(typeof value === "string" ? value.split(",") : value);
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

  return (
    <div>
      <Box>
        <FormControl sx={{ m: 2, width: isMobile ? 100 : 300 }}>
          <InputLabel>{isMobile ? "filters" : "Select filters"} </InputLabel>
          <Select
            multiple
            value={selectedFilters}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {selectableFilters.map((filterType) => (
              <MenuItem key={filterType} value={filterType}>
                <Checkbox checked={selectedFilters.includes(filterType)} />
                <ListItemText primary={filterType} />
              </MenuItem>
            ))}
          </Select>
          {selectedFilters && selectedFilters.includes("filter by date") ? (
            <Box gap={2} mt={2} display={"flex"} alignContent={"space-between"}>
              <DatePicker sx={{ minWidth: "100px" }} label="From date" />
              <DatePicker sx={{ minWidth: "100px" }} label="To date" />
            </Box>
          ) : null}

          {selectedFilters && selectedFilters.includes("filter by visits") ? (
            <Box gap={2} mt={2} display={"flex"} alignContent={"space-between"}>
              <TextField
                sx={{ minWidth: "100px" }}
                type="number"
                placeholder="0"
                value={minAmount !== 0 ? minAmount : ""}
                onChange={handleMinAmountChange}
              />
              <TextField
                sx={{ minWidth: "100px" }}
                type="number"
                placeholder="0"
                value={maxAmount !== 0 ? maxAmount : ""}
                onChange={handleMaxAmountChange}
              />
            </Box>
          ) : null}
        </FormControl>
      </Box>
    </div>
  );
}

export default AppTableFilters;

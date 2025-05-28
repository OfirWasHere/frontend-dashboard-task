import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Rectangle,
} from "recharts";
import { VisitDataModal } from "../../utils/types";
import { Box, Button } from "@mui/material";

function filterByTime(data: VisitDataModal[], time: string) {
  let result: any = {};
  let slicedDate: string = "";

  data?.forEach((item) => {
    if (time === "daily") {
      const dayYearMonth = item.date;
      slicedDate = dayYearMonth;
    }
    if (time === "weekly") {
      const year = item.date.slice(0, 4);
      const week = item.date.slice(7, 10);
      slicedDate = year.concat(week);
    }
    if (time === "monthly") {
      slicedDate = item.date.slice(0, 7);
    }
    if (!result[slicedDate]) {
      result[slicedDate] = 0;
    }
    result[slicedDate] += item.visits;
  });

  return Object.entries(result).map(([name, visits]) => ({
    name,
    visits,
  }));
}

type AppChartProps = {
  visitsData: VisitDataModal[];
  defaultSelection?: "daily" | "weekly" | "monthly" | string;
};

function AppChart({ visitsData, defaultSelection = "weekly" }: AppChartProps) {
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState<string>(defaultSelection);

  useEffect(() => {
    const newData = (time: string) => {
      if (time) return filterByTime(visitsData, time);
      return [];
    };
    setChartData(newData(filter));
  }, [filter, visitsData]);

  return (
    <Box>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="visits"
            fill="#B3CDAD"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button onClick={() => setFilter("daily")} variant="contained">
          Filter by day
        </Button>
        <Button onClick={() => setFilter("weekly")} variant="contained">
          Filter by week
        </Button>
        <Button onClick={() => setFilter("monthly")} variant="contained">
          Filter by month
        </Button>
      </Box>
    </Box>
  );
}

export default AppChart;

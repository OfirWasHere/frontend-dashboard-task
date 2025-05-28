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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const mydata = [
  {
    id: "6kfXoxbnWIyYgGcRZWOa",
    date: "2025-05-21",
    visits: 1100,
  },
  {
    id: "72Gl7lBIbdmZM4iLa5E9",
    visits: 21,
    date: "2025-05-14",
  },
  {
    id: "9eTgKL8XwtkKDlygivio",
    visits: 452,
    date: "2025-05-08",
  },
  {
    id: "E53AGOYkAqj0LnQSZVzD",
    visits: 6,
    date: "2025-05-08",
  },
  {
    id: "GjRL1LPQvM5krBnBvICY",
    date: "2025-05-25",
    visits: 10,
  },
  {
    id: "K7RjOVpJn9wAWZW3ne6p",
    visits: 1111,
    date: "2025-05-14",
  },
  {
    id: "LX70CdbZcwI3QQ4IFpTZ",
    visits: 6,
    date: "2025-05-14",
  },
  {
    id: "Q57zFdX20NFueCpfTMH2",
    visits: 6,
    date: "2025-05-14",
  },
  {
    id: "SctE8LNh9NjHEuuXYXfI",
    visits: 444,
    date: "2025-05-01",
  },
  {
    id: "gGAj7MRbw1jM059AAyKy",
    visits: 1,
    date: "2025-05-28",
  },
  {
    id: "gpbD1fh9IsZGfasd8qXR",
    visits: 6,
    date: "2025-04-14",
  },
  {
    id: "jxsVRk1MxnOFz7b6oPbf",
    visits: 4354,
    date: "2025-05-28",
  },
  {
    id: "qg8TIfus83YooOnV5Gmq",
    visits: 444,
    date: "2025-05-01",
  },
  {
    id: "tuy2eIKLQQOOYkbX8DFS",
    visits: 422,
    date: "2025-05-28",
  },
  {
    id: "uKO74zZkIVPbmIHxZA6z",
    visits: 6,
    date: "2025-05-14",
  },
];

function filterByMonthly() {
  let result: any = {};

  mydata.forEach((item) => {
    const yearMonthly = item.date.slice(0, 7);
    if (!result[yearMonthly]) {
      result[yearMonthly] = 0;
    }
    result[yearMonthly] += item.visits;
  });

  return Object.entries(result).map(([name, visits]) => ({
    name,
    visits,
  }));
}

function filterByDaily() {
  let result: any = {};

  mydata.forEach((item) => {
    const dayYearMonth = item.date;

    if (!result[dayYearMonth]) {
      result[dayYearMonth] = 0;
    }
    result[dayYearMonth] += item.visits;
  });

  console.log(result);

  return Object.entries(result).map(([name, visits]) => ({
    name,
    visits,
  }));
}

type AppChartProps = {
  visitsData: VisitDataModal[];
  defaultSelection?: "daily" | "weekly" | "monthly" | string;
};

function filterChart(time: string) {
  if (time === "monthly") return filterByMonthly();
  if (time === "daily") return filterByDaily();
  return [];
}

function AppChart({ visitsData, defaultSelection = "monthly" }: AppChartProps) {
  const [chartData, setChartData] = useState(() =>
    filterChart(defaultSelection)
  );
  const [filter, setFilter] = useState<string>(defaultSelection);

  useEffect(() => {
    const newData = filterChart(filter);
    setChartData(newData);
  }, [filter]);

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

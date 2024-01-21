import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const NavigationChartSearch = () => {
  const chartList = JSON.parse(localStorage.getItem("charts"));

  const handleSelectedChart = (event, value) => {
    if (value) {
      const selectedChart = chartList.find((chart) => chart.id === value.value);
      const sub = selectedChart.type === "x-mr" ? "i" : "s";
      const link = `/${sub}/${selectedChart.id}`;
      window.open(link, "_blank");
    }
  };

  return (
    <Stack sx={{ width: 250 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={chartList.map((option) => ({
          label: option.name,
          value: option.id,
          key: option.id,
        }))}
        onChange={handleSelectedChart}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search charts by name or tags"
            size="small"
          />
        )}
      />
    </Stack>
  );
};

export default NavigationChartSearch;

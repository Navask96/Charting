import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Slider from "@mui/material/Slider";

function Histogram(props) {
  const { data, subgroupSize } = props;
  const [sensitivity, setSensitivity] = useState(10);
  let filteredData = [];

  const handleSliderChange = (event, newValue) => {
    setSensitivity(newValue);
  };

  if (subgroupSize < 2) {
    filteredData = data.map((row) => row[3]).filter((value) => value !== "");
  } else {
    for (let row = 0; row < data.length; row++) {
      let validRow = true;
      let validRowValue = [];
      for (let subGroup = 3; subGroup < subgroupSize + 3; subGroup++) {
        if (isNaN(parseFloat(data[row][subGroup]))) {
          validRow = false;
        }
        validRowValue.push(data[row][subGroup]);
      }
      if (validRow) {
        filteredData = [...filteredData, ...validRowValue];
      }
    }
  }

  // Extract the values and calculate the frequency distribution
  const values = filteredData;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const numBins = sensitivity; // You can adjust the number of bins as needed
  const binSize = (maxValue - minValue) / numBins;

  const histogramData = Array.from({ length: numBins }, (_, index) => {
    const binStart = minValue + index * binSize;
    const binEnd = binStart + binSize;
    const binName = `${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`;
    const binValues = values.filter(
      (value) => value >= binStart && value < binEnd
    );
    return {
      name: binName,
      value: binValues.length,
    };
  });

  return (
    <>
      <h5>Histogram</h5>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="slider-container">
        <p>Sensitivity:</p>
        <Slider
          value={sensitivity}
          min={0}
          max={21}
          step={1}
          valueLabelDisplay="auto"
          onChange={handleSliderChange}
        />
      </div>
    </>
  );
}

export default Histogram;

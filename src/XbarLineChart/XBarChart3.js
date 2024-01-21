import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  createChart3DataSets,
  createValidRows,
} from "./xBarChartsHelpFunction";

const XBarChart3 = (props) => {
  const { chartData, chartProperties, subgroupSize } = props;
  let render = 1;
  const [hasRendered, setHasRendered] = useState(false);
  const [validChartData, setValidChartData] = useState([]);
  const [valuesData, setValuesData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [chartAvailable, setChartAvailable] = useState(false);
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    const validRows = createValidRows(chartData, subgroupSize);
    setValidChartData(validRows);
  }, [chartData]);

  useEffect(() => {
    const validUsl = !isNaN(parseFloat(chartProperties.upperSpecLimitValue));
    const validLsl = !isNaN(parseFloat(chartProperties.lowerSpecLimitValue));
    if (validUsl || validLsl) {
      setChartAvailable(true);
    } else {
      setChartAvailable(false);
    }
  }, [chartProperties]);

  useEffect(() => {
    if (hasRendered) {
      return;
    }

    if (render === 1) {
      setValidChartData([]);
    }

    setHasRendered(true);
  }, [validChartData, hasRendered]);

  useEffect(() => {
    let valueArray = [];
    let labels = [];

    validChartData.forEach((row) => {
      labels.push(row[1] === "" ? "" : row[1]);
      let valueRow = [];
      for (let sub = 3; sub < 3 + subgroupSize; sub++) {
        valueRow.push(parseFloat(row[sub]));
      }
      valueArray.push(valueRow);
    });
    setValuesData(valueArray);
    setXLabels(labels.slice(1));
  }, [validChartData]);

  useEffect(() => {
    const dataSet = createChart3DataSets(
      valuesData,
      chartProperties,
      xLabels,
      subgroupSize
    );
    setDataSets(dataSet);
  }, [valuesData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} textAlign="center">
        <Typography>
          Process Capability & Performance Ratios (Cumulative)
        </Typography>
      </Grid>
      {chartAvailable ? (
        <Grid item xs={12}>
          <div style={{ width: "100%" }}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                width={500}
                height={200}
                data={dataSets}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartProperties.displayCpk && (
                  <Line
                    strokeWidth={3}
                    connectNulls
                    dataKey="Cpk"
                    stroke="#0073D8"
                  />
                )}
                {chartProperties.displayCp && (
                  <Line
                    strokeWidth={3}
                    connectNulls
                    dataKey="Cp"
                    stroke="#46ba3d"
                  />
                )}
                {chartProperties.displayPpk && (
                  <Line
                    strokeWidth={3}
                    connectNulls
                    dataKey="Ppk"
                    stroke="#d4d404"
                  />
                )}
                {chartProperties.displayPp && (
                  <Line
                    strokeWidth={3}
                    connectNulls
                    dataKey="Pp"
                    stroke="#a015eb"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12} textAlign="center">
          <Typography color="red">
            Please enter Lower Spec Limit or Upper Spec Limit
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default XBarChart3;

import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { createChart3DataSet } from "./chartHelpFunction";

const XmrChart3 = (props) => {
  const { chartData, chartProperties } = props;
  const [validChartData, setValidChartData] = useState([]);
  const [valuesData, setValuesData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  let render = 1;
  const [hasRendered, setHasRendered] = useState(false);
  const [chartAvailable, setChartAvailable] = useState(false);

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
    const validValues = chartData.filter((row) => {
      return !isNaN(parseFloat(row[3]));
    });
    setValidChartData(validValues);
  }, [chartData]);

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
      valueArray.push(parseFloat(row[3]));
    });
    setValuesData(valueArray);
    setXLabels(labels.slice(1));
  }, [validChartData]);

  useEffect(() => {
    const newDataSets = createChart3DataSet(
      valuesData,
      chartProperties,
      xLabels
    );
    setDataSets(newDataSets);
  }, [valuesData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} textAlign="center">
        <Typography>
          Process Capability & Performance Ratios (Cumulative)
        </Typography>
      </Grid>
      {chartAvailable ? (
        <Grid item xs={12} textAlign="center">
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

export default XmrChart3;

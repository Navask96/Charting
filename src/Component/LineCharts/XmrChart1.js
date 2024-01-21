import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { createDataSets } from "./chartHelpFunction";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const XmrChart1 = (props) => {
  const { chartData, chartProperties, headings, saveChart1Name } = props;

  const [chartName, setChartName] = useState("");
  const [openEditContext, setOpenEditContext] = useState(false);
  const [validChartData, setValidChartData] = useState([]);
  const [lockLimit, setLockLimit] = useState(0);
  const [valuesData, setValuesData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [targetView, setTargetView] = useState(false);
  let render = 1;
  const [hasRendered, setHasRendered] = useState(false);

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
    setXLabels(labels);
  }, [validChartData]);

  useEffect(() => {
    const newDataSets = createDataSets(
      valuesData,
      lockLimit,
      chartProperties,
      xLabels
    );
    setDataSets(newDataSets);

    if (
      parseFloat(chartProperties.targetValue) === 0 ||
      isNaN(parseFloat(chartProperties.targetValue))
    ) {
      setTargetView(false);
    } else {
      setTargetView(true);
    }
  }, [valuesData, chartProperties]);

  useEffect(() => {
    setChartName(headings.chart1);
  }, [headings]);

  const getChatName = (e) => {
    setChartName(e.target.value);
  };

  const saveChartName = () => {
    saveChart1Name(chartName);
    setOpenEditContext(false);
  };

  const cancelChartNameEdit = () => {
    setChartName(headings.chart1);
    setOpenEditContext(false);
  };

  return (
    <Grid container spacing={3}>
      <Dialog open={openEditContext}>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DialogContentText>Edit Chart Name</DialogContentText>
            <CloseIcon
              style={{
                color: "#ff1c1c",
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={() => setOpenEditContext(false)}
            />
          </div>
          <br />
          <TextField
            id="chartName"
            variant="standard"
            label="Chart Name"
            value={chartName}
            onClick={() => setChartName("")}
            onChange={(e) => getChatName(e)}
          />
          <br />
          <Button
            sx={{
              textAlign: "center",
              bgcolor: "#448aff",
              borderRadius: 1,
              margin: 1,
            }}
            variant="contained"
            onClick={() => cancelChartNameEdit()}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textAlign: "center",
              bgcolor: "#448aff",
              borderRadius: 1,
              margin: 1,
            }}
            variant="contained"
            onClick={() => saveChartName()}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
      <Grid item container xs={12} justifyContent="center">
        <Typography style={{ textAlign: "center" }} variant="h6">
          {chartName}
        </Typography>
        <div style={{ textAlign: "center", marginLeft: "5px" }}>
          <EditIcon
            style={{ color: "#ff1c1c", cursor: "pointer" }}
            onClick={() => setOpenEditContext(true)}
          />
        </div>
      </Grid>
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
              <Line
                strokeWidth={3}
                connectNulls
                dataKey="value"
                stroke="#000000"
              />
              {chartProperties.displayControlLimits && (
                <Line
                  strokeWidth={3}
                  connectNulls
                  dataKey="X_UCL"
                  stroke="#ff0000"
                />
              )}
              {chartProperties.displayControlLimits && (
                <Line
                  strokeWidth={3}
                  connectNulls
                  dataKey="X_LCL"
                  stroke="#ff0000"
                />
              )}
              {chartProperties.displayCenterLines && (
                <Line
                  strokeWidth={3}
                  connectNulls
                  dataKey="X_CL"
                  stroke="#525252"
                />
              )}
              {targetView && (
                <Line
                  strokeWidth={3}
                  connectNulls
                  dataKey="Target"
                  stroke="#24d408"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>
    </Grid>
  );
};

export default XmrChart1;

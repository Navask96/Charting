import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  createChart2DataSets,
  createValidRows,
} from "./xBarChartsHelpFunction";

const XBarChart2 = (props) => {
  const { chartProperties, headings, subgroupSize, tableData, saveChart2Name } =
    props;

  let render = 1;
  const [chartNameEdit, setChartNameEdit] = useState(false);
  const [chartName, setChartName] = useState("");
  const [validChartData, setValidChartData] = useState([]);
  const [lockLimit, setLockLimit] = useState(0);
  const [valuesData, setValuesData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  // Get valid rows from table
  useEffect(() => {
    const validRows = createValidRows(tableData, subgroupSize);
    setValidChartData(validRows);
  }, [tableData]);

  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (hasRendered) {
      return;
    }

    if (render === 1) {
      setValidChartData([]);
    }

    setHasRendered(true);
  }, [validChartData, hasRendered]);

  //  Get valid values
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
    setXLabels(labels);
  }, [validChartData]);

  // Calculate line data sets
  useEffect(() => {
    const dataSet = createChart2DataSets(
      valuesData,
      lockLimit,
      xLabels,
      subgroupSize
    );
    setDataSets(dataSet);
  }, [valuesData, lockLimit]);

  // Change Chart name
  useEffect(() => {
    setChartName(headings?.chart2);
  }, [headings.chart2]);

  const openEditMode = () => {
    setChartNameEdit(!chartNameEdit);
  };
  const getChartName = (e) => {
    setChartName(e.target.value);
  };
  const cancelChartNameEdit = () => {
    setChartName(headings.chart2);
    openEditMode();
  };
  const saveChartName = () => {
    saveChart2Name(chartName);
    openEditMode();
  };

  return (
    <Grid container spacing={2}>
      <Dialog open={chartNameEdit}>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DialogContentText>Edit Chart Name</DialogContentText>
            <CloseIcon
              style={{
                color: "#ff1c1c",
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={() => openEditMode()}
            />
          </div>
          <br />
          <TextField
            id="chartName"
            variant="standard"
            label="Chart Name"
            value={chartName}
            onClick={() => setChartName("")}
            onChange={(e) => getChartName(e)}
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
            onClick={() => setChartNameEdit(true)}
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
                dataKey="MR"
                stroke="#000000"
              />
              {chartProperties.displayControlLimits && (
                <Line
                  strokeWidth={3}
                  connectNulls
                  dataKey="MR_UCL"
                  stroke="#0a26f7"
                />
              )}
              {chartProperties.displayControlLimits && (
                <Line
                  strokeWidth={3}
                  connectNulls
                  dataKey="MR_LCL"
                  stroke="#0a26f7"
                />
              )}
              {chartProperties.displayCenterLines && (
                <Line
                  strokeWidth={3}
                  connectNulls
                  dataKey="MR_CL"
                  stroke="#525252"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>
    </Grid>
  );
};

export default XBarChart2;

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
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { createChart2DataSet } from "./chartHelpFunction";

const XmrChart2 = (props) => {
  const { chartData, chartProperties, headings, saveChart2Name } = props;
  let render = 1;
  const [chartName, setChartName] = useState("");
  const [openEditContext, setOpenEditContext] = useState(false);
  const [validChartData, setValidChartData] = useState([]);
  const [lockLimit, setLockLimit] = useState(0);
  const [valuesData, setValuesData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
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
    setXLabels(labels.slice(1));
  }, [validChartData]);

  useEffect(() => {
    const newDataSets = createChart2DataSet(valuesData, lockLimit, xLabels);
    setDataSets(newDataSets);
  }, [valuesData, lockLimit]);

  useEffect(() => {
    setChartName(headings.chart2);
  }, [headings.chart2]);

  const getChatName = (e) => {
    setChartName(e.target.value);
  };
  const saveChartName = () => {
    saveChart2Name(chartName);
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
      <Grid item xs={6}>
        <Typography style={{ textAlign: "right" }} variant="h6">
          {chartName}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <EditIcon
          style={{ color: "#ff1c1c" }}
          onClick={() => setOpenEditContext(true)}
        />
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

export default XmrChart2;

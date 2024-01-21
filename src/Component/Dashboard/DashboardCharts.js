import {
  Button,
  Checkbox,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  DialogContentText,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import LockIcon from "@mui/icons-material/Lock";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {
  createEverything,
  getAllEverything,
  deleteEverything,
  updateEverything,
  checkPasswordProtection,
} from "../../service.global";
import ChartSearch from "./ChartSearch";

const DashboardCharts = () => {
  const [charts, setCharts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await getAllEverything("chart-data");
        setCharts(response);
        const chartList = response.map((chart) => ({
          name: chart.name,
          type: chart.chartType,
          id: chart._id,
        }));
        localStorage.removeItem("charts");
        localStorage.setItem("charts", JSON.stringify(chartList));
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          console.error("Error fetching chart data:", error.response.status);
        }
      }
    };

    fetchChartData();
  }, []);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newChartName, setNewChartName] = useState("");
  const [newChartType, setNewChartType] = useState("Individual");
  const [newChartSubgroupSize, setNewChartSubgroupSize] = useState(1);
  const [newChartPassword, setNewChartPassword] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [chartDataInEditMode, setChartDataInEditMode] = useState({});
  const [editIsPublic, setEditIsPublic] = useState();
  const [editedPassword, setEditedPassword] = useState("");
  const [editedTags, setEditedTags] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteChartName, setDeleteChartName] = useState("");
  const [deleteChartId, setDeleteChartId] = useState("");

  const chartType = (value) => {
    switch (value) {
      case "x-mr":
        return "Individual";
      case "x-bar-r":
        return "Subgrouped";
      case "x-bar-s":
        return "X-bar and s";
      default:
        return "Individual";
    }
  };

  const baseUrl = window.location.origin;

  const createLink = (_id, subGroup) => {
    // Get the base URL from the browser's URL

    const group = subGroup === "Individual" ? "i" : "s";
    const link = "/" + group + "/" + _id;
    return link;
  };

  const launch = (link) => {
    navigate(link);
  };

  //Add new Chart
  const [openCreateSnackBar, setOpenCreateSnackBar] = useState(false);

  const handleCloseCreateMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCreateSnackBar(false);
  };

  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const getChartName = (name) => {
    setNewChartName(name);
  };
  const getSubgroupSize = (e) => {
    if (e > 1) {
      setNewChartType("Subgroup");
      setNewChartSubgroupSize(e < 10 ? e : 10);
    } else {
      setNewChartSubgroupSize(1);
      setNewChartType("Individual");
    }
  };
  const setPasswordProtection = () => {
    setIsPublic(!isPublic);
  };
  const reset = () => {
    setNewChartName("");
    setNewChartType("Individual");
    setNewChartSubgroupSize("");
    setNewChartPassword("");
  };

  const createValueColumns = () => {
    let values = [];
    for (let subGroup = 1; subGroup <= newChartSubgroupSize; subGroup++) {
      values.push("X" + subGroup);
    }
    return values;
  };

  const createChart = () => {
    if (newChartSubgroupSize === 1) {
      const headings = {
        chart1: "Individuals Chart",
        chart2: "Moving Ranges Chart",
      };
      const newChartProperties = {
        displayCenterLines: true,
        displayControlLimits: true,
        displayCp: true,
        displayCpk: true,
        displayPp: true,
        displayPpk: true,
        lowerSpecLimitValue: 0,
        targetValue: "",
        upperSpecLimitValue: 0,
      };
      const newColumnHeaders = [
        "Lock Limits",
        "Reference 1",
        "Reference 2",
        "Value",
        "Notes",
        "movingRange",
        "Cumul Average",
        "Cum.Avg Mr",
        "Cum.Avg Est SD",
        "x UCL",
        "x CL",
        "x LCL",
        "mr UCL",
        "mr CL",
        "CPL",
        "CPU",
        "CPK",
        "AVG CPK",
        "Sample STD.DV",
        "PPL",
        "PPU",
        "PPK",
        "AVG PPK",
        "CP",
        "PP",
      ];
      const newChartData = {
        name: newChartName,
        isPublic: !isPublic,
        password: newChartPassword,
        subgroupSize: newChartSubgroupSize,
        chartType: newChartType === "Individual" ? "x-mr" : "x-bar-r",
        headings: headings,
        tableData: [],
        chartProperties: newChartProperties,
        columnHeaders: newColumnHeaders,
      };
      const data = {
        data: newChartData,
        ent: "chart-data",
      };
      console.log(data);
      setLoading(true);
      createEverything(data).then((res) => {
        console.log(res);
        getAllEverything("chart-data").then((res) => {
          setCharts(res);
          setLoading(false);
        });
      });
    } else {
      const valueColumnNames = createValueColumns();
      const newColumnHeaders = [
        "Lock Limits",
        "Reference 1",
        "Reference 2",
        ...valueColumnNames,
        "Notes",
        "Average",
        "Range",
        "Cumul. Grand Avg",
        "Cumul. Avg Range",
        "Cumul. Est Sd",
        "Sample Std Dev",
        "Avg UCL",
        "Avg CL",
        "Avg LCL",
        "Rng UCL",
        "Rng CL",
        "Rng LCL",
        "CPL",
        "CPU",
        "CPK",
        "Avg CPK",
        "PPL",
        "PPU",
        "PPK",
        "Avg PPK",
        "CP",
        "PP",
      ];
      const headings = {
        chart1: "Averages Chart",
        chart2: "Ranges Chart",
      };
      const newChartProperties = {
        displayCenterLines: true,
        displayControlLimits: true,
        displayCp: true,
        displayCpk: true,
        displayPp: true,
        displayPpk: true,
        lowerSpecLimitValue: 0,
        targetValue: "",
        upperSpecLimitValue: 0,
      };
      const newChartData = {
        name: newChartName,
        isPublic: !isPublic,
        password: newChartPassword,
        subgroupSize: newChartSubgroupSize,
        chartType: newChartType === "Individual" ? "x-mr" : "x-bar-r",
        headings: headings,
        tableData: [],
        chartProperties: newChartProperties,
        columnHeaders: newColumnHeaders,
      };
      const data = {
        data: newChartData,
        ent: "chart-data",
      };
      setLoading(true);
      createEverything(data).then((res) => {
        console.log(res);
        setOpenCreateSnackBar(true);
        getAllEverything("chart-data").then((res) => {
          setCharts(res);
          setLoading(false);
        });
      });
    }

    openModal();
  };

  // Delete dashboard chart
  const [openDeleteSnackBar, setOpenDeleteSnackBar] = useState(false);

  const handleCloseDeleteMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteSnackBar(false);
  };

  const deleteDashboardChart = (chartId) => {
    setDeleteChartId(chartId);
    setDeleteModalOpen(true);
  };

  const [loading, setLoading] = useState(false);

  const deleteSelectedChart = () => {
    setLoading(true);
    deleteEverything(deleteChartId, "chart-data").then((res) => {
      console.log(res);
      setOpenDeleteSnackBar(true);
      getAllEverything("chart-data").then((res) => {
        setCharts(res);
        setLoading(false);
      });
    });

    setDeleteModalOpen(false);
    setDeleteChartName("");
    setDeleteChartId("");
  };

  // Edit Chart
  const openEditModal = (chart) => {
    console.log(chart);
    setChartDataInEditMode(chart);
    if (chart?.tags?.length > 0) {
      setChartDataInEditMode((prevData) => ({
        ...prevData,
        tags: [...(prevData.tags || [])],
      }));
    }
    setEditModalIsOpen(!editModalIsOpen);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };
  const editPasswordProtection = () => {
    setEditIsPublic(!editIsPublic);
  };
  const editPassword = (e) => {
    setEditedPassword(e.target.value);
  };
  const updateChart = () => {
    const chartUpdates = {
      isPublic: !editIsPublic,
      password: editIsPublic ? editedPassword : "",
      subgroupSize: chartDataInEditMode.subgroupSize,
      tags: chartDataInEditMode.tags,
    };
    updateEverything(chartDataInEditMode._id, chartUpdates, "chart-data").then(
      (res) => {
        console.log(res);
        getAllEverything("chart-data").then((res) => {
          setCharts(res);
          setEditModalIsOpen(false);
        });
      }
    );
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  //tags input fields

  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setChartDataInEditMode((prevData) => ({
        ...prevData,
        tags: [...(prevData.tags || []), tagInput],
      }));
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setChartDataInEditMode((prevData) => ({
      ...prevData,
      tags: (prevData.tags || []).filter((tag) => tag !== tagToDelete),
    }));
  };

  //chart filtering

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredCharts, setFilteredCharts] = useState([]);
  const [numberOfStartChart, setNumberOfStartChart] = useState(0);
  const [numberOfEndChart, setNumberOfEndChart] = useState(0);
  const [chartSetIndex, setChartSetIndex] = useState(1);

  useEffect(() => {
    const chartList = [...charts];
    let currentShowingCharts = chartList.splice(0, 10);
    setFilteredCharts(currentShowingCharts);
    setNumberOfStartChart(1);
    setNumberOfEndChart(0 + currentShowingCharts.length);
    setChartSetIndex(1);
  }, [charts]);

  const nextChartSets = () => {
    const chartList = [...charts];
    let currentChartSetIndex = 1 + chartSetIndex;
    if (chartSetIndex * 10 < charts.length) {
      let currentShowingCharts = chartList.splice(chartSetIndex * 10, 10);
      setFilteredCharts(currentShowingCharts);
      setNumberOfStartChart(chartSetIndex * 10 + 1);
      setNumberOfEndChart(chartSetIndex * 10 + currentShowingCharts.length);
      setChartSetIndex(currentChartSetIndex);
    }
  };
  const previousChartSets = () => {
    const chartList = [...charts];
    let currentChartSetIndex = chartSetIndex - 1;
    if (currentChartSetIndex !== 0) {
      setNumberOfStartChart(currentChartSetIndex * 10 - 9);
      setNumberOfEndChart(currentChartSetIndex * 10);
      let currentShowingCharts = chartList.splice(
        currentChartSetIndex * 10 - 10,
        10
      );
      setFilteredCharts(currentShowingCharts);
      setChartSetIndex(currentChartSetIndex);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm || searchTerm === "") {
      setFilteredCharts(charts);
      return;
    }
    // Filter charts based on the search term
    const filtered = charts.filter((chart) => {
      return (
        chart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chart?.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    setFilteredCharts(filtered);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "80%", padding: 2 }}>
        {loading && <LinearProgress />}
        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {deleteChartName}?
            </DialogContentText>
            <div>
              <Button
                sx={{
                  textAlign: "center",
                  bgcolor: "#fc0000",
                  borderRadius: 1,
                  margin: 1,
                }}
                variant="contained"
                onClick={() => deleteSelectedChart()}
              >
                Delete
              </Button>
              <Button
                sx={{
                  textAlign: "center",
                  bgcolor: "#0096ff",
                  borderRadius: 1,
                  margin: 1,
                }}
                variant="contained"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={editModalIsOpen} onClose={closeEditModal}>
          <DialogContent>
            <DialogContentText>Update Chart</DialogContentText>
            <div>
              <Grid
                container
                spacing={3}
                sx={{
                  width: "600px",
                  alignItems: "center",
                  backgroundColor: "white",
                  paddingTop: "10px",
                }}
              >
                <Grid item xs={6}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="chartName"
                    label="Chart Name"
                    variant="standard"
                    value={chartDataInEditMode.name}
                    onChange={(e) =>
                      setChartDataInEditMode({
                        ...chartDataInEditMode,
                        name: e.target.value,
                      })
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="chartType"
                    label="Chart Type"
                    variant="standard"
                    value={
                      chartDataInEditMode.chartType === "x-mr"
                        ? "Individual"
                        : "Subgroup"
                    }
                    InputProps={{ readOnly: true }}
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="subgroupSize"
                    value={chartDataInEditMode.subgroupSize}
                    label="Subgroup Size"
                    variant="standard"
                    type="number"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={!editIsPublic}
                    id="password"
                    label="Password"
                    value={editedPassword}
                    variant="standard"
                    type="password"
                    onClick={() => setEditedPassword("")}
                    onChange={(e) => editPassword(e)}
                  ></TextField>
                </Grid>
                <Grid item xs={1}>
                  <Checkbox
                    checked={editIsPublic}
                    onClick={editPasswordProtection}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography>Keep chart password-protected?</Typography>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    {chartDataInEditMode?.tags &&
                      chartDataInEditMode?.tags?.length > 0 &&
                      chartDataInEditMode?.tags?.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          color="primary"
                          onDelete={() => handleDeleteTag(tag)}
                          style={{ marginRight: 5 }}
                        />
                      ))}
                  </div>
                  <TextField
                    id="tags"
                    label="Tags"
                    variant="standard"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag();
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Button
                    sx={{
                      textAlign: "center",
                      bgcolor: "#0096ff",
                      borderRadius: 1,
                      margin: 1,
                    }}
                    variant="contained"
                    onClick={() => updateChart()}
                  >
                    Update Chart
                  </Button>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isOpenModal} onClose={closeModal}>
          <DialogTitle>Create New Chart</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="chartName"
                  label="Chart Name"
                  variant="standard"
                  value={newChartName}
                  onChange={(e) => getChartName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="chartType"
                  label="Chart Type"
                  variant="standard"
                  value={newChartType}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="subgroupSize"
                  value={newChartSubgroupSize}
                  label="Subgroup Size"
                  variant="standard"
                  type="number"
                  onChange={(e) => getSubgroupSize(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={!isPublic}
                  id="password"
                  label="Password"
                  value={newChartPassword}
                  variant="standard"
                  type="password"
                  onChange={(e) => setNewChartPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                <Checkbox checked={isPublic} onClick={setPasswordProtection} />
              </Grid>
              <Grid item xs={11}>
                <Typography>Keep chart password-protected?</Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={reset}>
              Reset
            </Button>
            <Button variant="contained" color="primary" onClick={createChart}>
              Create Chart
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container sx={{ padding: 1 }}>
          <Grid item xs={9}>
            <Typography sx={{ fontSize: 25 }}>My Charts</Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "right" }}>
            <AddCircleIcon
              sx={{ color: "#448aff", fontSize: 40 }}
              onClick={openModal}
            />
          </Grid>
          <Snackbar
            open={openDeleteSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseDeleteMessage}
          >
            <Alert
              onClose={handleCloseDeleteMessage}
              severity="error"
              sx={{
                width: "100%",
                bgcolor: "#ff0022",
                color: "#ffffff",
                "& .MuiAlert-icon": {
                  color: "#ffffff",
                },
              }}
            >
              Successfully Deleted Chart
            </Alert>
          </Snackbar>
          <Snackbar
            open={openCreateSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseCreateMessage}
          >
            <Alert
              onClose={handleCloseCreateMessage}
              severity="success"
              sx={{
                width: "100%",
                bgcolor: "#07fa0c",
                color: "#ffffff",
                "& .MuiAlert-icon": {
                  color: "#ffffff",
                },
              }}
            >
              Successfully Create Chart
            </Alert>
          </Snackbar>
        </Grid>
        <TableContainer>
          <ChartSearch onSearch={handleSearch} />

          <Table
            style={{
              marginTop: 4,
            }}
          >
            <TableHead
              style={{
                backgroundColor: "#F1EFEF",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <TableRow>
                <TableCell>Chart Name</TableCell>
                <TableCell>Subgroup Size</TableCell>
                <TableCell>Chart Type</TableCell>
                <TableCell>Link to Share</TableCell>
                <TableCell>Password-protected?</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {charts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              ) : (
                filteredCharts.map((chart, index) => (
                  <TableRow key={index}>
                    <TableCell>{chart.name}</TableCell>
                    <TableCell>{chart.subgroupSize}</TableCell>
                    <TableCell>{chartType(chart.chartType)}</TableCell>
                    <TableCell>
                      {baseUrl +
                        createLink(chart._id, chartType(chart.chartType))}
                      <br />
                      {Array.isArray(chart.tags) && chart.tags.length > 0 ? (
                        chart.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            color="primary"
                            style={{ marginRight: 5 }}
                          />
                        ))
                      ) : (
                        // Handle the case when chart.tags is not an array or is empty
                        <span></span>
                      )}
                    </TableCell>
                    <TableCell>
                      {chart?.password?.length > 0 ? (
                        <LockIcon />
                      ) : (
                        <CloseIcon />
                      )}
                    </TableCell>
                    <TableCell>{chart.password}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <LaunchIcon
                          onClick={() =>
                            launch(
                              createLink(chart._id, chartType(chart.chartType))
                            )
                          }
                          sx={{ color: "#448aff" }}
                        />
                        <EditIcon
                          onClick={() => openEditModal(chart)}
                          sx={{ color: "#24b200" }}
                        />
                        <DeleteIcon
                          onClick={() => deleteDashboardChart(chart._id)}
                          sx={{ color: "#ff0000" }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
              <TableRow>
                <TableCell colSpan={7}>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "right",
                    }}
                  >
                    <SkipPreviousIcon
                      sx={{
                        color: numberOfStartChart === 1 ? "#88898a" : "#000000",
                      }}
                      onClick={previousChartSets}
                    />
                    {numberOfStartChart}-{numberOfEndChart} of {charts.length}
                    <SkipNextIcon
                      sx={{
                        color:
                          numberOfEndChart === charts.length
                            ? "#88898a"
                            : "#000000",
                      }}
                      onClick={nextChartSets}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
export default DashboardCharts;
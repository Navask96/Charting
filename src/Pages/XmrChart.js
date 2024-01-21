import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import ChartControlButtons from "../Component/Buttons/ChartControlButtons";
import ChartPropertyEditor from "../Component/ChartPropertyEditor";
import {
  createUser,
  getOne,
  updateEverything,
  userLogin,
  verifyUser,
} from "../service.global";
import Histogram from "../Component/Histogram";
import XmrChart1 from "../Component/LineCharts/XmrChart1";
import XmrChart2 from "../Component/LineCharts/XmrChart2";
import XmrChart3 from "../Component/LineCharts/XmrChart3";
import {
  checkPasswordProtection,
  validateChartPassword,
} from "../service.global";
import XmrTable from "../Component/XmrChart/XmrTable";

const XmrChart = () => {
  const { chartId } = useParams();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [chartProperties, setChartProperties] = useState({});
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allHeadings, setAllHeadings] = useState("");
  const [subgroupSize, setSubgroupSize] = useState("");
  const [excelName, setExcelName] = useState("");
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [checkingPasswordProtection, setCheckingPasswordProtection] =
    useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [apiCall, setApiCall] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getOne(chartId, "chart-data");
      setAllHeadings(response.headings);
      setChartData(response);
      setExcelName(response.name);
      setTableData(response.tableData);
      setColumnHeaders(response.columnHeaders);
      setChartProperties(response.chartProperties);
      setSubgroupSize(response.subgroupSize);
      setLoading(false);
      setApiCall(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [chartId, loading]); // Empty dependency array to run the effect only once

  const userInLocalStorage = localStorage.getItem("userData");
  let userId =
    userInLocalStorage === null ? "" : JSON.parse(userInLocalStorage).id;

  useEffect(() => {
    if (userInLocalStorage === null) {
      checkPasswordProtection(chartId).then((response) => {
        if (response === true) {
          setCheckingPasswordProtection(true);
          setOpenDialog(true);
        } else {
          setAllHeadings(response.headings);
          setChartData(response);
          setExcelName(response.name);
          setTableData(response.tableData);
          setColumnHeaders(response.columnHeaders);
          setChartProperties(response.chartProperties);
          setSubgroupSize(response.subgroupSize);
          setLoading(false);
        }
      });
    } else {
    }
  }, [chartId, navigate, userId, userInLocalStorage]);

  // Undo redo methods
  const [tableHistory, setTableHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const onChangeTable = (newTableData) => {
    if (historyIndex === -1) {
      const currentTableData = tableData.map((row) => row.slice(0, 5));
      setHistoryIndex(1);
      setTableHistory([currentTableData, newTableData]);
    } else if (tableHistory.length - 1 !== historyIndex) {
      const currentTableHistory = tableHistory.slice(0, historyIndex + 1);
      const newTableHistory = [...currentTableHistory, newTableData];
      setTableHistory(newTableHistory);
      setHistoryIndex(historyIndex + 1);
    } else {
      const updatedTableHistory = [...tableHistory, newTableData];
      if (historyIndex < 10) {
        setHistoryIndex(historyIndex + 1);
        setTableHistory(updatedTableHistory);
      } else {
        updatedTableHistory.shift();
        setTableHistory(updatedTableHistory);
      }
    }
    setTableData(newTableData);
  };
  const undoChanges = () => {
    if (historyIndex !== 0) {
      setTableData(tableHistory[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };
  const redoChanges = () => {
    if (historyIndex + 1 < tableHistory.length) {
      setTableData(tableHistory[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const onPropertyChange = (chartProperties) => {
    setChartProperties(chartProperties);
  };

  const saveDataIntoDatabase = () => {
    const data = {
      ...chartData,
      tableData: [...tableData],
      chartProperties,
    };
    setLoading(true);
    updateEverything(chartId, data, "chart-data").then((response) => {
      setLoading(false);
    });
  };

  const saveChart1Name = (chartName) => {
    const data = {
      ...chartData,
      headings: {
        ...chartData.headings,
        chart1: chartName,
      },
    };
    updateEverything(chartId, data, "chart-data").then((res) => {});
  };
  const saveChart2Name = (chartName) => {
    const data = {
      ...chartData,
      headings: {
        ...chartData.headings,
        chart2: chartName,
      },
    };
    updateEverything(chartId, data, "chart-data").then((res) => {});
  };

  //Set updated column name
  const setUpdatedColumnNames = (newColumnNames) => {
    setColumnHeaders(newColumnNames);
  };

  // Check box
  const [checkBoxLabel, setCheckBoxLabel] = useState("Admin");
  const [checkedValue, setCheckedValue] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");

  const clickCheckBox = () => {
    if (checkedValue) {
      setCheckBoxLabel("Admin");
      setCheckedValue(false);
    } else {
      setCheckBoxLabel("User");
      setCheckedValue(true);
    }
  };

  const handleSubmitPassword = () => {
    // Validate the entered password (You can implement your validation logic here)
    const validPassword = true; // Replace with your validation logic

    validateChartPassword(chartId, enteredPassword).then((response) => {
      if (response === false) {
        alert("Invalid password");
      } else {
        setCheckingPasswordProtection(false);
        setAllHeadings(response.headings);
        setChartData(response);
        setExcelName(response.name);
        setTableData(response.tableData);
        setColumnHeaders(response.columnHeaders);
        setChartProperties(response.chartProperties);
        setSubgroupSize(response.subgroupSize);
        setLoading(false);
        setOpenDialog(false);
      }
    });
    setEnteredPassword("");
  };

  // Register user
  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const getLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleRegisterUser = () => {
    const newUserData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: "User",
    };
    createUser(newUserData)
      .then((res) => {
        if (res) {
          setStep(2);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("User already exist");
        //show user already exist toast
      });
  };

  const handleVerifyCode = () => {
    verifyUser(email, verificationCode).then((res) => {
      if (res) {
        setStep(3);
      }
    });
  };

  // Login User
  const getLoginEmail = (e) => {
    setEmail(e.target.value);
  };
  const getLoginPassword = (e) => {
    setPassword(e.target.value);
  };
  const login = () => {
    const loginDetails = {
      email: email,
      password: password,
    };
    userLogin(loginDetails).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("userData", JSON.stringify(res.data.userData));
        setOpenDialog(false);
        window.location.reload();
      } /* else {
        setErrorMessage(res.data.message);
        setOpenLoginFail(true);
      } */
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {loading || checkingPasswordProtection ? (
        <PuffLoader color="#36d7b7" />
      ) : (
        <Grid container spacing={2} margin={5}>
          <Grid item md={4} sm={12} xs={12}>
            <Grid container spacing={2}>
              {JSON.parse(userInLocalStorage)?.email === "dm1217@gmail.com" && (
                <Grid item md={12} sm={12} xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={checkedValue} />}
                      label={checkBoxLabel}
                      onClick={clickCheckBox}
                    />
                  </FormGroup>
                </Grid>
              )}
              <Grid item md={12} sm={12} xs={12}>
                <ChartControlButtons
                  saveDataIntoDatabase={saveDataIntoDatabase}
                  undoChanges={undoChanges}
                  chartProperties={chartProperties}
                  redoChanges={redoChanges}
                  tableData={tableData}
                  columnHeaders={columnHeaders}
                  userRole={checkBoxLabel}
                  setUpdatedColumnNames={(columnNames) =>
                    setUpdatedColumnNames(columnNames)
                  }
                  subgroupSize={subgroupSize}
                  excelName={excelName}
                  chartId={chartId}
                  chartData={chartData}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <ChartPropertyEditor
                  onPropertyChange={onPropertyChange}
                  chartProperties={chartProperties}
                  chartId={chartId}
                  subgroupSize={parseFloat(subgroupSize)}
                  tableData={tableData}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Histogram
                  data={tableData}
                  subgroupSize={parseFloat(subgroupSize)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <XmrTable
              chartProperties={chartProperties}
              onChangeTable={onChangeTable}
              incomingData={tableData}
              chartId={chartId}
              columnHeaders={columnHeaders}
              role={checkBoxLabel}
              apiCall={apiCall}
              setApiCall={setApiCall}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <XmrChart1
                chartData={tableData}
                chartProperties={chartProperties}
                headings={allHeadings}
                saveChart1Name={(chartName) => saveChart1Name(chartName)}
              />
            </div>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <XmrChart2
                chartData={tableData}
                chartProperties={chartProperties}
                headings={allHeadings}
                saveChart2Name={(chartName) => saveChart2Name(chartName)}
              />
            </div>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <XmrChart3
                chartData={tableData}
                chartProperties={chartProperties}
              />
            </div>
          </Grid>
        </Grid>
      )}
      <Dialog open={openDialog}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Grid container spacing={2}>
                {step === 1 && (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        sx={{ textAlign: "center", color: "#0096ff" }}
                        variant="h4"
                      >
                        REGISTER
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="email"
                        variant="outlined"
                        label="Email Address"
                        onChange={(e) => getEmail(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        variant="outlined"
                        label="Password"
                        type="password"
                        onChange={(e) => getPassword(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="firstName"
                        variant="outlined"
                        label="First Name"
                        onChange={(e) => getFirstName(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="lastName"
                        variant="outlined"
                        label="Last Name"
                        onChange={(e) => getLastName(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        sx={{
                          bgcolor: "#0096ff",
                          borderRadius: 1,
                          width: "100%",
                        }}
                        variant="contained"
                        onClick={() => handleRegisterUser()}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: "#808080",
                          fontSize: "18px",
                        }}
                        variant="h2"
                      >
                        OR
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        sx={{
                          bgcolor: "#0096ff",
                          borderRadius: 1,
                          width: "100%",
                        }}
                        variant="contained"
                        onClick={() => setStep(3)}
                      >
                        Log In
                      </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: "#808080",
                          fontSize: "12px",
                        }}
                        variant="p"
                      >
                        By sign up, you agree to our communications and usage
                        terms.
                      </Typography>
                    </Grid>
                  </>
                )}
                {step === 2 && (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="p"
                        sx={{ fontSize: 15, color: "#586771" }}
                      >
                        Please check your email inbox for your Verification Code
                        and paste it here:
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="verificationCode"
                        variant="outlined"
                        label="Verification Code"
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        sx={{
                          bgcolor: "#0096ff",
                          borderRadius: 1,
                          width: "100%",
                        }}
                        variant="contained"
                        onClick={() => handleVerifyCode()}
                      >
                        Verify
                      </Button>
                    </Grid>
                  </>
                )}
                {step === 3 && (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        sx={{ textAlign: "center", color: "#0096ff" }}
                        variant="h4"
                      >
                        SIGN IN
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="email"
                        variant="outlined"
                        label="Email Address"
                        onChange={(e) => getLoginEmail(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        variant="outlined"
                        label="Password"
                        type="password"
                        onChange={(e) => getLoginPassword(e)}
                        /* onKeyDown={(key) => keyEnterLogin(key)} */
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        sx={{
                          bgcolor: "#0096ff",
                          borderRadius: 1,
                          width: "100%",
                        }}
                        variant="contained"
                        onClick={login}
                      >
                        Login
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* <Dialog open={openDialog}>
        <DialogContent>
          <DialogContentText>
            This chart is protected. Please enter password to view this chart:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <Button onClick={handleSubmitPassword}>Submit</Button>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default XmrChart;

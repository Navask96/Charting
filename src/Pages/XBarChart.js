import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

import ChartControlButtons from "../Component/Buttons/ChartControlButtons";
import ChartPropertyEditor from "../Component/ChartPropertyEditor";

import XBarChart1 from "../XbarLineChart/XBarChart1";
import XBarChart2 from "../XbarLineChart/XBarChart2";
import { PuffLoader } from "react-spinners";
import Histogram from "../Component/Histogram";

import {
  createUser,
  getOne,
  updateEverything,
  userLogin,
  verifyUser,
} from "../service.global";
import XBarChart3 from "../XbarLineChart/XBarChart3";
import {
  checkPasswordProtection,
  validateChartPassword,
} from "../service.global";
import XBarTableTemp from "../Component/XBarChart/XBarTableTemp";
import XBarTable from "../Component/XBarChart/XBarChart";

const XBarChart = () => {
  const { chartId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chartProperties, setChartProperties] = useState({});
  const [chartData, setChartData] = useState([]);
  const [allHeadings, setAllHeadings] = useState("");
  const [tableData, setTableData] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [subgroupSize, setSubgroupSize] = useState("");
  const [excelName, setExcelName] = useState("");
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

  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");

  useEffect(() => {
    if (userInLocalStorage === null) {
      checkPasswordProtection(chartId).then((response) => {
        console.log(response);
        if (response === true) {
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

  const handleSubmitPassword = () => {
    // Validate the entered password (You can implement your validation logic here)
    const validPassword = true; // Replace with your validation logic

    validateChartPassword(chartId, enteredPassword).then((response) => {
      console.log(response);
      if (response === false) {
        alert("Invalid password");
      } else {
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

  const onPropertyChange = (chartProperties) => {
    setChartProperties(chartProperties);
  };

  const saveDataIntoDatabase = () => {
    //handleSave();
    const data = {
      ...chartData,
      tableData: tableData,
      chartProperties,
    };
    setLoading(true);
    updateEverything(chartId, data, "chart-data").then((response) => {
      console.log(response);
      setLoading(false);
    });
  };

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  class DataList {
    constructor() {
      this.head = null;
    }
    append(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        return;
      }
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    remove() {
      if (!this.head) {
        return null;
      }
      const removedData = this.head.data;
      this.head = this.head.next;
      return removedData;
    }
  }

  const List = new DataList();

  const validRow = (data) => {
    let validRow = true;
    for (let subValue = 0; subValue < subgroupSize; subValue++) {
      let x = parseFloat(data[subValue + 3]);
      if (isNaN(x) || x === null) {
        validRow = false;
      }
    }
    return validRow;
  };

  const handleSave = () => {
    let updatedTableData = [];
    let splitIndex = 4 + parseInt(subgroupSize);
    for (let row = 0; row < tableData.length; row++) {
      let enteredData = tableData[row].slice(0, splitIndex);
      let calculatedData = tableData[row].slice(splitIndex);
      List.append(calculatedData);
      if (validRow(enteredData)) {
        let validCalculatedData = List.remove();
        updatedTableData.push([...enteredData, ...validCalculatedData]);
      }
    }
    const data = {
      ...chartData,
      tableData: [...updatedTableData],
      chartProperties,
    };
    setLoading(true);
    updateEverything(chartId, data, "chart-data").then((response) => {
      console.log(response);
      setLoading(false);
    });
  };

  // Undo redo methods
  const [tableHistory, setTableHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const onChangeTable = (newTableData) => {
    if (historyIndex === -1) {
      setHistoryIndex(1);
      setTableHistory([...tableHistory, tableData, newTableData]);
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
  const undoChange = () => {
    if (historyIndex !== 0) {
      setTableData(tableHistory[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };
  const redoChange = () => {
    if (historyIndex + 1 < tableHistory.length) {
      setTableData(tableHistory[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const saveChart1Name = (chart1Name) => {
    const data = {
      ...chartData,
      headings: {
        ...chartData.headings,
        chart1: chart1Name,
      },
    };
    updateEverything(chartId, data, "chart-data").then((res) => {
      console.log(res);
    });
  };

  const saveChart2Name = (chart2Name) => {
    const data = {
      ...chartData,
      headings: {
        ...chartData.headings,
        chart2: chart2Name,
      },
    };
    updateEverything(chartId, data, "chart-data").then((res) => {
      console.log(res);
    });
  };

  //Set updated column name
  const setUpdatedColumnNames = (newColumnNames) => {
    setColumnHeaders(newColumnNames);
  };

  // Check box
  const [checkBoxLabel, setCheckBoxLabel] = useState("Admin");
  const [checkedValue, setCheckedValue] = useState(false);
  const clickCheckBox = () => {
    if (checkedValue) {
      setCheckBoxLabel("Admin");
      setCheckedValue(false);
    } else {
      setCheckBoxLabel("User");
      setCheckedValue(true);
    }
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
      {loading || openDialog ? (
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
                  chartData={chartData}
                  chartId={chartId}
                  saveDataIntoDatabase={saveDataIntoDatabase}
                  tableData={tableData}
                  columnHeaders={columnHeaders}
                  setUpdatedColumnNames={(columnNames) =>
                    setUpdatedColumnNames(columnNames)
                  }
                  excelName={excelName}
                  userRole={checkBoxLabel}
                  chartProperties={chartProperties}
                  subgroupSize={parseFloat(subgroupSize)}
                  undoChanges={undoChange}
                  redoChanges={redoChange}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <ChartPropertyEditor
                  chartId={chartId}
                  onPropertyChange={onPropertyChange}
                  chartProperties={chartProperties}
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
            <XBarTable
              chartProperties={chartProperties}
              onChangeTable={onChangeTable}
              incomingData={tableData}
              columnHeaders={columnHeaders}
              subgroupSize={parseFloat(subgroupSize)}
              role={checkBoxLabel}
              apiCall={apiCall}
              setApiCall={setApiCall}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <XBarChart1
              chartId={chartId}
              tableData={tableData}
              chartProperties={chartProperties}
              headings={allHeadings}
              subgroupSize={parseFloat(subgroupSize)}
              saveChart1Name={(chart1Name) => saveChart1Name(chart1Name)}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <XBarChart2
              chartId={chartId}
              tableData={tableData}
              chartProperties={chartProperties}
              headings={allHeadings}
              subgroupSize={parseFloat(subgroupSize)}
              saveChart2Name={(chart2Name) => saveChart2Name(chart2Name)}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <XBarChart3
              chartData={tableData}
              chartProperties={chartProperties}
              subgroupSize={parseFloat(subgroupSize)}
            />
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

      {/* 
      <Dialog open={openDialog}>
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

export default XBarChart;

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { updateEverything } from "../../service.global";

const AccountDetails = (props) => {
  const { userData } = props;
  const userId = userData.id;

  const [isEdit, setIsEdit] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");

  // Updated SnackBar
  const [openUpdateSuccessSnackBar, setOpenUpdateSuccessSnackBar] =
    useState(false);

  const closeUpdateSuccessSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUpdateSuccessSnackBar(false);
  };

  useEffect(() => {
    setEmail(userData.email);
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setCompany(userData.companyName);
  }, [userData]);

  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const getLastName = (e) => {
    setLastName(e.target.value);
  };
  const getCompany = (e) => {
    setCompany(e.target.value);
  };

  const saveChanges = () => {
    const editedData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      company: company,
    };
    console.log(editedData);
    updateEverything(userId, editedData, "users").then((res) => {
      setOpenUpdateSuccessSnackBar(true);
      console.log(res);
    });
  };

  //Reset details
  const resetDetails = () => {
    setEmail(userData.email);
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setCompany(userData.companyName);
  };

  return (
    <div style={{ margin: 50 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          alignItems="center"
          sx={{
            display: "flex",
            backgroundColor: "#dedede",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 2,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={11}>
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <Typography variant="h5">Update Account Details</Typography>
                </Grid>
                {isEdit && (
                  <>
                    <Grid item xs={1}>
                      <Button
                        onClick={resetDetails}
                        sx={{
                          textAlign: "center",
                          borderRadius: 1,
                          fontSize: "15px",
                          fontWeight: "bold",
                          width: "100%",
                          "&:hover": {
                            backgroundColor: "#98aab3",
                          },
                        }}
                      >
                        RESET
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        onClick={() => saveChanges()}
                        sx={{
                          textAlign: "center",
                          borderRadius: 1,
                          fontSize: "15px",
                          fontWeight: "bold",
                          width: "100%",
                          "&:hover": {
                            backgroundColor: "#98aab3",
                          },
                        }}
                      >
                        SAVE CHANGES
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <FormControlLabel
                sx={{
                  display: "block",
                }}
                control={
                  <Switch
                    checked={isEdit}
                    onChange={() => setIsEdit(!isEdit)}
                    name="Edit"
                    color="primary"
                  />
                }
                label="Edit"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          textAlign="center"
          sx={{
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
          }}
        >
          <TextField
            onChange={(e) => getEmail(e)}
            onFocus={() => setEmail("")}
            disabled={!isEdit}
            sx={{ width: "20%" }}
            id="user-email"
            variant="standard"
            label="E-mail"
            value={email}
          />
        </Grid>
        <Grid
          item
          xs={12}
          textAlign="center"
          sx={{
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
          }}
        >
          <TextField
            onChange={(e) => getFirstName(e)}
            onFocus={() => setFirstName("")}
            sx={{ width: "20%" }}
            disabled={!isEdit}
            id="firstName"
            variant="standard"
            label="First Name"
            value={firstName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          textAlign="center"
          sx={{
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
          }}
        >
          <TextField
            onChange={(e) => getLastName(e)}
            onFocus={() => setLastName("")}
            sx={{ width: "20%" }}
            disabled={!isEdit}
            id="lastName"
            variant="standard"
            label="Last Name"
            value={lastName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          textAlign="center"
          sx={{
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
            borderBottom: "1px solid #dedede",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingBottom: 5,
          }}
        >
          <TextField
            onChange={(e) => getCompany(e)}
            onFocus={() => setCompany("")}
            disabled={!isEdit}
            sx={{ width: "20%" }}
            id="company"
            variant="standard"
            label="Company"
            value={company}
          />
        </Grid>
        <Snackbar
          open={openUpdateSuccessSnackBar}
          autoHideDuration={6000}
          onClose={closeUpdateSuccessSnackBar}
        >
          <Alert
            onClose={closeUpdateSuccessSnackBar}
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
            Successfully Updated
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
};

export default AccountDetails;

import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ChangePassword = (props) => {
  const { userData } = props;

  const userId = userData.id;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordOk, setPasswordOk] = useState(true);
  const [visibleOldPassword, setVisibleOldPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  // Update password snack bar
  const [openPasswordChangeSnackBar, setOpenPasswordChangeSnackBar] =
    useState(false);

  const closePasswordChangeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPasswordChangeSnackBar(false);
  };

  const getOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const getNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const getConfirmPassword = (e) => {
    if (newPassword === e.target.value) {
      setPasswordOk(true);
    } else {
      setPasswordOk(false);
    }
    setConfirmPassword(e.target.value);
  };
  const saveChangePassword = () => {
    const passwordChangeData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    if (setPasswordOk) {
      setOpenPasswordChangeSnackBar(true);
      //dispatch(changeUserAccountPassword(userId, passwordChangeData));
    }
  };

  const clear = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={{ margin: 50 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#dedede",
            padding: 2,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Typography variant="h5">Change Password</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
          }}
        >
          <TextField
            sx={{ width: "20%" }}
            id="oldPassword"
            variant="standard"
            label="Old Password"
            value={oldPassword}
            onChange={(e) => getOldPassword(e)}
            type={visibleOldPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {visibleOldPassword ? (
                    <VisibilityOffIcon
                      onClick={() => setVisibleOldPassword(false)}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => setVisibleOldPassword(true)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
          }}
        >
          <TextField
            sx={{ width: "20%" }}
            id="newPassword"
            variant="standard"
            label="New Password"
            value={newPassword}
            onChange={(e) => getNewPassword(e)}
            type={visibleNewPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {visibleNewPassword ? (
                    <VisibilityOffIcon
                      onClick={() => setVisibleNewPassword(false)}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => setVisibleNewPassword(true)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
          }}
        >
          <TextField
            error={!passwordOk}
            helperText={
              !passwordOk ? "The confirm password does not match" : ""
            }
            sx={{ width: "20%" }}
            id="confirmPassword"
            variant="standard"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => getConfirmPassword(e)}
            type={visibleConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {visibleConfirmPassword ? (
                    <VisibilityOffIcon
                      onClick={() => setVisibleConfirmPassword(false)}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => setVisibleConfirmPassword(true)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            borderLeft: "1px solid #dedede",
            borderRight: "1px solid #dedede",
            borderBottom: "1px solid #dedede",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingBottom: 5,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button
                onClick={() => clear()}
                sx={{
                  textAlign: "center",
                  borderRadius: 1,
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#b5c1d3",
                  width: "180px",
                }}
              >
                CLEAR
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "left" }}>
              <Button
                onClick={() => saveChangePassword()}
                sx={{
                  textAlign: "center",
                  borderRadius: 1,
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#b5c1d3",
                  width: "180px",
                }}
              >
                CHANGE PASSWORD
              </Button>
              <Snackbar
                open={openPasswordChangeSnackBar}
                autoHideDuration={6000}
                onClose={closePasswordChangeSnackBar}
              >
                <Alert
                  onClose={closePasswordChangeSnackBar}
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
                  Successfully Change Password
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePassword;

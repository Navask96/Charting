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

const DeleteUserAccount = (props) => {
  const { userData } = props;
  const userId = userData.id;

  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  // Delete user snack bar
  const [openDeleteUserSnackBar, setOpenDeleteUserSnackBar] = useState(false);

  const handleCloseDeleteUserMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteUserSnackBar(false);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const deleteAccount = () => {
    setOpenDeleteUserSnackBar(true);
    //dispatch(deleteUserAccount(userId, password));
  };

  const clear = () => {
    setPassword("");
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
          <Typography variant="h5">Delete Your Account</Typography>
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
            id="password"
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => getPassword(e)}
            type={visiblePassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {visiblePassword ? (
                    <VisibilityOffIcon
                      onClick={() => setVisiblePassword(false)}
                    />
                  ) : (
                    <VisibilityIcon onClick={() => setVisiblePassword(true)} />
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
                onClick={() => deleteAccount()}
                sx={{
                  textAlign: "center",
                  borderRadius: 1,
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#b5c1d3",
                  width: "180px",
                }}
              >
                DELETE ACCOUNT
              </Button>
            </Grid>
            <Snackbar
              open={openDeleteUserSnackBar}
              autoHideDuration={6000}
              onClose={handleCloseDeleteUserMessage}
            >
              <Alert
                onClose={handleCloseDeleteUserMessage}
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
                Successfully Deleted Account
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeleteUserAccount;

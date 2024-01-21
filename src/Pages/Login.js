import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Divider,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../service.global";
import ForgotPasswordForm from "../Component/Login/ForgotPassword";
import GuestUserNavigationLayout from "../Component/Layout/GuestUserNevigationLayout";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const userInLocalStorage = localStorage.getItem("userData");

  useEffect(() => {
    if (userInLocalStorage !== null) {
      navigate("/dashboard");
    } /* else if (userInLocalStorage === null && state.needVerify) {
      navigate("/register");
    } */
  }, [navigate, userInLocalStorage]);

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getPassword = (e) => {
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
        navigate("/dashboard");
      } else {
        setErrorMessage(res.data.message);
        setOpenLoginFail(true);
      }
    });
  };

  const [openLoginFail, setOpenLoginFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseLoginFail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenLoginFail(false);
  };

  const [opeNewPasswordSubmitSnackBar, setNewPasswordSubmitSnackBar] =
    useState(false);

  const handleCloseNewPasswordSubmitSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNewPasswordSubmitSnackBar(false);
  };
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");

  const newPasswordSnackBar = (msg) => {
    setNewPasswordSubmitSnackBar(true);
    setPasswordChangeMessage(msg);
  };

  const keyEnterLogin = (key) => {
    if (key.code === "Enter") {
      login();
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Grid item xs={12}>
          <GuestUserNavigationLayout />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                maxWidth: 400, // Set maximum width here
                mx: "auto", // Center the paper horizontally
              }}
            >
              <Grid container spacing={2}>
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
                    onKeyDown={(key) => keyEnterLogin(key)}
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
                  <Snackbar
                    open={openLoginFail}
                    autoHideDuration={6000}
                    onClose={handleCloseLoginFail}
                  >
                    <Alert
                      onClose={handleCloseLoginFail}
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
                      {errorMessage}
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={opeNewPasswordSubmitSnackBar}
                    autoHideDuration={6000}
                    onClose={handleCloseNewPasswordSubmitSnackBar}
                  >
                    <Alert
                      onClose={handleCloseNewPasswordSubmitSnackBar}
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
                      {passwordChangeMessage}
                    </Alert>
                  </Snackbar>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={5}>
                      <Divider />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>OR</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    sx={{
                      bgcolor: "#0096ff",
                      borderRadius: 1,
                      width: "100%",
                    }}
                    variant="contained"
                    onClick={() => navigate("/register")}
                  >
                    Register Now
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
                    By logging in, you agree to our communications and usage
                    terms.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="text"
                    sx={{ color: "#1976d2", textDecoration: "underline" }}
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                  >
                    Forgot Password?
                  </Button>
                </Grid>
                {showForgotPassword && (
                  <Grid item xs={12}>
                    <ForgotPasswordForm
                      forgotPasswordOpen={setShowForgotPassword}
                      newPasswordSnackBar={(msg) => newPasswordSnackBar(msg)}
                    />
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;

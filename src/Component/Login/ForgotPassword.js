import React, { useState } from "react";
import {
  sendCodeByEmail,
  verifyUser,
  resetPassword,
} from "../../service.global";
import { Alert, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";

const ForgotPasswordForm = (props) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationCodeErrorMsg, setVerificationCodeErrorMsg] = useState("");

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Send the email to the server to generate and send the code
    // Assuming a function sendCodeByEmail exists
    sendCodeByEmail(email).then((res) => {
      console.log(res);
    });
    setStep(2); // Move to the next step
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    // Validate the entered code with the server
    // Assuming a function validateCode exists
    verifyUser(email, code).then((res) => {
      if (res.status === 200) {
        setStep(3);
      } else {
        setCodeSubmitSnackBar(true);
        setVerificationCodeErrorMsg(res.response.data.message);
      }
    });
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    // Send the new password and code to the server to reset the password
    // Assuming a function resetPassword exists
    resetPassword(email, code, newPassword).then((res) => {
      console.log(res.message);
      props.forgotPasswordOpen(false);
      props.newPasswordSnackBar(res.message);
    });
    // Optionally, redirect the user to the login page
  };

  const handleCloseCodeSubmitSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCodeSubmitSnackBar(false);
  };

  const [openCodeSubmitSnackBar, setCodeSubmitSnackBar] = useState(false);

  return (
    <Grid container>
      {step === 1 && (
        <>
          <Grid item xs={12}>
            <TextField
              sx={{ paddingBottom: 2 }}
              fullWidth
              id="email"
              variant="outlined"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={handleSubmitEmail}
            >
              Submit
            </Button>
          </Grid>
        </>
      )}
      {step === 2 && (
        <>
          <Grid item xs={12}>
            <Typography variant="p" sx={{ fontSize: 15 }}>
              Please check your email inbox for your Verification Code and paste
              it here:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ paddingBottom: 2 }}
              fullWidth
              id="code"
              variant="outlined"
              label="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
              onClick={handleSubmitCode}
            >
              Submit
            </Button>
          </Grid>
        </>
      )}
      {step === 3 && (
        <>
          <Grid item xs={12}>
            <TextField
              sx={{ paddingBottom: 2 }}
              fullWidth
              id="newPassword"
              variant="outlined"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              onClick={handleSubmitNewPassword}
            >
              Submit
            </Button>
          </Grid>
        </>
      )}
      <Snackbar
        open={openCodeSubmitSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseCodeSubmitSnackBar}
      >
        <Alert
          onClose={handleCloseCodeSubmitSnackBar}
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
          {verificationCodeErrorMsg}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ForgotPasswordForm;

import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, verifyUser } from "../service.global";
import GuestUserNavigationLayout from "../Component/Layout/GuestUserNevigationLayout";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");

  const userInLocalStorage = localStorage.getItem("userData");

  useEffect(() => {
    if (userInLocalStorage !== null) {
      navigate("/dashboard");
    }
  }, [navigate, userInLocalStorage]);

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
        navigate("/login");
      }
    });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <GuestUserNavigationLayout />
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
                maxWidth: 400,
                mx: "auto",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    sx={{ textAlign: "center", color: "#0096ff" }}
                    variant="h4"
                  >
                    REGISTER
                  </Typography>
                </Grid>
                {step === 1 && (
                  <>
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
                    {/* <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="company"
                      variant="outlined"
                      label="Company"
                      onChange={(e) => getCompanyName(e)}
                    />
                  </Grid> */}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterUser;

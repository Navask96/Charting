import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import Groups2Icon from "@mui/icons-material/Groups2";
//import LogoLight from "../../Images/logo-light.png";
import logo from "../../Images/HeaderLogo.png";
import logoIcon from "../../Images/HeaderLogoIcon.png";
import NavigationChartSearch from "../NavigationChartSearch";

function MainNavigation() {
  const location = useLocation();
  const isXmr = location.pathname.startsWith("/i");
  const isXBar = location.pathname.startsWith("/s");

  const navigate = useNavigate();
  const userData = localStorage.getItem("userData");
  // console.log("userData", JSON.parse(userData).userData.lastName)
  let userName =
    userData !== null
      ? JSON.parse(userData)?.firstName + " " + JSON.parse(userData)?.lastName
      : "Guest User";
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenu, setShowMenu] = useState(JSON.parse(userData)?.firstName);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = () => {
    handleMenuClose();
    navigate("/dashboard");
  };

  const handleAccountClick = () => {
    handleMenuClose();
    navigate("/account");
  };

  const handleUsersClick = () => {
    handleMenuClose();
    navigate("/users");
  };

  const handleOrganizationClick = () => {
    handleMenuClose();
    navigate("/organization");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("");
    return initials.toUpperCase();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", paddingLeft: 10, paddingRight: 10 }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            {isXmr || isXBar ? (
              <Grid container sx={{ alignItems: "center", display: "flex" }}>
                <Grid item>
                  <img
                    src={logoIcon}
                    alt="Spc Chart Logo"
                    width={65.4}
                    height={44.5}
                    onClick={() => navigate("/dashboard")}
                  />
                </Grid>
                <Grid item>
                  <NavigationChartSearch />
                </Grid>
              </Grid>
            ) : (
              <Grid container textAlign="center">
                <Grid item>
                  <img
                    src={logo}
                    alt="Spc Chart Logo"
                    height={44.5}
                    width={250}
                    onClick={() => navigate("/dashboard")}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container alignItems="center">
              <Grid
                item
                md={11}
                sx={{
                  textAlign: { md: "right", xs: "left" },
                  paddingRight: "5px",
                }}
              >
                <Typography variant="body1" color={"#000000"}>
                  {userName}
                </Typography>
              </Grid>
              <Grid
                item
                md={1}
                sx={{
                  textAlign: { md: "right", xs: "left" },
                }}
              >
                <Avatar onClick={handleMenuOpen}>
                  {getInitials(userName)}
                </Avatar>
                {showMenu && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleDashboardClick}>
                      <Grid container spacing={3}>
                        <Grid item xs={4} alignItems="center">
                          <DashboardIcon
                            sx={{ fontSize: 20, color: "#1976d2" }}
                          />
                        </Grid>
                        <Grid item xs={8} alignItems="center">
                          <Typography color="#1976d2">My Charts</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    <MenuItem onClick={handleAccountClick}>
                      <Grid container spacing={3}>
                        <Grid item xs={4} alignItems="center">
                          <SettingsIcon
                            sx={{ fontSize: 20, color: "#1976d2" }}
                          />
                        </Grid>
                        <Grid item xs={8} alignItems="center">
                          <Typography color="#1976d2">Account</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    {JSON.parse(userData).email === "dm1217@gmail.com" && (
                      <MenuItem onClick={handleUsersClick}>
                        <Grid container spacing={3}>
                          <Grid item xs={4} alignItems="center">
                            <PeopleIcon
                              sx={{ fontSize: 20, color: "#1976d2" }}
                            />
                          </Grid>
                          <Grid item xs={8} alignItems="center">
                            <Typography color="#1976d2">Users</Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    )}
                    {JSON.parse(userData).email === "dm1217@gmail.com" && (
                      <MenuItem onClick={handleOrganizationClick}>
                        <Grid container spacing={3}>
                          <Grid item xs={4} alignItems="center">
                            <Groups2Icon
                              sx={{ fontSize: 20, color: "#1976d2" }}
                            />
                          </Grid>
                          <Grid item xs={8} alignItems="center">
                            <Typography color="#1976d2">
                              Organization
                            </Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    )}
                    <MenuItem onClick={logout}>
                      <Grid container spacing={3}>
                        <Grid item xs={4} alignItems="center">
                          <LogoutIcon sx={{ fontSize: 20, color: "#1976d2" }} />
                        </Grid>
                        <Grid item xs={8} alignItems="center">
                          <Typography color="#1976d2">Logout</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                  </Menu>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;

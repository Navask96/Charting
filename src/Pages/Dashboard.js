import { Grid, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCharts from "../Component/Dashboard/DashboardCharts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  const userInLocalStorage = localStorage.getItem("userData");
  let userId =
    userInLocalStorage === null ? "" : JSON.parse(userInLocalStorage).id;

  useEffect(() => {
    if (userInLocalStorage === null) {
      navigate("/login");
    }
  }, [navigate, userId, userInLocalStorage]);

  return (
    <Grid container spacing={2} marginTop="10px">
      {/* <Grid item xs={6} textAlign="right">
        <DashboardIcon sx={{ fontSize: 30, color: "#ababab" }} />
      </Grid>
      
      <Grid item xs={6} textAlign="left">
        <Typography variant="h5" sx={{ color: "#ababab" }}>
          Dashboard
        </Typography>
      </Grid> */}

      <Grid item xs={12}>
        {userInLocalStorage !== null ? <DashboardCharts /> : ""}
      </Grid>
    </Grid>
  );
};
export default Dashboard;

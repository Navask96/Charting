import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import computerDisplay from "../Images/Computer_Display.png";
import controlCharts from "../Images/Control_Charts.png";
import runCharts from "../Images/Run_Charts.png";
import histogram from "../Images/Histograms.png";
import secureAccess from "../Images/Secure_Access.png";
import chartNotations from "../Images/Chart_Notations.png";
import capabilityPlots from "../Images/Capability_Plots.png";
import linkSharing from "../Images/Link _Sharing.png";
import exportData from "../Images/Export_Data.png";
import knowledgeBase from "../Images/Knowledge_Base.png";
import GuestUserNavigationLayout from "../Component/Layout/GuestUserNevigationLayout";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      <Grid item xs={12}>
        <GuestUserNavigationLayout />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          bgcolor: "#F4F4F4",
          paddingRight: { md: 5 },
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6} textAlign="left" paddingBottom={15}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginLeft: { md: 10, sm: 3, xs: 3 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: "30px", // Font size for extra-small screens
                      sm: "40px", // Font size for small screens
                      md: "60px", // Font size for medium screens
                    },
                  }}
                >
                  Capture insights from your process data
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginLeft: { md: 10, sm: 3, xs: 3 } }}>
                <Typography
                  variant="body1" // Use the appropriate variant for your text
                  sx={{
                    color: "#616363",
                    fontSize: {
                      xs: "20px", // Font size for extra-small screens
                      sm: "25px", // Font size for small screens
                      md: "30px", // Font size for medium screens
                    },
                  }}
                >
                  Conveniently build and share Control Charts on a free
                  web-based app. Nothing to install.
                </Typography>
              </Grid>
              {/* <Grid
                item
                xs={12}
                paddingBottom={2}
                sx={{ marginLeft: { md: 10, sm: 3, xs: 3 } }}
              >
                <Button
                  onClick={() => navigate("/register")}
                  variant="contained"
                  size="large"
                  endIcon={<KeyboardDoubleArrowRightIcon />}
                >
                  Sign up for free access
                </Button>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <img
              src={computerDisplay}
              style={{
                maxWidth: "100%",
              }}
              alt="Spc Chart Computer Display"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ marginLeft: { md: "24%" }, marginRight: { md: "24%" } }}
      >
        <Grid container>
          {featuresContent.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "16px", // Add margin for space around the card
                }}
              >
                <CardActionArea>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "200px", // Set the height you want
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={feature.image}
                      alt="Feature Image"
                    />
                  </div>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;

export const featuresContent = [
  {
    image: controlCharts,
    title: "Control Charts",
    content: "Build charts for 'individuals' and sub grouped data",
  },
  {
    image: runCharts,
    title: "Run Charts",
    content: "View simple time-series trending without control limits",
  },
  {
    image: histogram,
    title: "Histograms",
    content: "Analyze the distribution of your process data",
  },
  {
    image: secureAccess,
    title: "Secure Access",
    content: "Set up password-protected access to charts on a secure network",
  },
  {
    image: chartNotations,
    title: "Chart Notations",
    content:
      "Enter notes viewable on charts when points are hovered or clicked",
  },
  {
    image: capabilityPlots,
    title: "Capability Plots",
    content: "Time-series plots of capability and performance indices",
  },
  {
    image: linkSharing,
    title: "Link Sharing",
    content: "Enhance collaboration by sharing viewing access to charts",
  },
  {
    image: exportData,
    title: "Export Data",
    content:
      "Save data for archiving or transferring to other statistics applications",
  },
  {
    image: knowledgeBase,
    title: "Knowledge Base",
    content:
      "Learn fundamentals of SPC through simple concepts and visualizations",
  },
];

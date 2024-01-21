import { Button, Grid, Menu, MenuItem } from "@mui/material";
import logo from "../../Images/HeaderLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GuestUserNavigationLayout = () => {
  const [resourcesMenuAnchor, setResourcesMenuAnchor] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";

  const handleResourcesMenuClick = (event) => {
    setResourcesMenuAnchor(event.currentTarget);
  };

  const handleResourcesMenuClose = () => {
    setResourcesMenuAnchor(null);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      paddingLeft={15}
      paddingRight={15}
    >
      <Grid item xs={12} md={5} onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="Spc Chart Logo"
          height={44.5}
          width={250}
          style={{ cursor: "pointer" }}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Grid container spacing={2} justifyContent={{ md: "right" }}>
          <Grid item>
            <Button
              onClick={handleResourcesMenuClick}
              sx={{
                color: "#1976d2", // Text color
                textDecoration: "none",
              }}
              endIcon={<ExpandMoreIcon />}
            >
              Resources
            </Button>
            <Menu
              anchorEl={resourcesMenuAnchor}
              open={Boolean(resourcesMenuAnchor)}
              onClose={handleResourcesMenuClose}
            >
              <MenuItem
                onClick={() => {
                  window.open(
                    "https://knowledgebase.spccharts.com/contact-us/"
                  );
                  handleResourcesMenuClose();
                }}
              >
                Contact Us
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open("https://knowledgebase.spccharts.com/");
                  handleResourcesMenuClose();
                }}
              >
                Knowledge Base
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item>
            {!isLoginPage && (
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "#1976d2", // Text color
                  textDecoration: "none",
                }}
              >
                Log In
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button
              sx={{
                color: "#ffffff", // Text color
                backgroundColor: "#00A3E8", // Background color
                "&:hover": {
                  backgroundColor: "#007bb5", // Change the background color on hover if needed
                },
              }}
              onClick={() => navigate("/register")}
              variant="contained"
              size="large"
              endIcon={<KeyboardDoubleArrowRightIcon />}
            >
              Sign up for free access
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GuestUserNavigationLayout;

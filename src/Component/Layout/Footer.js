import { Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ padding: 5 }}>
        <Typography variant="p" sx={{ fontSize: "15px", color: "#616363" }}>
          Copyright © 2023 SPCcharts. Process Capability LLC. All Rights
          Reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;

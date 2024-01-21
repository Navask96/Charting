import { Checkbox, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";

const theme = createTheme({
  typography: {
    fontSize: 10, // Adjust the default font size
  },
  components: {
    // Customize the component sizes
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 12, // Adjust the button font size
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 12, // Adjust the text field font size
          height: 30, // Adjust the text field height
          size: "small", // Adjust the text field height
          boxSizing: "inherit", // Adjust the text field height
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // height: 40, // Adjust the text field height

          paddingTop: "0px",
          paddingLeft: "40%",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          fontSize: 12, // Adjust the text field font size
          height: 14, // Adjust the text field height
          size: "small", // Adjust the text field height
        },
      },
    },
  },
});
// Add other components here with their desired customizations

const ChartPropertyEditor = (props) => {
  const { chartProperties, onPropertyChange, subgroupSize, tableData } = props;
  const [properties, setProperties] = useState(chartProperties);

  useEffect(() => {
    onPropertyChange(properties);
  }, [properties]);

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ padding: 10, margin: 10, marginTop: 20 }}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Upper Spec Limit (optional)</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                value={properties?.upperSpecLimitValue}
                variant="standard"
                onChange={(e) => {
                  setProperties({
                    ...properties,
                    upperSpecLimitValue: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Lower Spec Limit (optional)</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                variant="standard"
                value={properties?.lowerSpecLimitValue}
                onChange={(e) => {
                  setProperties({
                    ...properties,
                    lowerSpecLimitValue: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Target Value (optional)</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                variant="standard"
                value={properties?.targetValue}
                onChange={(e) => {
                  setProperties({ ...properties, targetValue: e.target.value });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        {/* <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "8px" }}>
                Baseline values (optional)
              </Typography>
              <HelpIcon
                sx={{ color: "#00A3E8", cursor: "pointer" }}
                onClick={() =>
                  window.open("https://knowledgebase.spccharts.com/")
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                variant="standard"
                //value="0"
                onChange={(e) => {
                  setProperties({ ...properties, lockLimit: e.target.value });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid> */}
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>
                {subgroupSize === 1 ? "Data Count" : "Subgroup Size"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {subgroupSize === 1 ? tableData.length-50 : subgroupSize}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Display Control Limits</Typography>
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                checked={chartProperties?.displayControlLimits}
                onClick={(e) => {
                  setProperties({
                    ...properties,
                    displayControlLimits: e.target.checked,
                  });
                }}
                sx={{
                  color: "#448aff",
                  "&.Mui-checked": {
                    color: "#448aff",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Display Center Lines</Typography>
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                checked={chartProperties?.displayCenterLines}
                onClick={(e) => {
                  setProperties({
                    ...properties,
                    displayCenterLines: e.target.checked,
                  });
                }}
                sx={{
                  color: "#448aff",
                  "&.Mui-checked": {
                    color: "#448aff",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Display Cpk</Typography>
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                checked={chartProperties?.displayCpk}
                onClick={(e) => {
                  setProperties({
                    ...properties,
                    displayCpk: e.target.checked,
                  });
                }}
                sx={{
                  color: "#448aff",
                  "&.Mui-checked": {
                    color: "#448aff",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Display Cp</Typography>
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                checked={chartProperties?.displayCp}
                onClick={(e) => {
                  setProperties({ ...properties, displayCp: e.target.checked });
                }}
                sx={{
                  color: "#448aff",
                  "&.Mui-checked": {
                    color: "#448aff",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Display Ppk</Typography>
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                checked={chartProperties?.displayPpk}
                onClick={(e) => {
                  setProperties({
                    ...properties,
                    displayPpk: e.target.checked,
                  });
                }}
                sx={{
                  color: "#448aff",
                  "&.Mui-checked": {
                    color: "#448aff",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Display Pp</Typography>
            </Grid>
            <Grid item xs={6}>
              <Checkbox
                checked={chartProperties?.displayPp}
                onClick={(e) => {
                  setProperties({ ...properties, displayPp: e.target.checked });
                }}
                sx={{
                  color: "#448aff",
                  "&.Mui-checked": {
                    color: "#448aff",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default ChartPropertyEditor;

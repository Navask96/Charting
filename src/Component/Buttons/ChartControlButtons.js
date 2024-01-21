import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";
import * as FileSaver from "file-saver";
import ExcelJS from "exceljs";
import { updateEverything } from "../../service.global";
import {
  calculateAndCreateTableData,
  createDisplayHeaders,
} from "../XmrChart/xmrTableHelpFunctions";
import {
  calculateAndCreateXBarTableData,
  createXBarDisplayHeaders,
} from "../XBarChart/xBarTableHelpFunction";

const ChartControlButtons = (props) => {
  const {
    saveDataIntoDatabase,
    undoChanges,
    redoChanges,
    tableData,
    columnHeaders,
    excelName,
    chartData,
    chartId,
    userRole,
    subgroupSize,
    setUpdatedColumnNames,
    chartProperties,
  } = props;
  const [isEditColumn, setIsEditColumn] = useState(false);
  const [excelColumnHeaders, setExcelColumnHeaders] = useState(columnHeaders);

  useEffect(() => {
    if (subgroupSize < 2) {
      const displayHeaders = createDisplayHeaders(
        columnHeaders,
        parseFloat(chartProperties.lowerSpecLimitValue),
        parseFloat(chartProperties.upperSpecLimitValue),
        userRole
      );
      setExcelColumnHeaders(displayHeaders);
    } else {
      const displayHeaders = createXBarDisplayHeaders(
        columnHeaders,
        subgroupSize,
        parseFloat(chartProperties.lowerSpecLimitValue),
        parseFloat(chartProperties.upperSpecLimitValue),
        userRole
      );
      setExcelColumnHeaders(displayHeaders);
    }
  }, [columnHeaders, userRole, chartProperties]);

  const fileName = excelName;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    let lockLimit = 0;
    tableData.forEach((row, index) => {
      if (row[0]) {
        lockLimit = index;
      }
    });
    let calculatedData = [];
    if (subgroupSize < 2) {
      const userEnteredData = tableData.map((row) => row.slice(0, 5));
      calculatedData = calculateAndCreateTableData(
        lockLimit,
        parseFloat(chartProperties.lowerSpecLimitValue),
        parseFloat(chartProperties.upperSpecLimitValue),
        userEnteredData
      );
    } else {
      const userEnteredData = tableData.map((row) =>
        row.slice(0, 4 + subgroupSize)
      );
      calculatedData = calculateAndCreateXBarTableData(
        userEnteredData,
        subgroupSize,
        lockLimit,
        parseFloat(chartProperties.lowerSpecLimitValue),
        parseFloat(chartProperties.upperSpecLimitValue)
      );
    }

    let excelTableData = calculatedData.map((row) => {
      let rowData = [];
      excelColumnHeaders
        .slice(1)
        .map((header) => rowData.push(row[columnHeaders.indexOf(header)]));
      return rowData;
    });

    const excelColumn = excelColumnHeaders.slice(1).map((columnHeader) => ({
      header: columnHeader,
      key: columnHeader.toLowerCase().replace(" ", "_"),
      width: 20,
    }));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.columns = excelColumn;

    excelTableData.forEach((data) => {
      let dataToAdd = data.slice(0, excelColumnHeaders.length);
      worksheet.addRow(dataToAdd);
    });

    const excelBuffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const changeColumnName = (e, index) => {
    const updatedHeaders = [...excelColumnHeaders];
    updatedHeaders[index] = e.target.value;
    setExcelColumnHeaders(updatedHeaders);
  };
  const clearHeaders = (index) => {
    const updatedHeaders = [...excelColumnHeaders];
    updatedHeaders[index] = "";
    setExcelColumnHeaders(updatedHeaders);
  };
  const saveColumnNames = () => {
    const allColumnHeaders =
      userRole !== "Admin"
        ? excelColumnHeaders
        : [
            ...excelColumnHeaders,
            ...chartData.columnHeaders.slice(excelColumnHeaders.length),
          ];
    const data = {
      ...chartData,
      columnHeaders: allColumnHeaders,
    };
    updateEverything(chartId, data, "chart-data").then((response) => {
      if (response !== undefined) {
        setUpdatedColumnNames(excelColumnHeaders);
      }
      console.log(response);
    });
    setIsEditColumn(false);
  };
  const editColumnNames = () => {
    setIsEditColumn(true);
  };
  const closeEditColumn = () => {
    setIsEditColumn(false);
  };

  return (
    <Grid container spacing={2}>
      <Dialog open={isEditColumn} onClose={closeEditColumn}>
        <DialogTitle>Edit Column Name</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {excelColumnHeaders.map((columnHeader, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  id={`column${index}`}
                  label={`Column ${index + 1}`}
                  variant="standard"
                  value={columnHeader}
                  onClick={() => clearHeaders(index)}
                  onChange={(e) => changeColumnName(e, index)}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                sx={{
                  textAlign: "center",
                  bgcolor: "#fc0000",
                  borderRadius: 1,
                  margin: 1,
                }}
                variant="contained"
                onClick={saveColumnNames}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item xs={6}>
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#448aff",
            borderRadius: 1,
            fontSize: "8px",
            fontWeight: "bold",
            margin: 1,
            width: "100%",
          }}
          startIcon={<DownloadIcon />}
          variant="contained"
          onClick={exportToExcel}
        >
          EXPORT DATA
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#448aff",
            fontSize: "8px",
            fontWeight: "bold",
            borderRadius: 1,
            margin: 1,
            width: "100%",
          }}
          startIcon={<EditIcon />}
          variant="contained"
          onClick={editColumnNames}
        >
          Column Title
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          paddingTop: 0,
        }}
      >
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#448aff",
            fontSize: "8px",
            fontWeight: "bold",
            borderRadius: 1,
            margin: 1,
            width: "100%",
          }}
          startIcon={<UndoIcon />}
          variant="contained"
          onClick={() => {
            undoChanges();
          }}
        >
          Undo Changes
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          paddingTop: 0,
        }}
      >
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#448aff",
            borderRadius: 1,
            fontSize: "8px",
            fontWeight: "bold",
            margin: 1,
            width: "100%",
          }}
          startIcon={<RedoIcon />}
          variant="contained"
          onClick={() => {
            redoChanges();
          }}
        >
          Redo Changes
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          paddingTop: 0,
          marginBottom: 20,
        }}
      >
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#448aff",
            borderRadius: 1,
            fontSize: "8px",

            fontWeight: "bold",
            margin: 1,
            width: "100%",
          }}
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={saveDataIntoDatabase}
        >
          Save Data
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChartControlButtons;

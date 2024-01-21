//import { Radio, Typography } from "@mui/material";
import {
  averageCPK,
  calculateAvgPpk,
  calculateCPLArray,
  calculateCPUArray,
  calculateCp,
  calculateCpkArray,
  calculateCumulAvg,
  calculateCumulativeAvgEstimatedStdDev,
  calculateCumulativeAvgMovingRange,
  calculateMRCLArray,
  calculateMRUCLArray,
  calculateMovingRange,
  calculatePp,
  calculatePpk,
  calculatePpl,
  calculatePpu,
  calculateXCL,
  calculateXLCL,
  calculateXUCLIndividualChart,
  sampleStdDev,
} from "./calculationsNew";

// Create display headers
export const checkValid = (value) => {
  if (!isNaN(parseFloat(value))) {
    return true;
  } else {
    return false;
  }
};
export const createDisplayHeaders = (headers, lsl, usl, role) => {
  let displayHeaders = [];
  // displayHeaders.push("");
  if (role === "Admin") {
    for (let headerIndex = 1; headerIndex < 6; headerIndex++) {
      if (headerIndex === 1) {
        displayHeaders.push(headers[headerIndex] + "(Appears on Chart)");
      } else {
        displayHeaders.push(headers[headerIndex]);
      }
    }
  } else {
    for (let headerIndex = 1; headerIndex < headers.length; headerIndex++) {
      if (headerIndex === 1) {
        displayHeaders.push(headers[headerIndex] + "(Appears on Chart)");
      } else if (headerIndex === 14 || headerIndex === 19) {
        if (lsl !== 0) {
          displayHeaders.push(headers[headerIndex]);
        }
      } else if (headerIndex === 15 || headerIndex === 20) {
        if (usl !== 0) {
          displayHeaders.push(headers[headerIndex]);
        }
      } else if (
        headerIndex === 16 ||
        headerIndex === 17 ||
        headerIndex === 21 ||
        headerIndex === 22
      ) {
        if (lsl !== 0 || usl !== 0) {
          displayHeaders.push(headers[headerIndex]);
        }
      } else if (headerIndex === 23 || headerIndex === 24) {
        if (lsl !== 0 && usl !== 0) {
          displayHeaders.push(headers[headerIndex]);
        }
      } else {
        displayHeaders.push(headers[headerIndex]);
      }
    }
  }
  return displayHeaders;
};

// Create table data array
export const calculateAndCreateTableData = (
  lockLimit,
  lsl,
  usl,
  userEnteredData
) => {
  const userEnteredValues = getValuesWithoutNull(userEnteredData);
  // Create calculated arrays
  const movingRangeArray = calculateMovingRange(userEnteredValues);
  const cumulAvgArray = calculateCumulAvg(userEnteredValues);
  const cumulMRArray = calculateCumulativeAvgMovingRange(userEnteredValues);
  const cumulAvgEstStdDevArray =
    calculateCumulativeAvgEstimatedStdDev(userEnteredValues);
  const xUclArray = calculateXUCLIndividualChart(userEnteredValues, lockLimit);
  const xClArray = calculateXCL(userEnteredValues, lockLimit);
  const xLclArray = calculateXLCL(userEnteredValues, lockLimit);
  const mrUclArray = calculateMRUCLArray(userEnteredValues, lockLimit);
  const mrClArray = calculateMRCLArray(userEnteredValues, lockLimit);
  const cplArray = calculateCPLArray(userEnteredValues, lsl);
  const cpuArray = calculateCPUArray(userEnteredValues, usl);
  const cpkArray = calculateCpkArray(userEnteredValues, usl, lsl);
  const avgCpkArray = averageCPK(userEnteredValues, usl, lsl);
  const sampleStdDevArray = sampleStdDev(userEnteredValues);
  const pplArray = calculatePpl(userEnteredValues, lsl);
  const ppuArray = calculatePpu(userEnteredValues, usl);
  const ppkArray = calculatePpk(userEnteredValues, usl, lsl);
  const avgPpkArray = calculateAvgPpk(userEnteredValues, usl, lsl);
  const cpArray = calculateCp(userEnteredValues, usl, lsl);
  const ppArray = calculatePp(userEnteredValues, usl, lsl);

  // Map with table array
  let userEditedTableData = [];
  for (let row = 0; row < userEnteredData.length; row++) {
    userEditedTableData.push([
      ...userEnteredData[row],
      isNaN(movingRangeArray[row]) ? "" : movingRangeArray[row],
      isNaN(cumulAvgArray[row]) ? "" : cumulAvgArray[row],
      isNaN(cumulMRArray[row]) ? "" : cumulMRArray[row],
      isNaN(cumulAvgEstStdDevArray[row]) ? "" : cumulAvgEstStdDevArray[row],
      isNaN(xUclArray[row]) ? "" : xUclArray[row],
      isNaN(xClArray[row]) ? "" : xClArray[row],
      isNaN(xLclArray[row]) ? "" : xLclArray[row],
      isNaN(mrUclArray[row]) ? "" : mrUclArray[row],
      isNaN(mrClArray[row]) ? "" : mrClArray[row],
      isNaN(cplArray[row]) ? "" : cplArray[row],
      isNaN(cpuArray[row]) ? "" : cpuArray[row],
      isNaN(cpkArray[row]) ? "" : cpkArray[row],
      isNaN(avgCpkArray[row]) ? "" : avgCpkArray[row],
      isNaN(sampleStdDevArray[row]) ? "" : sampleStdDevArray[row],
      isNaN(pplArray[row]) ? "" : pplArray[row],
      isNaN(ppuArray[row]) ? "" : ppuArray[row],
      isNaN(ppkArray[row]) ? "" : ppkArray[row],
      isNaN(avgPpkArray[row]) ? "" : avgPpkArray[row],
      isNaN(cpArray[row]) ? "" : cpArray[row],
      isNaN(ppArray[row]) ? "" : ppArray[row],
    ]);
  }
  return userEditedTableData;
};

// Create Table data for spreadsheet
export const createTableData = (
  incomingData,
  columnHeaders,
  displayHeaders
) => {
  let withoutEmptyRow = [];
  const removeLastEmptyRow = (dataArray) => {
    if (
      dataArray.length === 0 ||
      !isEmptyRow(dataArray[dataArray.length - 1])
    ) {
      return dataArray;
    } else {
      dataArray.pop();
      return removeLastEmptyRow(dataArray);
    }
  };
  if (incomingData.length !== 0) {
    withoutEmptyRow = removeLastEmptyRow([...incomingData]);
  }
  const tableData = withoutEmptyRow.map((row) => {
    let rowData = [];
    for (let cell = 0; cell < displayHeaders.length; cell++) {
      /*  if (cell === 0) {
        rowData.push({
          value: index + 1,
          readOnly: true,
        });
      }  */
      /* if (cell === 0) {
        rowData.push({
          value: (
            <Radio
              checked={row[columnHeaders.indexOf(displayHeaders[cell])]}
              size="small"
              style={{ width: "10px", height: "10px" }}
            />
          ),
          readOnly: true,
        });
      } else  */
      if (cell < 4) {
        rowData.push({
          value: row[columnHeaders.indexOf(displayHeaders[cell])],
        });
      } else {
        rowData.push({
          value: row[columnHeaders.indexOf(displayHeaders[cell])],
          readOnly: true,
        });
      }
    }
    return rowData;
  });
  for (let i = 0; i < 50; i++) {
    tableData.push([
  /* {
        value: <Typography variant="p">{tableData.length + i + 1}</Typography>,
        readOnly: true,
      }, */
  /* {
        value: (
          <Radio
            checked={false}
            size="small"
            style={{ width: "10px", height: "10px" }}
          />
        ),
        readOnly: true,
      }, */
  {
        value: "",
      },
      {
        value: "",
      },
      {
        value: "",
      },
      {
        value: "",
      },
    ]);
  }
  return tableData;
};

// Check is empty row
export const isEmptyRow = (row) => {
  if (row[1] === "" && row[2] === "" && row[3] === "" && row[4] === "") {
    return true;
  } else {
    return false;
  }
};

// Get value without null
export const getValuesWithoutNull = (userEnteredData) => {
  const values = userEnteredData
    .map((row) => {
      const cellValue = parseFloat(row[3]);
      return !isNaN(cellValue) ? cellValue : undefined;
    })
    .filter((value) => value !== undefined);
  return values;
};

export const addNewRow = (data, selectedRow, place) => {
  /* console.log(data)
  console.log(selectedRow)
  console.log(place) */
  const newRow = [false, "", "", "", ""];
  if (place === "end") {
    data.push(newRow);
  } else if (place === "above") {
    data.splice(selectedRow, 0, newRow);
  } else if (place === "below") {
    data.splice(selectedRow + 1, 0, newRow);
  }
  return data;
};

export const removeRow = (data, selectedRow) => {
  data.splice(selectedRow, 1);
  return data;
};

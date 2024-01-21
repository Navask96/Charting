import { Radio } from "@mui/material";
import {
  calculateAverage,
  calculateAvgCl,
  calculateAvgCpk,
  calculateAvgLcl,
  calculateAvgPpk,
  calculateAvgUcl,
  calculateCp,
  calculateCpk,
  calculateCpl,
  calculateCpu,
  calculateCumulAvgRange,
  calculateCumulEstSd,
  calculateCumulGrandAvg,
  calculatePp,
  calculatePpk,
  calculatePpl,
  calculatePpu,
  calculateRange,
  calculateRngCl,
  calculateRngLcl,
  calculateRngUcl,
  calculateSampleStdDev,
} from "./XBarCalculationNew";

// Create display headers
export const checkValid = (value) => {
  if (!isNaN(parseFloat(value))) {
    return true;
  } else {
    return false;
  }
};
export const createXBarDisplayHeaders = (
  headers,
  subgroupSize,
  lsl,
  usl,
  role
) => {
  let displayHeaders = [];
  if (role === "Admin") {
    for (let headerIndex = 1; headerIndex < 6 + subgroupSize; headerIndex++) {
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
      } else if (
        headerIndex === 16 + subgroupSize ||
        headerIndex === 20 + subgroupSize
      ) {
        if (lsl !== 0) {
          displayHeaders.push(headers[headerIndex]);
        }
      } else if (
        headerIndex === 17 + subgroupSize ||
        headerIndex === 21 + subgroupSize
      ) {
        if (usl !== 0) {
          displayHeaders.push(headers[headerIndex]);
        }
      } else if (
        headerIndex === 18 + subgroupSize ||
        headerIndex === 19 + subgroupSize ||
        headerIndex === 22 + subgroupSize ||
        headerIndex === 23 + subgroupSize
      ) {
        if (lsl !== 0 || usl !== 0) {
          displayHeaders.push(headers[headerIndex]);
        }
      } else if (
        headerIndex === 24 + subgroupSize ||
        headerIndex === 25 + subgroupSize
      ) {
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

// Calculate and crate table data
export const calculateAndCreateXBarTableData = (
  userEnteredData,
  subgroupSize,
  lockLimit,
  lsl,
  usl
) => {
  const userEnteredValues = getValuesWithoutNull(userEnteredData, subgroupSize);
  // Create calculated arrays
  const avgArray = calculateAverage(userEnteredValues, subgroupSize);
  const rngArray = calculateRange(userEnteredValues);
  const cumulGrandAvgArray = calculateCumulGrandAvg(
    userEnteredValues,
    subgroupSize
  );
  const cumulAvgRangeArray = calculateCumulAvgRange(
    userEnteredValues,
    subgroupSize
  );
  const cumulAvgEstStdDevArray = calculateCumulEstSd(
    userEnteredValues,
    subgroupSize
  );
  const campleStdDevArray = calculateSampleStdDev(
    userEnteredValues,
    subgroupSize
  );
  const avgUclArray = calculateAvgUcl(
    userEnteredValues,
    subgroupSize,
    lockLimit
  );
  const avgClArray = calculateAvgCl(userEnteredValues, subgroupSize, lockLimit);
  const avgLclArray = calculateAvgLcl(
    userEnteredValues,
    subgroupSize,
    lockLimit
  );
  const rngUclArray = calculateRngUcl(
    userEnteredValues,
    subgroupSize,
    lockLimit
  );
  const rngClArray = calculateRngCl(userEnteredValues, subgroupSize, lockLimit);
  const rngLclArray = calculateRngLcl(
    userEnteredValues,
    subgroupSize,
    lockLimit
  );
  const cplArray = calculateCpl(userEnteredValues, subgroupSize, lsl);
  const cpuArray = calculateCpu(userEnteredValues, subgroupSize, usl);
  const cpkArray = calculateCpk(userEnteredValues, subgroupSize, usl, lsl);
  const avgCpkArray = calculateAvgCpk(
    userEnteredValues,
    subgroupSize,
    usl,
    lsl
  );
  const pplArray = calculatePpl(userEnteredValues, subgroupSize, lsl);
  const ppuArray = calculatePpu(userEnteredValues, subgroupSize, usl);
  const ppkArray = calculatePpk(userEnteredValues, subgroupSize, usl, lsl);
  const avgPpkArray = calculateAvgPpk(
    userEnteredValues,
    subgroupSize,
    usl,
    lsl
  );
  const cpArray = calculateCp(userEnteredValues, subgroupSize, usl, lsl);
  const ppArray = calculatePp(userEnteredValues, subgroupSize, usl, lsl);

  // Map with table Array
  let userEditedTableData = [];
  for (let row = 0; row < userEnteredData.length; row++) {
    userEditedTableData.push([
      ...userEnteredData[row],
      isNaN(avgArray[row]) ? "" : avgArray[row],
      isNaN(rngArray[row]) ? "" : rngArray[row],
      isNaN(cumulGrandAvgArray[row]) ? "" : cumulGrandAvgArray[row],
      isNaN(cumulAvgRangeArray[row]) ? "" : cumulAvgRangeArray[row],
      isNaN(cumulAvgEstStdDevArray[row]) ? "" : cumulAvgEstStdDevArray[row],
      isNaN(campleStdDevArray[row]) ? "" : campleStdDevArray[row],
      isNaN(avgUclArray[row]) ? "" : avgUclArray[row],
      isNaN(avgClArray[row]) ? "" : avgClArray[row],
      isNaN(avgLclArray[row]) ? "" : avgLclArray[row],
      isNaN(rngUclArray[row]) ? "" : rngUclArray[row],
      isNaN(rngClArray[row]) ? "" : rngClArray[row],
      isNaN(rngLclArray[row]) ? "" : rngLclArray[row],
      isNaN(cplArray[row]) ? "" : cplArray[row],
      isNaN(cpuArray[row]) ? "" : cpuArray[row],
      isNaN(cpkArray[row]) ? "" : cpkArray[row],
      isNaN(avgCpkArray[row]) ? "" : avgCpkArray[row],
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

export const getValuesWithoutNull = (userEnteredData, subgroupSize) => {
  const valuesArray = [];
  for (let row = 0; row < userEnteredData.length; row++) {
    let valueRow = [];
    let invalidRow = false;
    for (let subValue = 0; subValue < subgroupSize; subValue++) {
      let x = parseFloat(userEnteredData[row][subValue + 3]);
      if (!isNaN(x) && x !== null) {
        valueRow.push(x);
      } else {
        invalidRow = true;
      }
    }
    if (!invalidRow) {
      valuesArray.push(valueRow);
    }
  }
  return valuesArray;
};

// Create data array for table
export const createSpreadSheetTableData = (
  data,
  subgroupSize,
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
  if (data.length !== 0) {
    withoutEmptyRow = removeLastEmptyRow([...data]);
  }
  const tableData = withoutEmptyRow.map((row) => {
    let rowData = [];
    for (let cell = 0; cell < displayHeaders.length; cell++) {
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
      } else */ if (cell < 3 + subgroupSize) {
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
  let emptyRow = [
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
  ];
  for (let cell = 0; cell < subgroupSize; cell++) {
    emptyRow.push({
      value: "",
    });
  }
  for (let i = 0; i < 50; i++) {
    tableData.push(emptyRow);
  }
  return tableData;
};

// Check is empty row
export const isEmptyRow = (row) => {
  for (let cellNumber = 1; cellNumber < row.length; cellNumber++) {
    if (row[cellNumber] !== "") {
      return false;
    }
  }
  return true;
};

// Add new row methods
export const addNewRow = (data, subgroupSize, selectedRow, place) => {
  let newRow = [false, "", "", ""];
  for (let cell = 0; cell < subgroupSize; cell++) {
    newRow.push("");
  }
  if (place === "end") {
    data.push(newRow);
  } else if (place === "above") {
    data.splice(selectedRow, 0, newRow);
  } else if (place === "below") {
    data.splice(selectedRow + 1, 0, newRow);
  }
  return data;
};

// Remove row in a table
export const removeRow = (data, selectedRow) => {
  data.splice(selectedRow, 1);
  return data;
};

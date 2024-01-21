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

// Get user entered values
export const getValuesWithoutNull = (tableData) => {
  const values = tableData
    .map((row) => {
      const cellValue = parseFloat(row[3]);
      return !isNaN(cellValue) ? cellValue : undefined;
    })
    .filter((value) => value !== undefined);
  return values;
};

// Check is empty row
export const isEmptyRow = (row) => {
  if (row[1] === "" && row[2] === "" && row[3] === "" && row[4] === "") {
    return true;
  } else {
    return false;
  }
};

// Create table data
export const calculateAndCreateTableData = (
  lockLimit,
  lsl,
  usl,
  userEnteredData
) => {
  // Remove empty rows
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
  if (userEnteredData.length !== 0) {
    withoutEmptyRow = removeLastEmptyRow([...userEnteredData]);
  }

  const properValues = getValuesWithoutNull(withoutEmptyRow);

  // Create calculated arrays
  const movingRangeArray = calculateMovingRange(properValues);
  const cumulAvgArray = calculateCumulAvg(properValues);
  const cumulMRArray = calculateCumulativeAvgMovingRange(properValues);
  const cumulAvgEstStdDevArray =
    calculateCumulativeAvgEstimatedStdDev(properValues);
  const xUclArray = calculateXUCLIndividualChart(properValues, lockLimit);
  const xClArray = calculateXCL(properValues, lockLimit);
  const xLclArray = calculateXLCL(properValues, lockLimit);
  const mrUclArray = calculateMRUCLArray(properValues, lockLimit);
  const mrClArray = calculateMRCLArray(properValues, lockLimit);
  const cplArray = calculateCPLArray(properValues, lsl);
  const cpuArray = calculateCPUArray(properValues, usl);
  const cpkArray = calculateCpkArray(properValues, usl, lsl);
  const avgCpkArray = averageCPK(properValues, usl, lsl);
  const sampleStdDevArray = sampleStdDev(properValues);
  const pplArray = calculatePpl(properValues, lsl);
  const ppuArray = calculatePpu(properValues, usl);
  const ppkArray = calculatePpk(properValues, usl, lsl);
  const avgPpkArray = calculateAvgPpk(properValues, usl, lsl);
  const cpArray = calculateCp(properValues, usl, lsl);
  const ppArray = calculatePp(properValues, usl, lsl);

  // Map with table array
  let userEditedTableData = [];
  for (let row = 0; row < withoutEmptyRow.length; row++) {
    userEditedTableData.push([
      ...withoutEmptyRow[row],
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

  for (let noOfRow = 0; noOfRow < 50; noOfRow++) {
    userEditedTableData.push([false, "", "", "", ""]);
  }
  return userEditedTableData;
};

// Create column names
export const createColumnNames = (headers, lsl, usl, role) => {
  let columnNames = [];

  for (let headerIndex = 0; headerIndex < 5; headerIndex++) {
    if (headerIndex === 0) {
      columnNames.push({
        data: headerIndex,
        title: headers[headerIndex],
        type: "checkbox",
        readOnly: true,
      });
    } else if (headerIndex === 1) {
      columnNames.push({
        data: headerIndex,
        title: headers[headerIndex] + "(Appears on Chart)",
      });
    } else {
      columnNames.push({ data: headerIndex, title: headers[headerIndex] });
    }
  }
  if (role === "Admin") {
    for (let headerIndex = 5; headerIndex < headers.length; headerIndex++) {
      if (headerIndex === 14 || headerIndex === 19) {
        if (lsl !== 0) {
          columnNames.push({
            data: headerIndex,
            title: headers[headerIndex],
            readOnly: true,
          });
        }
      } else if (headerIndex === 15 || headerIndex === 20) {
        if (usl !== 0) {
          columnNames.push({
            data: headerIndex,
            title: headers[headerIndex],
            readOnly: true,
          });
        }
      } else if (
        headerIndex === 16 ||
        headerIndex === 17 ||
        headerIndex === 21 ||
        headerIndex === 22
      ) {
        if (lsl !== 0 || usl !== 0) {
          columnNames.push({
            data: headerIndex,
            title: headers[headerIndex],
            readOnly: true,
          });
        }
      } else if (headerIndex === 23 || headerIndex === 24) {
        if (lsl !== 0 && usl !== 0) {
          columnNames.push({
            data: headerIndex,
            title: headers[headerIndex],
            readOnly: true,
          });
        }
      } else {
        columnNames.push({
          data: headerIndex,
          title: headers[headerIndex],
          readOnly: true,
        });
      }
    }
  }

  return columnNames;
};

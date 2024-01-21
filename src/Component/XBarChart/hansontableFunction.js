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

// Create column names
export const createColumnNames = (headers, subgroupSize, lsl, usl, role) => {
  let columnNames = [];

  for (let headerIndex = 0; headerIndex < 4 + subgroupSize; headerIndex++) {
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
    for (
      let headerIndex = 4 + subgroupSize;
      headerIndex < headers.length;
      headerIndex++
    ) {
      if (
        headerIndex === 16 + subgroupSize ||
        headerIndex === 20 + subgroupSize
      ) {
        if (lsl !== 0) {
          columnNames.push({
            data: headerIndex,
            title: headers[headerIndex],
            readOnly: true,
          });
        }
      } else if (
        headerIndex === 17 + subgroupSize ||
        headerIndex === 21 + subgroupSize
      ) {
        if (usl !== 0) {
          columnNames.push({
            data: headerIndex,
            title: headers[headerIndex],
            readOnly: true,
          });
        }
      } else if (
        headerIndex === 18 + subgroupSize ||
        headerIndex === 19 + subgroupSize ||
        headerIndex === 22 + subgroupSize ||
        headerIndex === 23 + subgroupSize
      ) {
        if (lsl !== 0 || usl !== 0) {
          columnNames.push({
            data: headerIndex,
            title: headers[headerIndex],
            readOnly: true,
          });
        }
      } else if (
        headerIndex === 24 + subgroupSize ||
        headerIndex === 25 + subgroupSize
      ) {
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

// Create Table Data
export const calculateAndCreateTableData = (
  lockLimit,
  lsl,
  usl,
  userEnteredData,
  subgroupSize
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

  const properValues = getValuesWithoutNull(withoutEmptyRow, subgroupSize);

  // Create calculated arrays
  const avgArray = calculateAverage(properValues, subgroupSize);
  const rngArray = calculateRange(properValues);
  const cumulGrandAvgArray = calculateCumulGrandAvg(
    properValues,
    subgroupSize
  );
  const cumulAvgRangeArray = calculateCumulAvgRange(
    properValues,
    subgroupSize
  );
  const cumulAvgEstStdDevArray = calculateCumulEstSd(
    properValues,
    subgroupSize
  );
  const campleStdDevArray = calculateSampleStdDev(
    properValues,
    subgroupSize
  );
  const avgUclArray = calculateAvgUcl(properValues, subgroupSize, lockLimit);
  const avgClArray = calculateAvgCl(properValues, subgroupSize, lockLimit);
  const avgLclArray = calculateAvgLcl(properValues, subgroupSize, lockLimit);
  const rngUclArray = calculateRngUcl(properValues, subgroupSize, lockLimit);
  const rngClArray = calculateRngCl(properValues, subgroupSize, lockLimit);
  const rngLclArray = calculateRngLcl(properValues, subgroupSize, lockLimit);
  const cplArray = calculateCpl(properValues, subgroupSize, lsl);
  const cpuArray = calculateCpu(properValues, subgroupSize, usl);
  const cpkArray = calculateCpk(properValues, subgroupSize, usl, lsl);
  const avgCpkArray = calculateAvgCpk(properValues, subgroupSize, usl, lsl);
  const pplArray = calculatePpl(properValues, subgroupSize, lsl);
  const ppuArray = calculatePpu(properValues, subgroupSize, usl);
  const ppkArray = calculatePpk(properValues, subgroupSize, usl, lsl);
  const avgPpkArray = calculateAvgPpk(properValues, subgroupSize, usl, lsl);
  const cpArray = calculateCp(properValues, subgroupSize, usl, lsl);
  const ppArray = calculatePp(properValues, subgroupSize, usl, lsl);

  // Map with table Array
  let userEditedTableData = [];
  for (let row = 0; row < withoutEmptyRow.length; row++) {
    userEditedTableData.push([
      ...withoutEmptyRow[row],
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

  const emptyRow = [false, "", "", ""];
  for (let subIndex = 0; subIndex < subgroupSize; subIndex++) {
    emptyRow.push("");
  }
  for (let noOfRow = 0; noOfRow < 50; noOfRow++) {
    userEditedTableData.push([...emptyRow]);
  }

  return userEditedTableData;
};

// Empty row checking
export const isEmptyRow = (row) => {
  for (let cellNumber = 1; cellNumber < row.length; cellNumber++) {
    if (row[cellNumber] !== "") {
      return false;
    }
  }
  return true;
};

// Get values without null
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

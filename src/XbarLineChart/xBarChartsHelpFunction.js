import {
  calculateAverage,
  calculateAvgCl,
  calculateAvgLcl,
  calculateAvgUcl,
  calculateCp,
  calculateCpk,
  calculatePp,
  calculatePpk,
  calculateRange,
  calculateRngCl,
  calculateRngLcl,
  calculateRngUcl,
} from "../Component/XBarChart/XBarCalculationNew";

// Chart 1 help function
export const createChart1DataSets = (
  values,
  lockLimit,
  chartProperties,
  xLabels,
  subgroupSize
) => {
  // Calculate line values
  const lineValues = calculateAverage(values, subgroupSize);

  // Calculate avg ucl line
  const avgUclArray = calculateAvgUcl(values, subgroupSize, lockLimit);
  const avgUclAvgValue =
    avgUclArray.reduce((acc, value) => acc + value, 0) / avgUclArray.length;

  // Calculate avg cl line
  const avgClArray = calculateAvgCl(values, subgroupSize, lockLimit);
  const avgClAvgValue =
    avgClArray.reduce((acc, value) => acc + value, 0) / avgClArray.length;

  //Calculate avg LCL line
  const avgLclArray = calculateAvgLcl(values, subgroupSize, lockLimit);
  const avgLclAvgValue =
    avgLclArray.reduce((acc, value) => acc + value, 0) / avgLclArray.length;

  // Calculate target line
  const targetValue = parseFloat(chartProperties?.targetValue || 0);

  let dataSets = lineValues.map((value, index) => ({
    name: xLabels[index],
    Average: value,
    Avg_UCL: Number(avgUclAvgValue.toFixed(2)),
    Avg_LCL: Number(avgLclAvgValue.toFixed(2)),
    Avg_CL: Number(avgClAvgValue.toFixed(2)),
    Target: targetValue,
  }));

  return dataSets;
};

// Chart 2 help function
export const createChart2DataSets = (
  values,
  lockLimit,
  xLabels,
  subgroupSize
) => {
  // Calculate Range line
  const lineValues = calculateRange(values);

  // Calculate Mr Ucl line
  const mrUclArray = calculateRngUcl(values, subgroupSize, lockLimit);
  const avgMrUclValue =
    mrUclArray?.reduce((acc, value) => acc + value, 0) / mrUclArray.length;

  // Calculate Mr Lcl line
  const mrLclArray = calculateRngLcl(values, subgroupSize, lockLimit);
  const avgMrLclValue =
    mrLclArray?.reduce((acc, value) => acc + value, 0) / mrLclArray.length;
 
  // Calculate Cl line
  const mrClArray = calculateRngCl(values, subgroupSize, lockLimit);
  const avgMrClValue =
    mrClArray?.reduce((acc, value) => acc + value, 0) / mrClArray.length;
 
  let dataSets = lineValues.map((value, index) => ({
    name: xLabels[index],
    MR: Number(value.toFixed(2)),
    MR_UCL: Number(avgMrUclValue.toFixed(2)),
    MR_CL: Number(avgMrClValue.toFixed(2)),
    MR_LCL: Number(avgMrLclValue.toFixed(2)),
  }));

  return dataSets;
};

// Chart 3 help function
export const createChart3DataSets = (
  values,
  chartProperties,
  xLabels,
  subgroupSize
) => {
  // Calculate CPK line
  const cPKArray = calculateCpk(
    values,
    subgroupSize,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1);
  const cPKValues = cPKArray.map((value) => Number(value.toFixed(2)));

  // Calculate CP line
  const cPArray = calculateCp(
    values,
    subgroupSize,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1);
  const cPValues = cPArray.map((value) => Number(value.toFixed(2)));

  // Calculate PPK line
  const pPKArray = calculatePpk(
    values,
    subgroupSize,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1);
  const pPKValues = pPKArray.map((value) => Number(value.toFixed(2)));

  // Calculate PP line
  const pPArray = calculatePp(
    values,
    subgroupSize,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1);
  const pPValues = pPArray.map((value) => Number(value.toFixed(2)));

  let dataSets = xLabels.map((value, index) => ({
    name: value,
    Cpk: cPKValues[index],
    Cp: cPValues[index],
    Ppk: pPKValues[index],
    Pp: pPValues[index],
  }));

  return dataSets;
};

// Row validation
export const rowValidation = (row, subgroupSize) => {
  let validRow = true;
  for (let cell = 3; cell < 3 + subgroupSize; cell++) {
    if (isNaN(parseFloat(row[cell]))) {
      validRow = false;
    }
  }
  return validRow;
};

// Get valid rows
export const createValidRows = (tableData, subgroupSize) => {
  let validRows = [];
  for (let row = 0; row < tableData.length; row++) {
    if (rowValidation(tableData[row], subgroupSize)) {
      let validCell = [];
      if (tableData[row][0] === undefined || tableData[row][0] === null) {
        validCell.push(false);
      } else {
        validCell.push(tableData[row][0]);
      }
      for (let cell = 1; cell < 4 + subgroupSize; cell++) {
        if (
          tableData[row][cell] === undefined ||
          tableData[row][cell] === null
        ) {
          validCell.push("");
        } else {
          validCell.push(tableData[row][cell]);
        }
      }
      validRows.push(validCell);
    }
  }
  return validRows;
};

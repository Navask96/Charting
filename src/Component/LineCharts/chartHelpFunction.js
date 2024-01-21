import {
  calculateCp,
  calculateCpkArray,
  calculateMRCLArray,
  calculateMRUCLArray,
  calculateMovingRange,
  calculatePp,
  calculatePpk,
  calculateXCL,
  calculateXLCL,
  calculateXUCLIndividualChart,
} from "../XmrChart/calculationsNew";

// chart 1 help functions
export const createDataSets = (values, lockLimit, chartProperties, xLabels) => {
  // Calculate XUCL line values
  const xUclArray = calculateXUCLIndividualChart(values, lockLimit).slice(1);
  const avgXUclValue =
    xUclArray?.reduce((acc, value) => acc + value, 0) / xUclArray?.length;

  // Calculate XCL line Values
  const xClArray = calculateXCL(values, lockLimit);
  const averageXclValue =
    xClArray?.reduce((acc, value) => acc + value, 0) / xClArray?.length;

  // Calculate XLcl line values
  const xLclArray = calculateXLCL(values, lockLimit).slice(1);
  const avgXLclValue =
    xLclArray?.reduce((acc, value) => acc + value, 0) / xLclArray?.length;

  // Calculate target line values
  const targetValue = parseFloat(chartProperties?.targetValue || 0);

  let newDataSets = values.map((value, index) => ({
    name: xLabels[index],
    value: value,
    X_UCL: Number(avgXUclValue.toFixed(2)),
    X_LCL: Number(avgXLclValue.toFixed(2)),
    X_CL: Number(averageXclValue.toFixed(2)),
    Target: targetValue,
  }));

  return newDataSets;
};

// Chart 2 help function
export const createChart2DataSet = (values, lockLimit, xLabels) => {
  // Calculate line values
  const lineValues = calculateMovingRange(values).slice(1);

  // Calculate Mr Ucl line
  const mrUclArray = calculateMRUCLArray(values, lockLimit).slice(1);
  const avgMrUclValue =
    mrUclArray?.reduce((acc, value) => acc + value, 0) / mrUclArray?.length;

  // Calculate MR CL line
  const mrClArray = calculateMRCLArray(values, lockLimit).slice(1);
  const avgMrClValue =
    mrClArray?.reduce((acc, value) => acc + value, 0) / mrClArray?.length;

  let dataSets = lineValues.map((value, index) => ({
    name: xLabels[index],
    MR: Number(value.toFixed(2)),
    MR_UCL: Number(avgMrUclValue.toFixed(2)),
    MR_CL: Number(avgMrClValue.toFixed(2)),
  }));

  return dataSets;
};

// Chart 3 help function
export const createChart3DataSet = (values, chartProperties, xLabels) => {
  // calculate cpk line
  const cPKArray = calculateCpkArray(
    values,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1);
  const cPKValues = cPKArray.map((value) => Number(value.toFixed(2)));

  // calculate cp line
  const cPArray = calculateCp(
    values,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1); // CPK line data array
  const cPValues = cPArray.map((value) => Number(value.toFixed(2)));

  // calculate ppk line
  const pPKArray = calculatePpk(
    values,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1); // CPK line data array
  const pPKValues = pPKArray.map((value) => Number(value.toFixed(2)));

  // calculate pp line
  const pPArray = calculatePp(
    values,
    parseFloat(chartProperties.upperSpecLimitValue),
    parseFloat(chartProperties.lowerSpecLimitValue)
  ).slice(1); // CPK line data array
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

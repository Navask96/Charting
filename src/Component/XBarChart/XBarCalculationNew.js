export const calculateAverage = (dataValues, subgroupSize) => {
  let average = [];
  for (let row = 0; row < dataValues.length; row++) {
    const total = (subgroup) => {
      if (subgroup === 0) {
        return dataValues[row][0];
      } else {
        return dataValues[row][subgroup] + total(subgroup - 1);
      }
    };
    average.push(Number(total(subgroupSize - 1) / subgroupSize));
  }
  return average;
};

export const calculateRange = (dataValues) => {
  let ranges = [];

  for (let row = 0; row < dataValues.length; row++) {
    const maxValue = Math.max(...dataValues[row]);
    const minValue = Math.min(...dataValues[row]);
    const range = maxValue - minValue;
    ranges.push(range);
  }
  return ranges;
};

export const calculateCumulGrandAvg = (dataValues, subgroupSize) => {
  let cumulGrandAvg = [];
  const average = calculateAverage(dataValues, subgroupSize);
  for (let row = 0; row < average.length; row++) {
    const cumulGrandTotal = (n) => {
      if (n === 0) {
        return average[0];
      } else {
        return average[n] + cumulGrandTotal(n - 1);
      }
    };
    cumulGrandAvg.push(Number(cumulGrandTotal(row) / (row + 1)));
  }
  return cumulGrandAvg;
};

export const calculateCumulAvgRange = (dataValues, subgroupSize) => {
  let cumulAvgRanges = [];
  let mrArray = calculateRange(dataValues, subgroupSize);
  for (let row = 0; row < dataValues.length; row++) {
    const cumulMovingRangeTotal = (n) => {
      if (n === 0) {
        return mrArray[0];
      } else {
        return mrArray[n] + cumulMovingRangeTotal(n - 1);
      }
    };
    cumulAvgRanges.push(Number(cumulMovingRangeTotal(row) / (row + 1)));
  }
  return cumulAvgRanges;
};

export const calculateCumulEstSd = (dataValues, subgroupSize) => {
  const d2 = (numberOfSamples) => {
    switch (numberOfSamples) {
      case 2:
        return 1.128;
      case 3:
        return 1.693;
      case 4:
        return 2.059;
      case 5:
        return 2.326;
      case 6:
        return 2.534;
      case 7:
        return 2.704;
      case 8:
        return 2.847;
      case 9:
        return 2.97;
      case 10:
        return 3.078;
      default:
        return 0;
    }
  };
  let cumulEstSdArray = [];
  const cumulAvgRangeArray = calculateCumulAvgRange(dataValues, subgroupSize);
  for (let row = 0; row < dataValues.length; row++) {
    cumulEstSdArray.push(Number(cumulAvgRangeArray[row] / d2(subgroupSize)));
  }
  return cumulEstSdArray;
};

export const calculateSampleStdDev = (dataValues, subgroupSize) => {
  const averageArray = calculateAverage(dataValues, subgroupSize);
  const cumulGrandAvgArray = calculateCumulGrandAvg(dataValues, subgroupSize);
  let sampleStdDevArray = [];
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      sampleStdDevArray.push("");
    } else {
      let sumOfSquaredDifferences = 0;
      for (let cumul = 0; cumul <= row; cumul++) {
        sumOfSquaredDifferences =
          sumOfSquaredDifferences +
          (averageArray[cumul] - cumulGrandAvgArray[row]) ** 2;
      }
      sampleStdDevArray.push(Number(Math.sqrt(sumOfSquaredDifferences / row)));
    }
  }
  return sampleStdDevArray;
};

const a2 = (numberOfSamples) => {
  switch (numberOfSamples) {
    case 2:
      return 1.88;
    case 3:
      return 1.023;
    case 4:
      return 0.729;
    case 5:
      return 0.577;
    case 6:
      return 0.483;
    case 7:
      return 0.419;
    case 8:
      return 0.373;
    case 9:
      return 0.337;
    case 10:
      return 0.308;
    default:
      return 0;
  }
};

export const calculateAvgUcl = (dataValues, subgroupSize, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit - 1;
  }
  const cumulGrandAvgArray = calculateCumulGrandAvg(dataValues, subgroupSize);
  const cumulAvgRangeArray = calculateCumulAvgRange(dataValues, subgroupSize);
  const a2Value = a2(subgroupSize);
  let avgUclArray = [];
  for (let row = 0; row < dataValues.length; row++) {
    if (limit < dataValues.length) {
      let avgUclValue =
        cumulGrandAvgArray[limit] + a2Value * cumulAvgRangeArray[limit];
      avgUclArray.push(Number(avgUclValue));
    } else {
      let avgUclValue =
        cumulGrandAvgArray[row] + a2Value * cumulAvgRangeArray[row];
      avgUclArray.push(Number(avgUclValue));
    }
  }
  return avgUclArray;
};

export const calculateAvgCl = (dataValues, subgroupSize, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit - 1;
  }
  let avgClArray = [];
  const cumulGrandAvgArray = calculateCumulGrandAvg(dataValues, subgroupSize);
  if (limit < dataValues.length) {
    avgClArray = cumulGrandAvgArray.map(() => cumulGrandAvgArray[limit]);
  } else {
    avgClArray = cumulGrandAvgArray;
  }
  return avgClArray;
};

export const calculateAvgLcl = (dataValues, subgroupSize, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit - 1;
  }
  const cumulGrandAvgArray = calculateCumulGrandAvg(dataValues, subgroupSize);
  const cumulAvgRangeArray = calculateCumulAvgRange(dataValues, subgroupSize);
  const a2Value = a2(subgroupSize);
  let avgLclValues = [];
  if (limit < dataValues.length) {
    let avgUclValue =
      cumulGrandAvgArray[limit] - a2Value * cumulAvgRangeArray[limit];
    avgLclValues = dataValues.map(() => avgUclValue);
  } else {
    for (let row = 0; row < dataValues.length; row++) {
      let avgUclValue =
        cumulGrandAvgArray[row] - a2Value * cumulAvgRangeArray[row];
      avgLclValues.push(Number(avgUclValue));
    }
  }

  return avgLclValues;
};

const d4 = (numberOfSamples) => {
  switch (numberOfSamples) {
    case 2:
      return 3.267;
    case 3:
      return 2.574;
    case 4:
      return 2.282;
    case 5:
      return 2.114;
    case 6:
      return 2.004;
    case 7:
      return 1.924;
    case 8:
      return 1.864;
    case 9:
      return 1.816;
    case 10:
      return 1.777;
    default:
      return 0;
  }
};
export const calculateRngUcl = (dataValues, subgroupSize, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit - 1;
  }
  let rngUclArray = [];
  const cumulAvgRange = calculateCumulAvgRange(dataValues, subgroupSize);
  const d4Value = d4(subgroupSize);
  if (limit < dataValues.length) {
    for (let row = 0; row < dataValues.length; row++) {
      rngUclArray.push(Number(cumulAvgRange[limit] * d4Value));
    }
  } else {
    for (let row = 0; row < dataValues.length; row++) {
      rngUclArray.push(Number(cumulAvgRange[row] * d4Value));
    }
  }
  return rngUclArray;
};

export const calculateRngCl = (dataValues, subgroupSize, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit - 1;
  }
  const cumulAvgRangeArray = calculateCumulAvgRange(dataValues, subgroupSize);
  let rangeClValues = [];
  if (limit < dataValues.length) {
    rangeClValues = dataValues.map(() => cumulAvgRangeArray[limit]);
  } else {
    rangeClValues = cumulAvgRangeArray;
  }
  return rangeClValues;
};

const d3 = (numberOfSamples) => {
  switch (numberOfSamples) {
    case 2:
      return 0;
    case 3:
      return 0;
    case 4:
      return 0;
    case 5:
      return 0;
    case 6:
      return 0;
    case 7:
      return 0.076;
    case 8:
      return 0.136;
    case 9:
      return 0.184;
    case 10:
      return 0.223;
    default:
      return 0;
  }
};

export const calculateRngLcl = (dataValues, subgroupSize, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit - 1;
  }
  let rangeLclValueArray = [];
  const cumulAvgRange = calculateCumulAvgRange(dataValues, subgroupSize);
  const d3Value = d3(subgroupSize);
  if (limit < dataValues.length) {
    for (let row = 0; row < dataValues.length; row++) {
      rangeLclValueArray.push(Number(cumulAvgRange[limit] * d3Value));
    }
  } else {
    for (let row = 0; row < dataValues.length; row++) {
      rangeLclValueArray.push(Number(cumulAvgRange[row] * d3Value));
    }
  }
  return rangeLclValueArray;
};

export const calculateCpl = (dataValues, subgroupSize, lowerSpecLimitValue) => {
  let cplArray = [];
  const cumulGrandAvg = calculateCumulGrandAvg(dataValues, subgroupSize);
  const cumulEstSd = calculateCumulEstSd(dataValues, subgroupSize);
  if (lowerSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      cplArray.push(
        Number(
          (cumulGrandAvg[row] - lowerSpecLimitValue) / (3 * cumulEstSd[row])
        )
      );
    }
  }
  return cplArray;
};

export const calculateCpu = (dataValues, subgroupSize, upperSpecLimitValue) => {
  let cpuArray = [];
  const cumulGrandAvgArray = calculateCumulGrandAvg(dataValues, subgroupSize);
  const cumulEstSd = calculateCumulEstSd(dataValues, subgroupSize);
  if (upperSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      cpuArray.push(
        Number(
          (upperSpecLimitValue - cumulGrandAvgArray[row]) /
            (3 * cumulEstSd[row])
        )
      );
    }
  }
  return cpuArray;
};

export const calculateCpk = (
  dataValues,
  subgroupSize,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let cpkArray = [];
  const cplArray = calculateCpl(dataValues, subgroupSize, lowerSpecLimitValue);
  const cpuArray = calculateCpu(dataValues, subgroupSize, upperSpecLimitValue);
  if (lowerSpecLimitValue !== "" && upperSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      const cplValue = cplArray[row];
      const cpuValue = cpuArray[row];
      if (cplValue < cpuValue) {
        cpkArray.push(cplValue);
      } else {
        cpkArray.push(cpuValue);
      }
    }
  } else if (lowerSpecLimitValue !== "" && upperSpecLimitValue === "") {
    cpkArray = cplArray;
  } else if (lowerSpecLimitValue === "" && upperSpecLimitValue !== "") {
    cpkArray = cpuArray;
  }
  return cpkArray;
};

export const calculateAvgCpk = (
  dataValues,
  subgroupSize,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  const cpkArray = calculateCpk(
    dataValues,
    subgroupSize,
    upperSpecLimitValue,
    lowerSpecLimitValue
  );
  let avgCpkArray = [];
  if (lowerSpecLimitValue !== "" || upperSpecLimitValue !== "") {
    let totalAvgCpk = 0;
    for (let row = 0; row < dataValues.length; row++) {
      totalAvgCpk = totalAvgCpk + cpkArray[row];
    }
    for (let row = 0; row < dataValues.length; row++) {
      avgCpkArray.push(Number(totalAvgCpk / dataValues.length));
    }
  }
  return avgCpkArray;
};

export const calculatePpl = (dataValues, subgroupSize, lowerSpecLimitValue) => {
  let pplArray = [];
  const cumulGrandAvgArray = calculateCumulGrandAvg(dataValues, subgroupSize);
  const sampleStdDevArray = calculateSampleStdDev(dataValues, subgroupSize);
  if (lowerSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      if (row === 0) {
        pplArray.push("");
      } else {
        pplArray.push(
          Number(
            (cumulGrandAvgArray[row] - lowerSpecLimitValue) /
              (3 * sampleStdDevArray[row])
          )
        );
      }
    }
  }
  return pplArray;
};

export const calculatePpu = (dataValues, subgroupSize, upperSpecLimitValue) => {
  let ppuArray = [];
  const cumulGrandAvgArray = calculateCumulGrandAvg(dataValues, subgroupSize);
  const sampleStdDevArray = calculateSampleStdDev(dataValues, subgroupSize);
  if (upperSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      if (row === 0) {
        ppuArray.push("");
      } else {
        ppuArray.push(
          Number(
            (upperSpecLimitValue - cumulGrandAvgArray[row]) /
              (3 * sampleStdDevArray[row])
          )
        );
      }
    }
  }
  return ppuArray;
};

export const calculatePpk = (
  dataValues,
  subgroupSize,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let ppkArray = [];
  const pplArray = calculatePpl(dataValues, subgroupSize, lowerSpecLimitValue);
  const ppuArray = calculatePpu(dataValues, subgroupSize, upperSpecLimitValue);
  if (lowerSpecLimitValue !== "" && upperSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      const pplValue = pplArray[row];
      const ppuValue = ppuArray[row];
      if (pplValue < ppuValue) {
        ppkArray.push(pplValue);
      } else {
        ppkArray.push(ppuValue);
      }
    }
  } else if (lowerSpecLimitValue !== "" && upperSpecLimitValue === "") {
    for (let row = 0; row < dataValues.length; row++) {
      ppkArray = pplArray;
    }
  } else if (lowerSpecLimitValue === "" && upperSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      ppkArray = ppuArray;
    }
  }
  return ppkArray;
};

export const calculateAvgPpk = (
  dataValues,
  subgroupSize,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let avgPpkArray = [];
  const ppkArray = calculatePpk(
    dataValues,
    subgroupSize,
    upperSpecLimitValue,
    lowerSpecLimitValue
  );
  let totalPpk = 0;
  for (let row = 1; row < dataValues.length; row++) {
    totalPpk = totalPpk + ppkArray[row];
  }
  for (let row = 0; row < dataValues.length; row++) {
    avgPpkArray.push(Number(totalPpk / (dataValues.length - 1)));
  }
  return avgPpkArray;
};

export const calculateCp = (
  dataValues,
  subgroupSize,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let cpArray = [];
  const cumulEstSdArray = calculateCumulEstSd(dataValues, subgroupSize);
  for (let row = 0; row < dataValues.length; row++) {
    cpArray.push(
      Number(
        (upperSpecLimitValue - lowerSpecLimitValue) / (6 * cumulEstSdArray[row])
      )
    );
  }
  return cpArray;
};

export const calculatePp = (
  dataValues,
  subgroupSize,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let ppArray = [];
  const sampleStdDevArray = calculateSampleStdDev(dataValues, subgroupSize);
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      ppArray.push("");
    } else {
      ppArray.push(
        Number(
          (upperSpecLimitValue - lowerSpecLimitValue) /
            (6 * sampleStdDevArray[row])
        )
      );
    }
  }
  return ppArray;
};

export const calculateMovingRange = (dataValues) => {
  let movingRangeArray = [];
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      movingRangeArray.push("");
    } else {
      movingRangeArray.push(Math.abs(dataValues[row] - dataValues[row - 1]));
    }
  }
  return movingRangeArray;
};

export const calculateCumulAvg = (dataValues) => {
  let cumulAvgArray = [];
  const valueTotal = (numberOfRows) => {
    if (numberOfRows === 0) {
      return dataValues[numberOfRows];
    } else {
      return dataValues[numberOfRows] + valueTotal(numberOfRows - 1);
    }
  };
  for (let row = 0; row < dataValues.length; row++) {
    const cumulTotal = valueTotal(row);
    cumulAvgArray.push(Number(cumulTotal / (row + 1)));
  }
  //console.log(dataValues)
  return cumulAvgArray;
};

export const calculateCumulativeAvgMovingRange = (dataValues) => {
  const movingRanges = calculateMovingRange(dataValues);

  let cumulMovingRangAverageArray = [];
  const totalMovingRange = (numberOfRows) => {
    if (numberOfRows === 0) {
      return 0;
    } else {
      return movingRanges[numberOfRows] + totalMovingRange(numberOfRows - 1);
    }
  };
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      cumulMovingRangAverageArray.push("");
    } else {
      const cumulTotal = totalMovingRange(row);
      cumulMovingRangAverageArray.push(Number(cumulTotal / row));
    }
  }
  return cumulMovingRangAverageArray;
};

export const calculateCumulativeAvgEstimatedStdDev = (dataValues) => {
  const standardDeviations = [];
  let cumilativeAverageMovingRange =
    calculateCumulativeAvgMovingRange(dataValues);
  for (let i = 0; i < cumilativeAverageMovingRange.length; i++) {
    if (i === 0) {
      standardDeviations.push("");
    } else {
      const standardDeviation = cumilativeAverageMovingRange[i] / 1.128;
      standardDeviations.push(standardDeviation);
    }
  }

  return standardDeviations;
};

export const calculateXUCLIndividualChart = (dataValues, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit;
  }
  let xuclArray = [];
  const cumulAvgArray = calculateCumulAvg(dataValues);
  const cumulAvgMRArray = calculateCumulativeAvgMovingRange(dataValues);
  for (let row = 0; row < dataValues.length; row++) {
    if (limit < dataValues.length) {
      xuclArray.push(
        Number(cumulAvgArray[limit] + 3 * (cumulAvgMRArray[limit] / 1.128))
      );
    } else {
      if (row === 0) {
        xuclArray.push("");
      } else {
        xuclArray.push(
          Number(cumulAvgArray[row] + 3 * (cumulAvgMRArray[row] / 1.128))
        );
      }
    }
  }
  return xuclArray;
};

export function calculateXCL(data, lockLimit) {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = data.length;
  } else {
    limit = lockLimit;
  }
  const cumulAvgArray = calculateCumulAvg(data);
  let xclArray = [];
  for (let row = 0; row < data.length; row++) {
    if (limit < data.length) {
      xclArray.push(cumulAvgArray[limit]);
    } else {
      xclArray.push(cumulAvgArray[row]);
    }
  }
  return xclArray;
}

export const calculateXLCL = (dataValues, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit;
  }
  let xuLclArray = [];
  const cumulAvgArray = calculateCumulAvg(dataValues);
  const cumulAvgMRArray = calculateCumulativeAvgMovingRange(dataValues);
  for (let row = 0; row < dataValues.length; row++) {
    if (limit < dataValues.length) {
      xuLclArray.push(
        Number(cumulAvgArray[limit] - 3 * (cumulAvgMRArray[limit] / 1.128))
      );
    } else {
      if (row === 0) {
        xuLclArray.push("");
      } else {
        xuLclArray.push(
          Number(cumulAvgArray[row] - 3 * (cumulAvgMRArray[row] / 1.128))
        );
      }
    }
  }
  return xuLclArray;
};

export const calculateMRUCLArray = (dataValues, lockLimit) => {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = dataValues.length;
  } else {
    limit = lockLimit;
  }
  let mrUclArray = [];
  const cumulAvgMRArray = calculateCumulativeAvgMovingRange(dataValues);
  for (let row = 0; row < dataValues.length; row++) {
    if (limit < dataValues.length) {
      mrUclArray.push(Number(cumulAvgMRArray[limit] * 3.268));
    } else {
      if (row === 0) {
        mrUclArray.push("");
      } else {
        mrUclArray.push(Number(cumulAvgMRArray[row] * 3.268));
      }
    }
  }
  return mrUclArray;
};

export function calculateMRCLArray(data, lockLimit) {
  let limit = 0;
  if (isNaN(lockLimit) || typeof lockLimit === "undefined" || lockLimit === 0) {
    limit = data.length;
  } else {
    limit = lockLimit;
  }
  let mrClArray = [];
  const cumulAvgMrArray = calculateCumulativeAvgMovingRange(data);
  if (limit < data.length) {
    mrClArray = data.map(() => cumulAvgMrArray[limit]);
  } else {
    mrClArray = cumulAvgMrArray;
  }
  return mrClArray;
}

export const calculateCPUArray = (dataValues, upperSpecLimitValue) => {
  let cpuArray = [];
  const cumulAvgArray = calculateCumulAvg(dataValues);
  const cumulEstStd = calculateCumulativeAvgEstimatedStdDev(dataValues);
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      cpuArray.push("");
    } else {
      cpuArray.push(
        Number(
          (upperSpecLimitValue - cumulAvgArray[row]) / (3 * cumulEstStd[row])
        )
      );
    }
  }
  return cpuArray;
};

export const calculateCPLArray = (dataValues, lowerSpecLimitValue) => {
  const cplArray = [];
  const cumulAvgArray = calculateCumulAvg(dataValues);
  const cumulEstStd = calculateCumulativeAvgEstimatedStdDev(dataValues);
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      cplArray.push("");
    } else {
      cplArray.push(
        Number(
          (cumulAvgArray[row] - lowerSpecLimitValue) / (3 * cumulEstStd[row])
        )
      );
    }
  }
  return cplArray;
};

export const calculateCpkArray = (
  dataValues,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let cpkArray = [];
  if (upperSpecLimitValue !== "" && lowerSpecLimitValue !== "") {
    const cpuArray = calculateCPUArray(dataValues, upperSpecLimitValue);
    const cplArray = calculateCPLArray(dataValues, lowerSpecLimitValue);
    for (let row = 0; row < dataValues.length; row++) {
      const cpuValue = cpuArray[row];
      const cplValue = cplArray[row];
      if (cpuValue < cplValue) {
        cpkArray.push(cpuValue);
      } else {
        cpkArray.push(cplValue);
      }
    }
  } else if (upperSpecLimitValue !== "" && lowerSpecLimitValue === "") {
    const cpuArray = calculateCPUArray(dataValues, upperSpecLimitValue);
    cpkArray = cpuArray;
  } else if (upperSpecLimitValue === "" && lowerSpecLimitValue !== "") {
    const cplArray = calculateCPLArray(dataValues, lowerSpecLimitValue);
    cpkArray = cplArray;
  }
  return cpkArray;
};

export const averageCPK = (
  dataValues,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  const cpkArray = calculateCpkArray(
    dataValues,
    upperSpecLimitValue,
    lowerSpecLimitValue
  );
  let avgCpkArray = [];
  let totalCpk = 0;
  for (let row = 1; row < dataValues.length; row++) {
    totalCpk = totalCpk + cpkArray[row];
  }
  const avgCpk = Number(totalCpk / (dataValues.length - 1));
  avgCpkArray = dataValues.map(() => avgCpk);
  return avgCpkArray;
};

export const sampleStdDev = (dataValues) => {
  const cumulAvgArray = calculateCumulAvg(dataValues);
  let sampleStdDevArray = [];
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      sampleStdDevArray.push("");
    } else {
      let sumOfSquaredDifferences = 0;
      for (let cumul = 0; cumul <= row; cumul++) {
        sumOfSquaredDifferences =
          sumOfSquaredDifferences +
          (dataValues[cumul] - cumulAvgArray[row]) ** 2;
      }
      sampleStdDevArray.push(Number(Math.sqrt(sumOfSquaredDifferences / row)));
    }
  }
  return sampleStdDevArray;
};

export const calculatePpl = (dataValues, lowerSpecLimitValue) => {
  const pplArray = [];
  const cumulAvgArray = calculateCumulAvg(dataValues);
  const sampleStdDevArray = sampleStdDev(dataValues);
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      pplArray.push("");
    } else {
      pplArray.push(
        Number(
          (cumulAvgArray[row] - lowerSpecLimitValue) /
            (3 * sampleStdDevArray[row])
        )
      );
    }
  }
  return pplArray;
};

export const calculatePpu = (dataValues, upperSpecLimitValue) => {
  const ppuArray = [];
  const cumulAvgArray = calculateCumulAvg(dataValues);
  const sampleStdDevArray = sampleStdDev(dataValues);
  for (let row = 0; row < dataValues.length; row++) {
    if (row === 0) {
      ppuArray.push("");
    } else {
      ppuArray.push(
        Number(
          (upperSpecLimitValue - cumulAvgArray[row]) /
            (3 * sampleStdDevArray[row])
        )
      );
    }
  }
  return ppuArray;
};

export const calculatePpk = (
  dataValues,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let ppkArray = [];
  if (upperSpecLimitValue !== "" && lowerSpecLimitValue !== "") {
    const ppuArray = calculatePpu(dataValues, upperSpecLimitValue);
    const pplArray = calculatePpl(dataValues, lowerSpecLimitValue);
    for (let row = 0; row < dataValues.length; row++) {
      const ppuValue = ppuArray[row];
      const pplValue = pplArray[row];
      if (pplValue < ppuValue) {
        ppkArray.push(pplValue);
      } else {
        ppkArray.push(ppuValue);
      }
    }
  } else if (upperSpecLimitValue !== "" && lowerSpecLimitValue === "") {
    const ppuArray = calculatePpu(dataValues, upperSpecLimitValue);
    ppkArray = ppuArray;
  } else if (upperSpecLimitValue === "" && lowerSpecLimitValue !== "") {
    const pplArray = calculatePpl(dataValues, lowerSpecLimitValue);
    ppkArray = pplArray;
  }
  return ppkArray;
};

export const calculateAvgPpk = (
  dataValues,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let avgPpkArray = [];
  if (upperSpecLimitValue !== "" || lowerSpecLimitValue !== "") {
    const ppkArray = calculatePpk(
      dataValues,
      upperSpecLimitValue,
      lowerSpecLimitValue
    );
    let totalPpk = 0;
    for (let row = 1; row < dataValues.length; row++) {
      totalPpk = totalPpk + ppkArray[row];
    }
    const avgPpk = totalPpk / (dataValues.length - 1);
    avgPpkArray = dataValues.map(() => avgPpk);
  }
  return avgPpkArray;
};

export const calculateCp = (
  dataValues,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let cpArray = [];
  const cumulEstStdArray = calculateCumulativeAvgEstimatedStdDev(dataValues);
  if (upperSpecLimitValue !== "" && lowerSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      if (row === 0) {
        cpArray.push("");
      } else {
        cpArray.push(
          Number(
            (upperSpecLimitValue - lowerSpecLimitValue) /
              (6 * cumulEstStdArray[row])
          )
        );
      }
    }
  }
  return cpArray;
};

export const calculatePp = (
  dataValues,
  upperSpecLimitValue,
  lowerSpecLimitValue
) => {
  let ppArray = [];
  const stdDevArray = sampleStdDev(dataValues);
  if (upperSpecLimitValue !== "" && lowerSpecLimitValue !== "") {
    for (let row = 0; row < dataValues.length; row++) {
      if (row === 0) {
        ppArray.push("");
      } else {
        ppArray.push(
          Number(
            (upperSpecLimitValue - lowerSpecLimitValue) / (6 * stdDevArray[row])
          )
        );
        /* ppArray.push(
          Number(
            (
              (upperSpecLimitValue - lowerSpecLimitValue) /
              (6 * stdDevArray[row])
            ).toFixed(3)
          )
        ); */
      }
    }
  }
  return ppArray;
};

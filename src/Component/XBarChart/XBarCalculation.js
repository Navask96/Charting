export const xBarChartCalculation = (
  values,
  lowerSpecLimit,
  upperSpecLimit
) => {
  // Create value object for calculation
  const calculatedValues = values.map((value) => ({
    id: value?.id || "",
    reference1: value?.reference1 || "",
    reference2: value?.reference2 || "",
    value: value?.values || "",
    note:value?.note||""
  }));

  // Convert value object to array
  let valuesArray = [];
  for (let a = 0; a < values.length; a++) {
    let subValues = [];
    for (
      let group = 1;
      group <= Object.keys(values[a].values).length;
      group++
    ) {
      const propertyName = "x" + group;
      subValues.push(values[a].values[propertyName]);
    }
    valuesArray.push(subValues);
  }
  const subgroupSize = valuesArray[0].length;

  // Calculate Moving range
  for (let a1 = 0; a1 < valuesArray.length; a1++) {
    calculatedValues[a1].movingRange =
      Math.max(...valuesArray[a1]) - Math.min(...valuesArray[a1]);
  }

  // Calculate average
  for (let a2 = 0; a2 < valuesArray.length; a2++) {
    const sum = valuesArray[a2].reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    calculatedValues[a2].average = Number(
      (sum / valuesArray[a2].length).toFixed(3)
    );
  }

  // Calculate cumilative grand average
  for (let a3 = 0; a3 < valuesArray.length; a3++) {
    const cumilativeAvarage = (n) => {
      if (n === 0) {
        return calculatedValues[n].average;
      } else {
        return calculatedValues[n].average + cumilativeAvarage(n - 1);
      }
    };
    calculatedValues[a3].cumulGrandAvg = Number(
      (cumilativeAvarage(a3) / (a3 + 1)).toFixed(3)
    );
  }

  // Cumilative average range
  for (let a4 = 0; a4 < valuesArray.length; a4++) {
    const cumulMR = (n2) => {
      if (n2 === 0) {
        return calculatedValues[n2].movingRange;
      } else {
        return calculatedValues[n2].movingRange + cumulMR(n2 - 1);
      }
    };
    calculatedValues[a4].cumulAvgR = Number(
      (cumulMR(a4) / (a4 + 1)).toFixed(3)
    );
  }

  // Calculate cumilative estimated standad daviation
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
  for (let a5 = 0; a5 < valuesArray.length; a5++) {
    calculatedValues[a5].cumulEstSd = Number(
      (calculatedValues[a5].cumulAvgR / d2(subgroupSize)).toFixed(3)
    );
  }

  // Sample standard deviation
  //resource https://sixsigmastudyguide.com/x-bar-s-chart/
  for (let a6 = 0; a6 < valuesArray.length; a6++) {
    const sumOfSquaredDifferencesCal = (n3) => {
      if (n3 === 0) {
        return (valuesArray[a6][0] - calculatedValues[a6].average) ** 2;
      } else {
        return (
          (valuesArray[a6][n3] - calculatedValues[a6].average) ** 2 +
          sumOfSquaredDifferencesCal(n3 - 1)
        );
      }
    };
    const sumOfSquaredDifferences = sumOfSquaredDifferencesCal(
      subgroupSize - 1
    );
    const sampleVariance = sumOfSquaredDifferences / (subgroupSize - 1);
    calculatedValues[a6].sampleStdDev = Number(
      Math.sqrt(sampleVariance).toFixed(3)
    );
  }

  // Avg UCL
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
  for (let a7 = 0; a7 < valuesArray.length; a7++) {
    calculatedValues[a7].avgUCL = Number(
      (
        calculatedValues[a7].cumulGrandAvg +
        a2(subgroupSize) * calculatedValues[a7].cumulAvgR
      ).toFixed(3)
    );
  }
  // Average LCL
  for (let a8 = 0; a8 < valuesArray.length; a8++) {
    calculatedValues[a8].avgLCL = Number(
      (
        calculatedValues[a8].cumulGrandAvg -
        a2(subgroupSize) * calculatedValues[a8].cumulAvgR
      ).toFixed(3)
    );
  }
  // Range UCL
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
  for (let a9 = 0; a9 < valuesArray.length; a9++) {
    calculatedValues[a9].rngUCL = Number(
      (d4(subgroupSize) * calculatedValues[a9].cumulAvgR).toFixed(3)
    );
  }

  // Rng LCL
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
  for (let a10 = 0; a10 < valuesArray.length; a10++) {
    calculatedValues[a10].rngLCL = Number(
      (d3(subgroupSize) * calculatedValues[a10].cumulAvgR).toFixed(3)
    );
  }
  // Calculate CPL
  if (lowerSpecLimit !== "") {
    for (let a11 = 0; a11 < valuesArray.length; a11++) {
      if (a11 === 0) {
        calculatedValues[a11].cPL = "";
      } else {
        calculatedValues[a11].cPL = Number(
          (
            (calculatedValues[a11].cumulGrandAvg - lowerSpecLimit) /
            (3 * calculatedValues[a11].cumulEstSd)
          ).toFixed(3)
        );
      }
    }
  }

  // Calculate CPU
  if (upperSpecLimit !== "") {
    for (let a12 = 0; a12 < valuesArray.length; a12++) {
      if (a12 === 0) {
        calculatedValues[a12].cPU = "";
      } else {
        calculatedValues[a12].cPU = Number(
          (
            (upperSpecLimit - calculatedValues[a12].cumulGrandAvg) /
            (3 * calculatedValues[a12].cumulEstSd)
          ).toFixed(3)
        );
      }
    }
  }

  // Calculate CPK
  let totalCPK = 0;
  if (lowerSpecLimit !== "" || upperSpecLimit !== "") {
    for (let a13 = 0; a13 < valuesArray.length; a13++) {
      if (a13 === 0) {
        calculatedValues[a13].cPK = "";
      } else {
        if (lowerSpecLimit !== "" && upperSpecLimit !== "") {
          calculatedValues[a13].cPK = Math.min(
            calculatedValues[a13].cPU,
            calculatedValues[a13].cPL
          );
          totalCPK =
            totalCPK +
            Math.min(calculatedValues[a13].cPU, calculatedValues[a13].cPL);
        } else if (lowerSpecLimit !== "" && upperSpecLimit === "") {
          calculatedValues[a13].cPK = calculatedValues[a13].cPL;
          totalCPK = totalCPK + calculatedValues[a13].cPL;
        } else {
          calculatedValues[a13].cPK = calculatedValues[a13].cPU;
          totalCPK = totalCPK + calculatedValues[a13].cPU;
        }
      }
    }
  }

  // Calculate average cpk
  if (lowerSpecLimit !== "" || upperSpecLimit !== "") {
    for (let a14 = 0; a14 < valuesArray.length; a14++) {
      if (a14 === 0) {
        calculatedValues[a14].avgCPK = "";
      } else {
        calculatedValues[a14].avgCPK = parseFloat(
          (totalCPK / (valuesArray.length - 1)).toFixed(3)
        );
      }
    }
  }

  // Calculate PPL
  if (lowerSpecLimit !== "") {
    for (let a15 = 0; a15 < valuesArray.length; a15++) {
      if (a15 === 0) {
        calculatedValues[a15].pPL = "";
      } else {
        calculatedValues[a15].pPL = parseFloat(
          (
            (calculatedValues[a15].cumulGrandAvg - lowerSpecLimit) /
            (3 * calculatedValues[a15].sampleStdDev)
          ).toFixed(3)
        );
      }
    }
  }

  // Calculate PPU
  if (upperSpecLimit !== "") {
    for (let a16 = 0; a16 < valuesArray.length; a16++) {
      if (a16 === 0) {
        calculatedValues[a16].pPU = "";
      } else {
        calculatedValues[a16].pPU = parseFloat(
          (
            (upperSpecLimit - calculatedValues[a16].cumulGrandAvg) /
            (3 * calculatedValues[a16].sampleStdDev)
          ).toFixed(3)
        );
      }
    }
  }

  // Calculate PPK
  let totalPPK = 0;
  if ((lowerSpecLimit !== "") & (upperSpecLimit !== "")) {
    for (let a17 = 0; a17 < valuesArray.length; a17++) {
      if (a17 === 0) {
        calculatedValues[a17].pPK = "";
      } else {
        if (lowerSpecLimit !== "" && upperSpecLimit !== "") {
          calculatedValues[a17].pPK = Math.min(
            calculatedValues[a17].pPL,
            calculatedValues[a17].pPU
          );
          totalPPK =
            totalPPK +
            Math.min(calculatedValues[a17].pPL, calculatedValues[a17].pPU);
        } else if (lowerSpecLimit !== "" && upperSpecLimit === "") {
          calculatedValues[a17].pPK = calculatedValues[a17].pPL;
          totalPPK = totalPPK + calculatedValues[a17].pPL;
        } else {
          calculatedValues[a17].pPK = calculatedValues[a17].pPU;
          totalPPK = totalPPK + calculatedValues[a17].pPU;
        }
      }
    }
  }

  // Calculate average PPK
  if (lowerSpecLimit !== "" || upperSpecLimit !== "") {
    for (let a18 = 0; a18 < valuesArray.length; a18++) {
      if (a18 === 0) {
        calculatedValues[a18].avgPPK = "";
      } else {
        calculatedValues[a18].avgPPK = parseFloat(
          (totalPPK / (valuesArray.length - 1)).toFixed(3)
        );
      }
    }
  }

  // Calculated CP
  if (lowerSpecLimit !== "" && upperSpecLimit !== "") {
    for (let a19 = 0; a19 < valuesArray.length; a19++) {
      if (a19 === 0) {
        calculatedValues[a19].cP = "";
      } else {
        calculatedValues[a19].cP = parseFloat(
          (
            (upperSpecLimit - lowerSpecLimit) /
            (6 * calculatedValues[a19].cumulEstSd)
          ).toFixed(3)
        );
      }
    }
  }

  // Calculate PP
  if (lowerSpecLimit !== "" && upperSpecLimit !== "") {
    for (let a20 = 0; a20 < valuesArray.length; a20++) {
      if (a20 === 0) {
        calculatedValues[a20].pP = "";
      } else {
        calculatedValues[a20].pP = parseFloat(
          (
            (upperSpecLimit - lowerSpecLimit) /
            (6 * calculatedValues[a20].sampleStdDev)
          ).toFixed(3)
        );
      }
    }
  }

  return calculatedValues;
};

export const calculation = (values, lowerSpectLimit, upperSpecLimit) => {
  // Create values object for calculation
  const calculatedValues = values.map((value) => ({
    id: value.id,
    label: value.label,
    reference: value.reference,
    value: value.value,
    note: value.note,
  }));
  // Calculate moving range
  for (var i = 0; i < calculatedValues.length; i++) {
    if (i === 0) {
      calculatedValues[i].movingRange = "";
    } else {
      calculatedValues[i].movingRange = Math.abs(
        calculatedValues[i].value - calculatedValues[i - 1].value
      );
    }
  }
  // Calculate cumulative average
  for (var a = 0; a < calculatedValues.length; a++) {
    const cumulative = (a) => {
      if (a === 0) {
        return calculatedValues[a].value;
      }
      return calculatedValues[a].value + cumulative(a - 1);
    };
    calculatedValues[a].cumulAvg = parseFloat(
      (cumulative(a) / (a + 1)).toFixed(3)
    );
  }
  // Calculate cumulative avarage moving range
  for (var b = 0; b < calculatedValues.length; b++) {
    if (b === 0) {
      calculatedValues[b].cumulAvgMr = "";
    } else {
      const cumulativeMr = (b) => {
        if (b === 0) {
          return 0;
        }
        return calculatedValues[b].movingRange + cumulativeMr(b - 1);
      };
      calculatedValues[b].cumulAvgMr = parseFloat(
        (cumulativeMr(b) / b).toFixed(3)
      );
    }
  }
  // Calculate cumulative Est SD
  for (var c = 0; c < calculatedValues.length; c++) {
    if (c === 0) {
      calculatedValues[c].cumulEstSd = "";
    } else {
      calculatedValues[c].cumulEstSd = parseFloat(
        calculatedValues[c].cumulAvgMr / 1.128
      ).toFixed(3);
    }
  }
  // Calculate xUCL value
  for (let a2 = 0; a2 < calculatedValues.length; a2++) {
    if (a2 === 0) {
      calculatedValues[a2].xUCL = "";
    } else {
      calculatedValues[a2].xUCL = parseFloat(
        calculatedValues[a2].cumulAvg + calculatedValues[a2].cumulEstSd * 3
      ).toFixed(3);
    }
  }
  // Calculate x LCL value
  for (let a4 = 0; a4 < calculatedValues.length; a4++) {
    if (a4 === 0) {
      calculatedValues[a4].xLCL = "";
    } else {
      calculatedValues[a4].xLCL = parseFloat(
        calculatedValues[a4].cumulAvg - calculatedValues[a4].cumulEstSd * 3
      ).toFixed(3);
    }
  }
  // Calculate MR UCL value
  for (let a5 = 0; a5 < calculatedValues.length; a5++) {
    if (a5 === 0) {
      calculatedValues[a5].mRUCL = "";
    } else {
      calculatedValues[a5].mRUCL = parseFloat(
        calculatedValues[a5].cumulAvgMr * 3.268
      ).toFixed(3);
    }
  }
  // Calculate CPL value
  if (lowerSpectLimit !== "") {
    for (let a6 = 0; a6 < calculatedValues.length; a6++) {
      if (a6 === 0) {
        calculatedValues[a6].cPL = "";
      } else {
        let cPL = parseFloat(
          (calculatedValues[a6].cumulAvg - lowerSpectLimit) /
            (3 * calculatedValues[a6].cumulEstSd)
        );
        calculatedValues[a6].cPL = Number(cPL.toFixed(3));
      }
    }
  }
  // Calculate CPU calculatedValues
  if (upperSpecLimit !== "") {
    for (let a7 = 0; a7 < calculatedValues.length; a7++) {
      if (a7 === 0) {
        calculatedValues[a7].cPU = "";
      } else {
        let cPU = parseFloat(
          (upperSpecLimit - calculatedValues[a7].cumulAvg) /
            (3 * calculatedValues[a7].cumulEstSd)
        );
        calculatedValues[a7].cPU = Number(cPU.toFixed(3));
      }
    }
  }
  // Calculate CPK value
  let totalCPK = 0;
  if (lowerSpectLimit !== "" || upperSpecLimit !== "") {
    for (let a8 = 0; a8 < calculatedValues.length; a8++) {
      if (a8 === 0) {
        calculatedValues[a8].cPK = "";
      } else {
        if (lowerSpectLimit !== "" && upperSpecLimit !== "") {
          calculatedValues[a8].cPK = Math.min(
            calculatedValues[a8].cPU,
            calculatedValues[a8].cPL
          );
          totalCPK =
            totalCPK +
            Math.min(calculatedValues[a8].cPU, calculatedValues[a8].cPL);
        } else if (lowerSpectLimit !== "" && upperSpecLimit === "") {
          calculatedValues[a8].cPK = calculatedValues[a8].cPL;
          totalCPK = totalCPK + calculatedValues[a8].cPL;
        } else {
          calculatedValues[a8].cPK = calculatedValues[a8].cPU;
          totalCPK = totalCPK + calculatedValues[a8].cPU;
        }
      }
    }
  }
  // Calculate avarage cpk aovroll
  if (lowerSpectLimit !== "" || upperSpecLimit !== "") {
    for (let a9 = 0; a9 < calculatedValues.length; a9++) {
      calculatedValues[a9].avgCPK = parseFloat(
        totalCPK / (calculatedValues.length - 1)
      ).toFixed(3);
    }
  }
  // Calculate the standard deviation
  for (let a10 = 0; a10 < calculatedValues.length; a10++) {
    if (a10 === 0) {
      calculatedValues[a10].stdDev = "";
    } else {
      const total = (n) => {
        if (n === 0) {
          return calculatedValues[n].value;
        } else {
          return calculatedValues[n].value + total(n - 1);
        }
      };
      const mean = total(a10) / (a10 + 1);
      const totalSquaredDifferences = (m) => {
        if (m === 0) {
          return (calculatedValues[m].value - mean) ** 2;
        } else {
          return (
            (calculatedValues[m].value - mean) ** 2 +
            totalSquaredDifferences(m - 1)
          );
        }
      };
      const standardDeviation = parseFloat(
        Math.sqrt(totalSquaredDifferences(a10) / a10)
      );
      calculatedValues[a10].stdDev = Number(standardDeviation.toFixed(3));
    }
  }

  // Calculate PPL
  if (lowerSpectLimit !== "") {
    let pPL = 0;
    for (let a11 = 0; a11 < calculatedValues.length; a11++) {
      if (a11 === 0) {
        calculatedValues[a11].pPL = "";
      } else {
        pPL = parseFloat(
          (calculatedValues[a11].cumulAvg - lowerSpectLimit) /
            (3 * calculatedValues[a11].stdDev)
        );
        calculatedValues[a11].pPL = Number(pPL.toFixed(3));
      }
    }
  }
  // Calculate PPU
  if (upperSpecLimit !== "") {
    let pPU = 0;
    for (let a12 = 0; a12 < calculatedValues.length; a12++) {
      if (a12 === 0) {
        calculatedValues[a12].pPU = "";
      } else {
        pPU = parseFloat(
          (upperSpecLimit - calculatedValues[a12].cumulAvg) /
            (3 * calculatedValues[a12].stdDev)
        );
        calculatedValues[a12].pPU = Number(pPU.toFixed(3));
      }
    }
  }
  // Calculate PPK
  let totalPPK = 0;
  if (lowerSpectLimit !== "" || upperSpecLimit !== "") {
    for (let a13 = 0; a13 < calculatedValues.length; a13++) {
      if (a13 === 0) {
        calculatedValues[a13].pPk = "";
      } else {
        if (lowerSpectLimit !== "" && upperSpecLimit !== "") {
          calculatedValues[a13].pPK = Math.min(
            calculatedValues[a13].pPU,
            calculatedValues[a13].pPL
          );
          totalPPK =
            totalPPK +
            Math.min(calculatedValues[a13].pPU, calculatedValues[a13].pPL);
        } else if (lowerSpectLimit !== "" && upperSpecLimit === "") {
          calculatedValues[a13].pPK = calculatedValues[a13].pPL;
          totalPPK = totalPPK + calculatedValues[a13].pPL;
        } else {
          calculatedValues[a13].pPK = calculatedValues[a13].pPU;
          totalPPK = totalPPK + calculatedValues[a13].pPU;
        }
      }
    }
  }
  // Calculate avarage PPK Overall
  if (lowerSpectLimit !== "" || upperSpecLimit !== "") {
    for (let a14 = 0; a14 < calculatedValues.length; a14++) {
      calculatedValues[a14].avgPPK = parseFloat(
        totalPPK / (calculatedValues.length - 1)
      ).toFixed(3);
    }
  }
  // Calculate CP
  if (lowerSpectLimit !== "" && upperSpecLimit !== "") {
    let calculatedCP = 0;
    for (let a15 = 0; a15 < calculatedValues.length; a15++) {
      if (a15 === 0) {
        calculatedValues[a15].cP = "";
      } else {
        calculatedCP = parseFloat(
          (upperSpecLimit - lowerSpectLimit) /
            (6 * calculatedValues[a15].cumulEstSd)
        );
        calculatedValues[a15].cP = Number(calculatedCP.toFixed(3));
      }
    }
  }
  // Calculate PP
  if (lowerSpectLimit !== "" && upperSpecLimit !== "") {
    let calculatedPP = 0;
    for (let a16 = 0; a16 < calculatedValues.length; a16++) {
      if (a16 === 0) {
        calculatedValues[a16].pP = "";
      } else {
        calculatedPP = parseFloat(
          (upperSpecLimit - lowerSpectLimit) /
            (6 * calculatedValues[a16].stdDev)
        );
        calculatedValues[a16].pP = Number(calculatedPP.toFixed(3));
      }
    }
  }

  return calculatedValues;
};

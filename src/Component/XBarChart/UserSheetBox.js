import React, { useEffect, useState } from "react";
import Sheet from "../../packages/sheet-happens/dist";
import "../../packages/sheet-happens/dist/index.css";
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

export const DEFAULT_CELL_WIDTH = 100;
export const DEFAULT_CELL_HEIGHT = 22;

const initialDataBig = [];
for (let row = 0; row < 1000; row++) {
  const r = [];
  for (let col = 0; col < 100; col++) {
    r.push(`Row: ${row}, Col: ${col}`);
  }
  initialDataBig.push(r);
}

export function SheetBoxHeader() {
  const [data, setData] = useState(initialDataBig);

  const { onColumnOrderChange, onRowOrderChange, getColumnOrder, getRowOrder } =
    useOrderControl();
  const { onCellWidthChange, onCellHeightChange, cellWidth, cellHeight } =
    useWidthHeightControl([], [], getColumnOrder, getRowOrder);

  const onSelectionChanged = (x1, y1, x2, y2) => {};
  const onRightClick = () => {};
  const columnHeaders = ["A", "B", "C"];
  const cellStyle = (x, y) => {
    return {};
  };

  const editData = (x, y) => {
    return data?.[getRowOrder(y)]?.[getColumnOrder(x)];
  };
  const displayData = (x, y) => {
    return data?.[getRowOrder(y)]?.[getColumnOrder(x)];
  };
  const sourceData = (x, y) => {
    return data?.[getRowOrder(y)]?.[getColumnOrder(x)];
  };
  const editKeys = (x, y) => {
    return `${x},${y}`;
  };

  const onChange = (changes) => {
    const newData = [...data];
    for (const change of changes) {
      const cx = getColumnOrder(change.x);
      const cy = getRowOrder(change.y);
      if (!newData[cy]) {
        newData[cy] = [];
      }
      newData[cy][cx] = change.value;
    }
    setData(newData);
  };

  const isReadOnly = (x, y) => {
    return false;
  };

  return (
    <div className="sheet-box">
      <Sheet
        onSelectionChanged={onSelectionChanged}
        onRightClick={onRightClick}
        columnHeaders={columnHeaders}
        cellStyle={cellStyle}
        editData={editData}
        displayData={displayData}
        sourceData={sourceData}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        onChange={onChange}
        readOnly={isReadOnly}
        onCellWidthChange={onCellWidthChange}
        onCellHeightChange={onCellHeightChange}
        onColumnOrderChange={onColumnOrderChange}
        onRowOrderChange={onRowOrderChange}
        editKeys={editKeys}
        cacheLayout
      />
    </div>
  );
}

export function UserSheetBox(props) {
  const { incomingData, onChangeData, columnHeaders, chartProperties } = props;

  const [subgroupSize, setSubgroupSize] = useState(0);
  useEffect(() => {
    setSubgroupSize(props.subgroupSize);
  }, [props.subgroupSize]);

  const [data, setData] = useState(incomingData);
  const { onColumnOrderChange, onRowOrderChange, getColumnOrder, getRowOrder } =
    useOrderControl();
  const { onCellWidthChange, onCellHeightChange, cellWidth, cellHeight } =
    useWidthHeightControl([], [], getColumnOrder, getRowOrder);

  const onSelectionChanged = (x1, y1, x2, y2) => {};
  const onRightClick = () => {};
  //const columnHeaders = props.columnHeaders;
  const cellStyle = (x, y) => {
    return {};
  };

  let displayHeaders = [];
  for (let row = 1; row < 4 + subgroupSize; row++) {
    displayHeaders.push(columnHeaders[row]);
  }

  const editData = (x, y) => {
    return data?.[getRowOrder(y)]?.[columnHeaders.indexOf(displayHeaders[x])];
  };
  const displayData = (x, y) => {
    return data?.[getRowOrder(y)]?.[columnHeaders.indexOf(displayHeaders[x])];
  };
  const sourceData = (x, y) => {
    return data?.[getRowOrder(y)]?.[columnHeaders.indexOf(displayHeaders[x])];
  };

  const onChange = (changes) => {
    const newData = [...data];
    for (const change of changes) {
      const cx = columnHeaders.indexOf(displayHeaders[change.x]);
      const cy = getRowOrder(change.y);
      if (!newData[cy]) {
        newData[cy] = [];
      }
      newData[cy][cx] = change.value;
    }
    onChangeData(newData);

    const averageArray = calculateAverage(
      extractValueColumnDataNaNNull(newData),
      subgroupSize
    );
    const rangeArray = calculateRange(
      extractValueColumnDataNaNNull(newData),
      subgroupSize
    );
    const cumulGrandAvgArray = calculateCumulGrandAvg(
      extractValueColumnDataNaNNull(newData),
      subgroupSize
    );
    const cumulAvgRangeArray = calculateCumulAvgRange(
      extractValueColumnDataNaNNull(newData),
      subgroupSize
    );
    const cumulEstSdArray = calculateCumulEstSd(
      extractValueColumnDataNaNNull(newData),
      subgroupSize
    );
    const sampleStdDevArray = calculateSampleStdDev(
      extractValueColumnDataNaNNull(newData),
      subgroupSize
    );
    const avgUclArray = calculateAvgUcl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lockLimit)
    );
    const avgClArray = calculateAvgCl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lockLimit)
    );
    const avgLclArray = calculateAvgLcl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lockLimit)
    );
    const rngUclArray = calculateRngUcl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lockLimit)
    );
    const rngClArray = calculateRngCl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lockLimit)
    );
    const rngLclArray = calculateRngLcl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lockLimit)
    );
    const cplArray = calculateCpl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const cpuArray = calculateCpu(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue)
    );
    const cpkArray = calculateCpk(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const avgCpkArray = calculateAvgCpk(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const pplArray = calculatePpl(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const ppuArray = calculatePpu(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue)
    );
    const ppkArray = calculatePpk(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const avgPpkArray = calculateAvgPpk(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const cpArray = calculateCp(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const ppArray = calculatePp(
      extractValueColumnDataNaNNull(newData),
      subgroupSize,
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );

    for (let row = 0; row < newData.length; row++) {
      newData[row][4 + subgroupSize] = averageArray[row];
      newData[row][5 + subgroupSize] = rangeArray[row];
      newData[row][6 + subgroupSize] = cumulGrandAvgArray[row];
      newData[row][7 + subgroupSize] = cumulAvgRangeArray[row];
      newData[row][8 + subgroupSize] = cumulEstSdArray[row];
      newData[row][9 + subgroupSize] = sampleStdDevArray[row];
      newData[row][10 + subgroupSize] = avgUclArray[row];
      newData[row][11 + subgroupSize] = avgClArray[row];
      newData[row][12 + subgroupSize] = avgLclArray[row];
      newData[row][13 + subgroupSize] = rngUclArray[row];
      newData[row][14 + subgroupSize] = rngClArray[row];
      newData[row][15 + subgroupSize] = rngLclArray[row];
      newData[row][16 + subgroupSize] = cplArray[row];
      newData[row][17 + subgroupSize] = cpuArray[row];
      newData[row][18 + subgroupSize] = cpkArray[row];
      newData[row][19 + subgroupSize] = avgCpkArray[row];
      newData[row][20 + subgroupSize] = pplArray[row];
      newData[row][21 + subgroupSize] = ppuArray[row];
      newData[row][22 + subgroupSize] = ppkArray[row];
      newData[row][23 + subgroupSize] = avgPpkArray[row];
      newData[row][24 + subgroupSize] = cpArray[row];
      newData[row][25 + subgroupSize] = ppArray[row];
    }
    setData(newData);
  };

  const extractValueColumnDataNaNNull = (data) => {
    const valuesArray = [];
    for (let row = 0; row < data.length; row++) {
      const valueRow = [];
      for (let subValue = 0; subValue < subgroupSize; subValue++) {
        let x = parseFloat(data[row][subValue + 3]);
        if (!isNaN(x) && x !== null) {
          valueRow.push(x);
        }
      }
      valuesArray.push(valueRow);
    }
    return valuesArray;
  };

  const isReadOnly = (x, y) => {
    return false;
  };

  return (
    <div
      style={{ width: "100%", marginTop: "10px", height: "860px" }}
      className="sheet-box"
    >
      <Sheet
        onSelectionChanged={onSelectionChanged}
        onRightClick={onRightClick}
        columnHeaders={displayHeaders}
        cellStyle={cellStyle}
        editData={editData}
        displayData={displayData}
        sourceData={sourceData}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        onChange={onChange}
        readOnly={isReadOnly}
        onCellWidthChange={onCellWidthChange}
        onCellHeightChange={onCellHeightChange}
        onColumnOrderChange={onColumnOrderChange}
        onRowOrderChange={onRowOrderChange}
        cacheLayout
      />
    </div>
  );
}

export function useWidthHeightControl(
  initialWidths = [],
  initialHeights = [],
  getColumnOrder = (i: number) => i,
  getRowOrder = (i: number) => i
) {
  const [cellWidth, setCellWidth] = useState(initialWidths);
  const [cellHeight, setCellHeight] = useState(initialHeights);

  const onCellWidthChange = (indices, newWidth) => {
    const cw = [...cellWidth];
    for (const order of indices) {
      const idx = getColumnOrder(order);
      if (idx > cw.length) {
        for (let i = cw.length; i <= idx; i++) {
          cw.push(DEFAULT_CELL_WIDTH);
        }
      }
      cw[idx] = newWidth;
    }
    setCellWidth(cw);
  };

  const onCellHeightChange = (indices, newHeight) => {
    const ch = [...cellHeight];
    for (const order of indices) {
      const idx = getRowOrder(order);
      if (idx > ch.length) {
        for (let i = ch.length; i <= idx; i++) {
          ch.push(DEFAULT_CELL_HEIGHT);
        }
      }
      ch[idx] = newHeight;
    }
    setCellHeight(ch);
  };

  const cw = (x: number) => cellWidth[getColumnOrder(x)] ?? DEFAULT_CELL_WIDTH;
  const ch = (y: number) => cellHeight[getRowOrder(y)] ?? DEFAULT_CELL_HEIGHT;

  return {
    onCellWidthChange,
    onCellHeightChange,
    cellWidth: cw,
    cellHeight: ch,
  };
}

export function useOrderControl(initialColumns = [], initialRows = []) {
  const [columnOrder, setColumnOrder] = useState(initialColumns);
  const [rowOrder, setRowOrder] = useState(initialRows);

  const getColumnOrder = (x: number) => columnOrder[x] ?? x;
  const getRowOrder = (y: number) => rowOrder[y] ?? y;

  const onColumnOrderChange = (indices: number[], order: number) => {
    const co = [...columnOrder];

    const min = indices[0];
    const n = Math.max(
      order + indices.length,
      indices.reduce((a, b) => Math.max(a, b))
    );
    while (co.length < n) co.push(co.length);

    co.splice(min, indices.length);
    co.splice(order, 0, ...indices.map((i) => getColumnOrder(i)));
    setColumnOrder(co);
  };

  const onRowOrderChange = (indices: number[], order: number) => {
    const ro = [...rowOrder];

    const min = indices[0];
    const n = Math.max(
      order + indices.length,
      indices.reduce((a, b) => Math.max(a, b))
    );
    while (ro.length < n) ro.push(ro.length);

    ro.splice(min, indices.length);
    ro.splice(order, 0, ...indices.map((i) => getRowOrder(i)));
    setRowOrder(ro);
  };

  return { getColumnOrder, getRowOrder, onColumnOrderChange, onRowOrderChange };
}

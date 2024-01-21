import React, { useState } from "react";
import Sheet from "../../packages/sheet-happens/dist";
import "../../packages/sheet-happens/dist/index.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import {
  calculateMovingRange,
  calculateCumulativeAvgMovingRange,
  calculateCumulativeAvgEstimatedStdDev,
  calculateXUCLIndividualChart,
  calculateXCL,
  calculateXLCL,
  calculateMRUCLArray,
  calculateMRCLArray,
  calculateCPUArray,
  calculateCPLArray,
  calculateCpkArray,
  averageCPK,
  sampleStdDev,
  calculatePpl,
  calculatePpu,
  calculatePpk,
  calculateAvgPpk,
  calculateCp,
  calculatePp,
  calculateCumulAvg,
} from "./calculationsNew";

export const DEFAULT_CELL_WIDTH = 100;
export const DEFAULT_CELL_HEIGHT = 22;

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

export function UserSheetBox(props) {
  const { incomingData, onChangeData, chartProperties, columnHeaders } = props;

  const [data, setData] = useState(incomingData);
  const { onColumnOrderChange, onRowOrderChange, getColumnOrder, getRowOrder } =
    useOrderControl();
  const { onCellWidthChange, onCellHeightChange, cellWidth, cellHeight } =
    useWidthHeightControl([], [], getColumnOrder, getRowOrder);

  const cellStyle = (x, y) => {
    return {};
  };

  let displayHeaders = [];
  for (let row = 1; row < 5; row++) {
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

  React.useEffect(() => {
    setData(incomingData);
  }, [incomingData]);

  const onChange = (changes) => {
    var newData = [...data];
    for (const change of changes) {
      const cx = columnHeaders.indexOf(displayHeaders[change.x]);
      const cy = getRowOrder(change.y);
      if (!newData[cy]) {
        newData[cy] = [];
      }
      newData[cy][cx] = change.value;
    }

    const filteredNewData = newData
      .filter((row) => row !== null)
      .map((row) =>
        row.map((value) => (value === null || value === "" ? "" : value))
      );

    newData = filteredNewData;
    // Call the provided onChangeData function with the updated data
    onChangeData(filteredNewData);

    const movingRange = calculateMovingRange(
      extractValueColumnDataNaNNull(newData)
    );
    const cumulAvg = calculateCumulAvg(extractValueColumnDataNaNNull(newData));

    const CAMR = calculateCumulativeAvgMovingRange(
      extractValueColumnDataNaNNull(newData)
    );
    const CASD = calculateCumulativeAvgEstimatedStdDev(
      extractValueColumnDataNaNNull(newData)
    );
    const CXUCL = calculateXUCLIndividualChart(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.lockLimit)
    );
    const XCL = calculateXCL(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.lockLimit)
    );
    const XLCL = calculateXLCL(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.lockLimit)
    );
    const MRUCL = calculateMRUCLArray(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.lockLimit)
    );
    const MRCL = calculateMRCLArray(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.lockLimit)
    );
    const CPU = calculateCPUArray(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue)
    );
    const CPL = calculateCPLArray(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const CPK = calculateCpkArray(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const AVGCPK = averageCPK(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const SSTD = sampleStdDev(extractValueColumnDataNaNNull(newData));
    const calculatePplArray = calculatePpl(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const calculatePpuArray = calculatePpu(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue)
    );
    const calculatePpkArray = calculatePpk(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const calculateAvgPpkArray = calculateAvgPpk(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const calculateCpArray = calculateCp(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );
    const calculatePpArray = calculatePp(
      extractValueColumnDataNaNNull(newData),
      parseFloat(chartProperties.upperSpecLimitValue),
      parseFloat(chartProperties.lowerSpecLimitValue)
    );

    for (let row = 0; row < newData.length; row++) {
      newData[row][5] = movingRange[row];
      newData[row][6] = cumulAvg[row];
      newData[row][7] = CAMR[row];
      newData[row][8] = CASD[row];
      newData[row][9] = CXUCL[row];
      newData[row][10] = XCL[row];
      newData[row][11] = XLCL[row];
      newData[row][12] = MRUCL[row];
      newData[row][13] = MRCL[row];
      newData[row][14] = CPU[row];
      newData[row][15] = CPL[row];
      newData[row][16] = CPK[row];
      newData[row][17] = AVGCPK[row];
      newData[row][18] = SSTD[row];
      newData[row][19] = calculatePplArray[row];
      newData[row][20] = calculatePpuArray[row];
      newData[row][21] = calculatePpkArray[row];
      newData[row][22] = calculateAvgPpkArray[row];
      newData[row][23] = calculateCpArray[row];
      newData[row][24] = calculatePpArray[row];
    }

    setData(newData);
    console.log(newData);
  };

  const extractValueColumnDataNaNNull = (data) => {
    const valueColumnIndex = columnHeaders.indexOf("Value");
    const valuesArray = [];
    const filteredDataArray = data.filter((row) => row !== null);
    for (let row = 0; row < filteredDataArray.length; row++) {
      if (filteredDataArray[row] !== null) {
        const value = parseFloat(filteredDataArray[row][valueColumnIndex]);
        if (!isNaN(value)) {
          valuesArray.push(value);
        }
      }
    }
    return valuesArray;
  };

  const isReadOnly = (x, y) => {
    return false;
  };

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const onAddRowAbove = () => {
    console.log(selectedRow);
    if (selectedRow !== null) {
      const newRow = [null, null, null, 0];
      setData((prevData) => [
        ...prevData.slice(0, selectedRow),
        newRow,
        ...prevData.slice(selectedRow),
      ]);
    }
    setContextMenuVisible(false);
  };

  const onAddRowBelow = () => {
    if (selectedRow !== null) {
      const newRow = [null, null, null, 0];
      setData((prevData) => [
        ...prevData.slice(0, selectedRow + 1),
        newRow,
        ...prevData.slice(selectedRow + 1),
      ]);
    }
    setContextMenuVisible(false);
  };

  const onSelectionChanged = (x1, y1, x2, y2) => {
    if (x1 !== x2 && y1 !== y2) {
      console.log("Multiple Selection");
    } else {
      console.log("Cell Selection");
    }
  };

  const onDeleteSelectedRow = () => {
    console.log(selectedRow);
    if (selectedRow !== null) {
      setData((prevData) => [
        ...prevData.slice(0, selectedRow),
        ...prevData.slice(selectedRow + 1),
      ]);
      setSelectedRow(null);
    }
    setContextMenuVisible(false);
  };

  const onCopy = () => {
    // Copy the selected row or cells logic
    setContextMenuVisible(false);
  };

  const onRightClick = (e) => {
    console.log(e);
    const clickedRowIndex = e.cellY;
    console.log(clickedRowIndex);
    setSelectedRow(clickedRowIndex);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
    openDialog();
  };

  React.useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    // Attach the event listener when the component mounts
    document.addEventListener("contextmenu", disableContextMenu);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  return (
    <div
      style={{ width: "100%", marginTop: "10px", height: "860px" }}
      className="sheet-box"
    >
      {contextMenuVisible && (
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogContent>
            <DialogContentText>Select an action:</DialogContentText>
            <br />
            <Button onClick={onAddRowAbove}>Add Row Above</Button> <br></br>
            <Button onClick={onAddRowBelow}>Add Row Below</Button> <br></br>
            <Button onClick={onDeleteSelectedRow}>
              Delete Selected Row
            </Button>{" "}
            <br></br>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Sheet
        onSelectionChanged={onSelectionChanged}
        onRightClick={(e) => onRightClick(e)}
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
        //inputComponent={CustomInput}
        cacheLayout
      />
    </div>
  );
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

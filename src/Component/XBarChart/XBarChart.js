import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import Spreadsheet, {
  EmptySelection,
  PointRange,
  RangeSelection,
} from "react-spreadsheet";
import {
  addNewRow,
  calculateAndCreateXBarTableData,
  createXBarDisplayHeaders,
  createSpreadSheetTableData,
  getValuesWithoutNull,
  removeRow,
} from "./xBarTableHelpFunction";

const XBarTable = (props) => {
  const {
    chartProperties,
    onChangeTable,
    incomingData,
    columnHeaders,
    subgroupSize,
    role,
    apiCall,
    setApiCall,
  } = props;

  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [displayHeaders, setDisplayHeaders] = useState([]);
  //const [lockLimit, setLockLimit] = useState(0);
  /* const [isBackspace, setIsBackspace] = useState(false);
  const [isPaste, setIsPaste] = useState(false); */
  const [selected, setSelected] = useState(new EmptySelection());

  useEffect(() => {
    // Create column headers
    const createdDisplayHeaders = createXBarDisplayHeaders(
      columnHeaders,
      subgroupSize,
      parseFloat(chartProperties.lowerSpecLimitValue),
      parseFloat(chartProperties.upperSpecLimitValue),
      role
    );
    setDisplayHeaders(createdDisplayHeaders);
  }, [columnHeaders, chartProperties, subgroupSize, role]);

  useEffect(() => {
    if (incomingData.length === 0) {
      let emptyRow = [false, "", "", ""];
      for (let cell = 0; cell < subgroupSize; cell++) {
        emptyRow.push("");
      }
      let emptyRows = [];
      for (let row = 0; row < 50; row++) {
        emptyRows.push(emptyRow);
      }
      setData(emptyRows);
    } else {
      const dataFromDb = incomingData.map((row, index) => {
        const sliceIndex = 4 + subgroupSize;
        let newRow = [];
        for (let cell = 0; cell < sliceIndex; cell++) {
          newRow.push(
            row[cell] === null || row[cell] === "undefined" ? "" : row[cell]
          );
          /* if (cell === 0) {
            if (
              row[cell] === null ||
              row[cell] === "undefined" ||
              row[cell] === false
            ) {
              newRow.push(false);
            } else {
              newRow.push(true);
              setLockLimit(index + 1);
            }
          } else {
            newRow.push(
              row[cell] === null || row[cell] === "undefined" ? "" : row[cell]
            );
          } */
        }
        return newRow;
      });
      setData(dataFromDb);
    }
  }, [incomingData, subgroupSize]);

  useEffect(() => {
    const userEnteredData = data.map((row) => row?.slice(0, 4 + subgroupSize));
    const calculatedTableData = calculateAndCreateXBarTableData(
      userEnteredData,
      subgroupSize,
      parseFloat(chartProperties.lockLimit),
      parseFloat(chartProperties.lowerSpecLimitValue),
      parseFloat(chartProperties.upperSpecLimitValue)
    );
    // Set table data for spread sheet
    const editedColumnHeaders = columnHeaders.map((column, index) => {
      let newColumn = "";
      if (index === 1) {
        newColumn = column + "(Appears on Chart)";
      } else {
        newColumn = column;
      }
      return newColumn;
    });
    const tableDataForSpreadSheet = createSpreadSheetTableData(
      calculatedTableData,
      subgroupSize,
      editedColumnHeaders,
      displayHeaders
    );
    setTableData(tableDataForSpreadSheet);
  }, [data, displayHeaders, chartProperties, columnHeaders, subgroupSize]);

  // Handle mouse click
  const [rightClickMenuOpen, setRightClickMenuOpen] = useState(false);
  const handleMouseClick = (e) => {
    e.preventDefault();
    if (e.button === 2 && activeCellValues.row !== undefined) {
      setRightClickMenuOpen(true);
    }
  };

  const addRowAbove = () => {
    const place = "above";
    const dataWithNewRow = addNewRow(
      data,
      subgroupSize,
      activeCellValues.row,
      place
    );
    const newData = [...dataWithNewRow];
    onChangeTable(newData);
    setRightClickMenuOpen(false);
  };
  const addRowBelow = () => {
    const place = "below";
    const dataWithNewRow = addNewRow(
      data,
      subgroupSize,
      activeCellValues.row,
      place
    );
    const newData = [...dataWithNewRow];
    onChangeTable(newData);
    setRightClickMenuOpen(false);
  };
  const deleteRow = () => {
    const newDataAfterDeleteRow = removeRow(data, activeCellValues.row);
    const newData = [...newDataAfterDeleteRow];
    onChangeTable(newData);
    setRightClickMenuOpen(false);
  };

  // Active cell function
  const [activeCellValues, setActiveCellValues] = useState({});

  const activeCell = (e) => {
    /*  if (e.column === 0) {
      const lockLimitData = data.map((row, rowIndex) => {
        if (rowIndex === e.row) {
          row[0] = true;
        } else {
          row[0] = false;
        }
        return row;
      });
      onChangeTable(lockLimitData);
      setLockLimit(e.row + 1);
    } */
    setActiveCellValues(e);
  };

  // Keyboard function
  const keyBoardFunction = (key) => {
    setApiCall(false);
    if (key.code === "ArrowDown") {
      const pointRange = new PointRange(
        { row: activeCellValues.row + 1, column: activeCellValues.column },
        { row: activeCellValues.row + 1, column: activeCellValues.column }
      );
      setSelected(new RangeSelection(pointRange));
    } else if (key.code === "ArrowRight") {
      const pointRange = new PointRange(
        { row: activeCellValues.row, column: activeCellValues.column + 1 },
        { row: activeCellValues.row, column: activeCellValues.column + 1 }
      );
      setSelected(new RangeSelection(pointRange));
    } else if (key.code === "ArrowLeft") {
      const pointRange = new PointRange(
        { row: activeCellValues.row, column: activeCellValues.column - 1 },
        { row: activeCellValues.row, column: activeCellValues.column - 1 }
      );
      setSelected(new RangeSelection(pointRange));
    } else if (key.code === "ArrowUp") {
      const pointRange = new PointRange(
        { row: activeCellValues.row - 1, column: activeCellValues.column },
        { row: activeCellValues.row - 1, column: activeCellValues.column }
      );
      setSelected(new RangeSelection(pointRange));
    }
    /* if (key.code === "Backspace") {
      setIsBackspace(true);
    } else if (key.ctrlKey === true && key.code === "KeyV") {
      setIsPaste(true);
    } */
  };

  // Get change data
  const changeOnTable = (newData) => {
    const changedData = [...newData];
    let userEnteredData = changedData.map((row, index) => {
      let rowValues = [];
      for (let cell = 0; cell < 4 + subgroupSize; cell++) {
        rowValues.push(row[cell]?.value);
        /* if (cell === 0) {
          if (index === lockLimit - 1) {
            rowValues.push(true);
          } else {
            rowValues.push(false);
          }
        } else {
          rowValues.push(row[cell]?.value);
        } */
      }
      return rowValues;
    });
    userEnteredData = userEnteredData.map((row) => {
      row.unshift(false);
      return row;
    });

    if (!apiCall) {
      onChangeTable(userEnteredData);
    }
    /* if (isBackspace) {
      onChangeTable(userEnteredData);
      setIsBackspace(false);
    } else if (isPaste) {
      onChangeTable(userEnteredData);
      setIsPaste(false);
    } */
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        onClick={handleMouseClick}
        onContextMenu={handleMouseClick}
      >
        <div
          style={{
            width: "90%",
            maxHeight: "800px", // Adjust the maximum height as needed
            overflow: "auto",
          }}
        >
          {rightClickMenuOpen && (
            <Dialog
              open={rightClickMenuOpen}
              onClose={() => setRightClickMenuOpen(false)}
            >
              <DialogContent>
                <DialogContentText>Select an action</DialogContentText>
                <br />
                <Button onClick={addRowAbove}>Add Row Above</Button>
                <br />
                <Button onClick={addRowBelow}>Add Row Below</Button>
                <br />
                <Button onClick={deleteRow}>Delete Selected Row</Button>
                <br />
                <Button
                  onClick={() => setRightClickMenuOpen(false)}
                  color="primary"
                >
                  Close
                </Button>
                <br />
              </DialogContent>
            </Dialog>
          )}
          <Spreadsheet
            columnLabels={displayHeaders}
            data={tableData}
            onActivate={(e) => activeCell(e)}
            onKeyDown={(key) => keyBoardFunction(key)}
            onChange={(newData) => changeOnTable(newData)}
            selected={selected}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default XBarTable;

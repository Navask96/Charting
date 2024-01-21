// With handsontable component
import { useEffect, useState } from "react";
import {
  calculateAndCreateTableData,
  createColumnNames,
} from "./hansontableFunction";
import { HotTable } from "@handsontable-pro/react";

const XBarTableTemp = (props) => {
  const {
    chartProperties,
    onChangeTable,
    incomingData,
    columnHeaders,
    subgroupSize,
    role,
  } = props;

  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [lockLimit, setLockLimit] = useState(0);

  useEffect(() => {
    incomingData.forEach((row, index) => {
      if (row[0] === true) {
        setLockLimit(index + 1);
      }
    });
    setData(incomingData);
  }, [incomingData]);

  useEffect(() => {
    const preparedColumnNames = createColumnNames(
      columnHeaders,
      subgroupSize,
      parseFloat(chartProperties.lowerSpecLimitValue),
      parseFloat(chartProperties.upperSpecLimitValue),
      role
    );
    setColumnNames(preparedColumnNames);
  }, [columnHeaders, chartProperties, role]);

  useEffect(() => {
    const userEnteredData = data.map((row) => row.slice(0, 4 + subgroupSize));
    const tableArray = calculateAndCreateTableData(
      lockLimit,
      parseFloat(chartProperties.lowerSpecLimitValue),
      parseFloat(chartProperties.upperSpecLimitValue),
      userEnteredData,
      subgroupSize
    );
    setTableData(tableArray);
  }, [chartProperties, data, lockLimit]);

  const handleAfterChange = (changes, source) => {
    const updatedData = tableData.map((row) => {
      let newRow = [];
      for (let cell = 0; cell < 4 + subgroupSize; cell++) {
        if (cell === 0 && row[cell] === null) {
          newRow.push(false);
        } else if (row[cell] === null) {
          newRow.push("");
        } else {
          newRow.push(row[cell]);
        }
      }
      return newRow;
    });
    if (source === "edit") {
      setData(updatedData);
      onChangeTable(updatedData);
    }
  };

  const handleAfterSelection = (r, c, r2, c2) => {
    if (r === r2 && c === c2 && c === 0) {
      const newData = data.map((row, index) => {
        if (r === index) {
          row[0] = true;
        } else {
          row[0] = false;
        }
        return row;
      });
      setData(newData);
      setLockLimit(r + 1);
    }
  };

  return (
    <HotTable
      width={"80%"}
      height={800}
      data={tableData}
      columns={columnNames}
      colHeaders={true}
      rowHeaders={true}
      afterChange={handleAfterChange}
      afterSelection={handleAfterSelection}
      contextMenu={["row_above", "row_below", "remove_row"]}
    ></HotTable>
  );
};

export default XBarTableTemp;

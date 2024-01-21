import React, { useState } from "react";
import { SheetBoxBasic } from "./SheetBox";

export default function XBarChartTest(props) {
  const { chartId, onChangeTable, tableData, chartProperties } = props;
  const [data, setData] = useState(tableData);

  const onChangeData = (changes) => {
    onChangeTable(changes);
  };

  return (
    <SheetBoxBasic
      chartId={chartId}
      incomingData={data}
      onChangeData={onChangeData}
      columnHeaders={props.columnHeaders}
      subgroupSize={props.subgroupSize}
      chartProperties={chartProperties}
    />
  );
}

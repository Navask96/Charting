import React, { useState } from "react";
import { UserSheetBox } from "./UserSheetBox";

export default function XBarUserTable(props) {
  const { chartId, onChangeTable, tableData, chartProperties } = props;
  const [data, setData] = useState(tableData);

  const onChangeData = (changes) => {
    onChangeTable(changes);
  };

  return (
    <UserSheetBox
      chartId={chartId}
      incomingData={data}
      onChangeData={onChangeData}
      columnHeaders={props.columnHeaders}
      subgroupSize={props.subgroupSize}
      chartProperties={chartProperties}
    />
  );
}

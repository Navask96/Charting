import React, { useState } from "react";
import "../../packages/sheet-happens/dist/index.css";
import { UserSheetBox } from "./UserSheetBox";

export default function XmrUserTable(props) {
  const { chartId, onChangeTable, tableData, chartProperties, columnHeaders } =
    props;
  const [data, setData] = useState(tableData);

  React.useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const onChangeData = (changes) => {
    onChangeTable(changes);
  };

  return (
    <>
      <UserSheetBox
        chartId={chartId}
        incomingData={data}
        onChangeData={onChangeData}
        chartProperties={chartProperties}
        columnHeaders={columnHeaders}
      />
    </>
  );
}

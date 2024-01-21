import React, { useState } from "react";
import "../../packages/sheet-happens/dist/index.css";
import { SheetBoxBasic } from "./SheetBox";

export default function XMrChartTest(props) {
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
      <SheetBoxBasic
        chartId={chartId}
        incomingData={data}
        onChangeData={onChangeData}
        chartProperties={chartProperties}
        columnHeaders={columnHeaders}
      />
    </>
  );
}

import { useEffect } from "react";
import * as JSC from "jscharting";

import "./App.css";
import { FormValue } from "./Form";

interface ChartProps {
  values: FormValue[];
}

export const Chart = ({ values }: ChartProps) => {
  useEffect(() => {
    const points = values.map((v) => ({
      name: v.title,
      y: Number(v.value),
    }));

    let chart2: JSC.Chart;
    setTimeout(() => {
      chart2 = new JSC.Chart("myChart2", {
        type: "column",
        legend: {
          template: "%value {%percentOfTotal:n1}% %icon %name",
          position: "inside left bottom",
        },
        defaultSeries: {
          type: "pie",
          pointSelection: true,
        },
        defaultTooltip: {
          enabled: false,
        },
        defaultPoint: {
          label: {
            text: "<b>%name</b><br/>%yValue<br/>%percentOfTotal%",
            placement: "outside",
          },
        },
        series: [
          {
            name: "Assets",
            points,
          },
        ],
      });
    });

    return () => {
      chart2?.destroy();
    };
  }, [values]);

  return (
    <>
      <div id="myChart2" style={{ width: "100%", minWidth: "600px", height: "600px" }} />
    </>
  );
};

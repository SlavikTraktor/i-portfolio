import { useEffect } from "react";

import ChartJS from "chart.js/auto";
import "./App.css";
import { FormValue } from "./Form";

interface ChartProps {
  values: FormValue[];
}

export const Chart = ({ values }: ChartProps) => {
  useEffect(() => {
    const xValues = values.map((v) => v.title);
    const yValues = values.map((v) => v.value);
    const barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

    const myChart = new ChartJS("myChart", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [values]);

  return (
    <>
      <canvas id="myChart" style={{ width: "100%", maxWidth: "600px" }} />
    </>
  );
};

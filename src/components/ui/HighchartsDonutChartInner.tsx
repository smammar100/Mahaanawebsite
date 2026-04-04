"use client";

import { useMemo } from "react";
import Highcharts from "highcharts";
import type { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

export interface HighchartsDonutChartInnerProps {
  data: DonutDatum[];
  ariaLabel: string;
}

export function HighchartsDonutChartInner({
  data,
  ariaLabel,
}: HighchartsDonutChartInnerProps) {
  const options: Options = useMemo(
    () => ({
      chart: {
        type: "pie",
        backgroundColor: "transparent",
        spacing: [0, 0, 0, 0],
        style: { fontFamily: "inherit" },
      },
      title: { text: undefined },
      credits: { enabled: false },
      tooltip: { enabled: false },
      legend: { enabled: false },
      accessibility: { enabled: true, description: ariaLabel },
      plotOptions: {
        pie: {
          dataLabels: { enabled: false },
          borderColor: "var(--color-surface-bg)",
          borderWidth: 6,
          innerSize: "72%",
          startAngle: 90,
          endAngle: -270,
          slicedOffset: 0,
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1,
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "projection",
          data: data.map((item) => ({
            name: item.name,
            y: item.value,
            color: item.color,
          })),
        },
      ],
    }),
    [ariaLabel, data]
  );

  return (
    <div className="h-full w-full" role="img" aria-label={ariaLabel}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: "h-full w-full" }}
      />
    </div>
  );
}

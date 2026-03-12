"use client";

import { useId } from "react";
import { useState } from "react";
import Highcharts from "highcharts";
import type { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Cell, Pie, PieChart } from "recharts";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, H4, TextMedium, TextSmall } from "@/components/ui/Typography";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const ASSET_COLORS = {
  bankDeposits: "var(--color-info-200)",
  musharaka: "var(--color-teal-200)",
  govtSecurities: "var(--color-error-200)",
  shortTermSukuk: "var(--color-warning-200)",
  baiMuajjal: "var(--color-primary-200)",
  otherAssets: "var(--color-info-150)",
} as const;

const ASSET_ALLOCATION_ROWS = [
  { item: "Bank Deposits", currentMonth: "14.61%", previousMonth: "37.53%", color: ASSET_COLORS.bankDeposits },
  { item: "Musharaka", currentMonth: "18.00%", previousMonth: "12.00%", color: ASSET_COLORS.musharaka },
  { item: "Govt Securities (GOP ijarah)", currentMonth: "22.00%", previousMonth: "8.00%", color: ASSET_COLORS.govtSecurities },
  { item: "Short Term Sukuk", currentMonth: "20.00%", previousMonth: "15.00%", color: ASSET_COLORS.shortTermSukuk },
  { item: "Bai Muajjal", currentMonth: "12.00%", previousMonth: "10.00%", color: ASSET_COLORS.baiMuajjal },
  { item: "Other Assets", currentMonth: "13.39%", previousMonth: "17.47%", color: ASSET_COLORS.otherAssets },
];

/** Highcharts column chart options — preserved margins (10, 12, 8, 60) from original Recharts BarChart */
const assetAllocationColumnChartOptions: Options = {
  chart: {
    type: "column",
    backgroundColor: "transparent",
    spacing: [16, 16, 16, 16],
    marginTop: 10,
    marginRight: 12,
    marginLeft: 8,
    marginBottom: 60,
    reflow: true,
    animation: { duration: 600 },
    height: null,
    style: { fontFamily: "inherit" },
  },
  title: {
    text: "Asset Allocation",
    align: "left",
    style: {
      fontSize: "18px",
      fontWeight: "600",
      color: "var(--color-text-primary)",
    },
  },
  subtitle: {
    text: "Current month vs previous month by category",
    align: "left",
    style: {
      fontSize: "13px",
      color: "var(--color-text-tertiary)",
    },
  },
  xAxis: {
    categories: [
      "Bank Deposits",
      "Musharaka",
      "Govt Securities (GOP ijarah)",
      "Short Term Sukuk",
      "Bai Muajjal",
      "Other Assets",
    ],
    crosshair: true,
    accessibility: { description: "Asset categories" },
    startOnTick: false,
    endOnTick: false,
    minPadding: 0.03,
    maxPadding: 0.03,
    labels: {
      overflow: "justify",
      rotation: -35,
      style: {
        fontSize: "12px",
        color: "var(--color-text-secondary)",
      },
    },
    lineColor: "transparent",
    tickColor: "transparent",
  },
  yAxis: {
    min: 0,
    title: {
      text: "Percentage (%)",
      style: {
        fontSize: "12px",
        color: "var(--color-text-tertiary)",
      },
    },
    maxPadding: 0.15,
    startOnTick: false,
    endOnTick: false,
    gridLineDashStyle: "Dash",
    gridLineColor: "var(--color-surface-stroke)",
    labels: {
      style: {
        fontSize: "12px",
        color: "var(--color-text-secondary)",
      },
    },
  },
  tooltip: {
    valueSuffix: "%",
    backgroundColor: "var(--color-surface-bg, #fff)",
    borderColor: "var(--color-surface-stroke)",
    borderRadius: 8,
    shadow: {
      color: "rgba(0,0,0,0.08)",
      offsetX: 0,
      offsetY: 4,
      opacity: 1,
      width: 16,
    },
    style: {
      fontSize: "13px",
      color: "var(--color-text-primary)",
    },
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
      borderRadius: 4,
      groupPadding: 0.1,
      dataLabels: { enabled: false },
      states: {
        hover: { brightness: 0.1 },
      },
    },
  },
  series: [
    {
      name: "Previous month",
      data: [37.53, 12, 8, 15, 10, 17.47],
      color: "var(--color-info-200)",
    },
    {
      name: "Current month",
      data: [14.61, 18, 22, 20, 12, 13.39],
      color: "var(--color-teal-200)",
    },
  ],
  legend: {
    enabled: true,
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
    itemDistance: 32,
    margin: 20,
    padding: 8,
    squareSymbol: true,
    symbolRadius: 2,
    itemStyle: {
      fontSize: "13px",
      fontWeight: "500",
      color: "var(--color-text-secondary)",
      cursor: "pointer",
    },
    itemHoverStyle: {
      color: "var(--color-text-primary)",
    },
    symbolWidth: 24,
    symbolHeight: 12,
  },
  credits: { enabled: false },
  responsive: {
    rules: [
      {
        condition: { maxWidth: 640 },
        chartOptions: {
          chart: {
            marginLeft: 56,
            marginBottom: 60,
          },
          yAxis: {
            title: { text: undefined },
            labels: { style: { fontSize: "11px" } },
          },
          xAxis: {
            labels: { style: { fontSize: "11px" }, rotation: -30 },
          },
          legend: {
            itemStyle: { fontSize: "11px" },
            itemDistance: 16,
          },
        },
      },
      {
        condition: { maxWidth: 768 },
        chartOptions: {
          chart: { marginLeft: 60 },
          yAxis: {
            labels: { style: { fontSize: "12px" } },
          },
        },
      },
    ],
  },
  accessibility: { enabled: true },
};

const CREDIT_QUALITY_COLORS = {
  aaa: "var(--color-info-200)",
  aaPlus: "var(--color-teal-200)",
  aa: "var(--color-error-200)",
  a1: "var(--color-warning-200)",
} as const;

const CREDIT_QUALITY_ROWS = [
  { item: "AAA", percentage: "45.68%", color: CREDIT_QUALITY_COLORS.aaa, value: 45.68 },
  { item: "AA+", percentage: "27.98%", color: CREDIT_QUALITY_COLORS.aaPlus, value: 27.98 },
  { item: "AA", percentage: "12.79%", color: CREDIT_QUALITY_COLORS.aa, value: 12.79 },
  { item: "A1", percentage: "13.29%", color: CREDIT_QUALITY_COLORS.a1, value: 13.29 },
];

const creditQualityChartData = CREDIT_QUALITY_ROWS.map((row) => ({
  name: row.item,
  value: row.value,
  fill: row.color,
}));

const creditQualityChartConfig: ChartConfig = Object.fromEntries(
  CREDIT_QUALITY_ROWS.map((row) => [row.item, { label: row.item, color: row.color }])
);

const HOLDINGS_COLORS = {
  sadaqat: "var(--color-info-200)",
  zarea: "var(--color-teal-200)",
  goPetroleum: "var(--color-error-200)",
  other1: "var(--color-warning-200)",
  other2: "var(--color-primary-200)",
  other3: "var(--color-info-150)",
} as const;

const TOP_HOLDINGS_ROWS = [
  { name: "Sadaqat Limited STS 1", percentage: "18.50%", color: HOLDINGS_COLORS.sadaqat, value: 18.5 },
  { name: "Zarea Limited STS 1", percentage: "15.20%", color: HOLDINGS_COLORS.zarea, value: 15.2 },
  { name: "Go Petroleum STS 1", percentage: "12.80%", color: HOLDINGS_COLORS.goPetroleum, value: 12.8 },
  { name: "Other holdings", percentage: "28.40%", color: HOLDINGS_COLORS.other1, value: 28.4 },
  { name: "Other instruments", percentage: "15.10%", color: HOLDINGS_COLORS.other2, value: 15.1 },
  { name: "Additional", percentage: "10.00%", color: HOLDINGS_COLORS.other3, value: 10 },
] as const;

const holdingsChartData = TOP_HOLDINGS_ROWS.map((row) => ({
  name: row.name,
  value: row.value,
  fill: row.color,
}));

const holdingsChartConfig: ChartConfig = Object.fromEntries(
  TOP_HOLDINGS_ROWS.map((row) => [row.name, { label: row.name, color: row.color }])
);

function DonutChart({
  data,
  config,
  ariaLabel,
  onSegmentHover,
}: {
  data: { name: string; value: number; fill: string }[];
  config: ChartConfig;
  ariaLabel: string;
  onSegmentHover: (index: number | null) => void;
}) {
  return (
    <div
      className="flex min-h-0 w-full items-center justify-center lg:min-h-[280px]"
      role="img"
      aria-label={ariaLabel}
    >
      <ChartContainer
        config={config}
        className="aspect-square w-full max-w-[280px]"
      >
        <PieChart>
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0];
              const name = (item.payload as { name?: string }).name ?? item.name;
              const value = Number(item.value).toFixed(2);
              const color = (item.payload as { fill?: string }).fill ?? item.color;
              return (
                <div className="rounded-lg border border-surface-stroke bg-white p-3 shadow-lg">
                  <p className="flex items-center gap-2 text-tiny font-medium text-text-primary">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded"
                      style={{ backgroundColor: color }}
                      aria-hidden
                    />
                    {name}: {value}%
                  </p>
                </div>
              );
            }}
            cursor={false}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="90%"
            strokeWidth={0}
            paddingAngle={0}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={data[index].fill}
                onMouseEnter={() => onSegmentHover(index)}
                onMouseLeave={() => onSegmentHover(null)}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

function AssetAllocationColumnChart() {
  const id = useId().replace(/:/g, "");
  const containerId = `asset-allocation-column-${id}`;
  return (
    <div className="h-full w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={assetAllocationColumnChartOptions}
        containerProps={{
          id: containerId,
          style: { width: "100%", height: "100%" },
        }}
      />
    </div>
  );
}

export function MICFPortfolioSection() {
  const [hoveredCreditIndex, setHoveredCreditIndex] = useState<number | null>(null);
  const [hoveredHoldingsIndex, setHoveredHoldingsIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="micf-portfolio-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="micf-portfolio-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Portfolio
        </H2>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* 1. Asset Allocation: column chart + table */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Asset Allocation
            </H4>
            <div className="flex flex-col gap-6">
              <div
                className="h-56 w-full min-w-0 sm:h-64 lg:h-80 rounded-2xl border border-surface-stroke bg-white p-4 sm:p-6"
                role="img"
                aria-label="Asset allocation: previous month vs current month by category"
              >
                <AssetAllocationColumnChart />
              </div>
              <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
                <table
                  className="w-full min-w-[400px] border-collapse"
                  role="table"
                  aria-label="Asset allocation by category"
                >
                  <thead>
                    <tr>
                      <th scope="col" className="bg-gray-100 px-4 py-4 text-left sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                          Items
                        </TextSmall>
                      </th>
                      <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                          Current month
                        </TextSmall>
                      </th>
                      <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                          Previous month
                        </TextSmall>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ASSET_ALLOCATION_ROWS.map((row) => (
                      <tr key={row.item} className="border-b border-surface-stroke last:border-b-0">
                        <td className="px-4 py-5 sm:px-6">
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3.5 w-3.5 shrink-0 rounded"
                              style={{ backgroundColor: row.color }}
                              aria-hidden
                            />
                            <TextMedium weight="semibold" className="text-text-primary text-base">
                              {row.item}
                            </TextMedium>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-center sm:px-6">
                          <TextMedium weight="semibold" className="text-text-primary text-base">
                            {row.currentMonth}
                          </TextMedium>
                        </td>
                        <td className="px-4 py-5 text-center sm:px-6">
                          <TextMedium weight="semibold" className="text-text-primary text-base">
                            {row.previousMonth}
                          </TextMedium>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 2. Credit quality: table (left) + donut (right) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Credit quality
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
                  <table
                    className="w-full min-w-[320px] border-collapse"
                    role="table"
                    aria-label="Credit quality by rating"
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-left sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Items
                          </TextSmall>
                        </th>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CREDIT_QUALITY_ROWS.map((row, index) => (
                        <tr
                          key={row.item}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredCreditIndex === index && "bg-gray-100"
                          )}
                        >
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium weight="semibold" className="text-text-primary text-base">
                                {row.item}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium weight="semibold" className="text-text-primary text-base">
                              {row.percentage}
                            </TextMedium>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <DonutChart
                  data={creditQualityChartData}
                  config={creditQualityChartConfig}
                  ariaLabel="Credit quality by rating"
                  onSegmentHover={setHoveredCreditIndex}
                />
              </div>
            </div>
          </div>

          {/* 3. Top holdings: donut (left) + table (right) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Top holdings
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <DonutChart
                  data={holdingsChartData}
                  config={holdingsChartConfig}
                  ariaLabel="Top holdings by percentage"
                  onSegmentHover={setHoveredHoldingsIndex}
                />
              </div>
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
                  <table
                    className="w-full min-w-[320px] border-collapse"
                    role="table"
                    aria-label="Top holdings by percentage"
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-left sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Instrument
                          </TextSmall>
                        </th>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOP_HOLDINGS_ROWS.map((row, index) => (
                        <tr
                          key={row.name}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredHoldingsIndex === index && "bg-gray-100"
                          )}
                        >
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium weight="semibold" className="text-text-primary text-base">
                                {row.name}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium weight="semibold" className="text-text-primary text-base">
                              {row.percentage}
                            </TextMedium>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

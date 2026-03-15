"use client";

import { useId, useState, useEffect } from "react";
import type { Options } from "highcharts";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, H4, TextMedium, TextSmall } from "@/components/ui/Typography";
import { HighchartsVariablePieChart } from "@/components/ui/HighchartsVariablePieChart";
import type { MicfPortfolioFundData } from "@/lib/micf-fund-api";
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

/** Highcharts column chart options — margins tuned for visible axis labels and legend */
const assetAllocationColumnChartOptions: Options = {
  chart: {
    type: "column",
    backgroundColor: "transparent",
    spacing: [16, 16, 16, 20],
    marginTop: 60,
    marginRight: 24,
    marginLeft: 88,
    marginBottom: 100,
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
    minPadding: 0.02,
    maxPadding: 0.02,
    labels: {
      overflow: "justify",
      rotation: -45,
      align: "right",
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
      margin: 12,
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
      align: "right",
      x: -8,
      style: {
        fontSize: "12px",
        color: "var(--color-text-secondary)",
      },
    },
  },
  tooltip: {
    valueSuffix: "%",
    valueDecimals: 2,
    backgroundColor: "var(--color-surface-bg)",
    borderColor: "var(--color-surface-stroke)",
    borderRadius: 8,
    shadow: {
      color: "var(--color-gray-900)",
      offsetX: 0,
      offsetY: 4,
      opacity: 0.15,
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
    align: "right",
    verticalAlign: "top",
    layout: "horizontal",
    floating: true,
    x: -16,
    y: 8,
    margin: 0,
    padding: 8,
    itemDistance: 24,
    backgroundColor: "var(--color-surface-card)",
    borderWidth: 0,
    shadow: false,
    itemStyle: {
      fontSize: "13px",
      fontWeight: "500",
      color: "var(--color-text-secondary)",
      cursor: "pointer",
    },
    itemHoverStyle: {
      color: "var(--color-text-primary)",
    },
    symbolWidth: 12,
    symbolHeight: 12,
    squareSymbol: true,
    symbolRadius: 2,
  },
  credits: { enabled: false },
  responsive: {
    rules: [
      {
        condition: { maxWidth: 480 },
        chartOptions: {
          chart: {
            marginBottom: 110,
            marginTop: 50,
          },
          xAxis: {
            labels: {
              rotation: -45,
              style: { fontSize: "10px" },
            },
          },
          legend: {
            align: "right",
            verticalAlign: "top",
            floating: true,
            x: -8,
            y: 6,
            itemStyle: { fontSize: "10px" },
            itemDistance: 8,
          },
        },
      },
      {
        condition: { maxWidth: 640 },
        chartOptions: {
          chart: {
            marginLeft: 64,
            marginBottom: 105,
          },
          xAxis: {
            labels: {
              rotation: -45,
              style: { fontSize: "11px" },
            },
          },
          yAxis: {
            title: { text: undefined },
            labels: { style: { fontSize: "10px" } },
          },
          legend: {
            align: "right",
            verticalAlign: "top",
            floating: true,
            x: -12,
            y: 8,
            itemStyle: { fontSize: "11px" },
            itemDistance: 10,
          },
        },
      },
      {
        condition: { maxWidth: 768 },
        chartOptions: {
          chart: {
            marginLeft: 72,
            marginBottom: 100,
          },
          legend: {
            align: "right",
            verticalAlign: "top",
            floating: true,
            x: -14,
            y: 8,
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

/** Load Highcharts only on the client to avoid SSR "SeriesRegistry" errors. */
function useHighchartsColumn() {
  const [libs, setLibs] = useState<{
    Highcharts: typeof import("highcharts");
    HighchartsReact: typeof import("highcharts-react-official").default;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([import("highcharts"), import("highcharts-react-official")]).then(
      ([HighchartsModule, HighchartsReactModule]) => {
        if (cancelled) return;
        setLibs({
          Highcharts: HighchartsModule.default,
          HighchartsReact: HighchartsReactModule.default,
        });
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return libs;
}

function parsePct(s: string): number {
  const n = parseFloat(s.replace("%", ""));
  return Number.isNaN(n) ? 0 : n;
}

function AssetAllocationColumnChart({
  categories,
  prevData,
  currentData,
}: {
  categories?: string[];
  prevData?: number[];
  currentData?: number[];
} = {}) {
  const id = useId().replace(/:/g, "");
  const containerId = `asset-allocation-column-${id}`;
  const libs = useHighchartsColumn();

  const options: Options =
    categories && prevData && currentData
      ? {
          ...assetAllocationColumnChartOptions,
          xAxis: {
            ...assetAllocationColumnChartOptions.xAxis,
            categories,
          },
          series: [
            { name: "Previous month", data: prevData, color: "var(--color-info-200)" },
            { name: "Current month", data: currentData, color: "var(--color-teal-200)" },
          ],
        }
      : assetAllocationColumnChartOptions;

  if (!libs) {
    return (
      <div
        className="h-fit w-full"
        role="img"
        aria-label="Asset allocation chart loading"
        aria-busy="true"
      />
    );
  }

  const { Highcharts, HighchartsReact } = libs;

  return (
    <div className="h-fit w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          id: containerId,
          style: { width: "100%", height: "fit-content" },
        }}
      />
    </div>
  );
}

export function MICFPortfolioSection({
  fundData,
}: {
  fundData?: MicfPortfolioFundData | null;
}) {
  const [hoveredCreditIndex, setHoveredCreditIndex] = useState<number | null>(null);
  const [hoveredHoldingsIndex, setHoveredHoldingsIndex] = useState<number | null>(null);

  const assetAllocationRows = fundData?.assetAllocation ?? [...ASSET_ALLOCATION_ROWS];
  const creditQualityRows = fundData?.creditQuality ?? [...CREDIT_QUALITY_ROWS];
  const topHoldingsRows = fundData?.topHoldings ?? [...TOP_HOLDINGS_ROWS];

  const creditQualityChartData =
    fundData?.creditQuality?.map((r) => ({ name: r.item, value: r.value, fill: r.color })) ??
    CREDIT_QUALITY_ROWS.map((row) => ({
      name: row.item,
      value: row.value,
      fill: row.color,
    }));
  const holdingsChartDataForView =
    fundData?.topHoldings?.map((r) => ({ name: r.name, value: r.value, fill: r.color })) ??
    TOP_HOLDINGS_ROWS.map((row) => ({
      name: row.name,
      value: row.value,
      fill: row.color,
    }));

  const columnChartCategories = assetAllocationRows.map((r) => r.item);
  const columnChartPrevData = assetAllocationRows.map((r) => parsePct(r.previousMonth));
  const columnChartCurrentData = assetAllocationRows.map((r) => parsePct(r.currentMonth));

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
        <H3
          id="micf-portfolio-section-heading"
          weight="bold"
          className="text-text-primary"
        >
          Portfolio
        </H3>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* 1. Asset Allocation: column chart + table */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary" weight="semibold">
              Asset Allocation
            </H4>
            <div className="flex flex-col gap-6">
              <div
                className="h-fit w-full min-w-0 rounded-2xl border border-surface-stroke bg-surface-card p-4 sm:p-6"
                role="img"
                aria-label="Asset allocation: previous month vs current month by category"
              >
                <AssetAllocationColumnChart
                  categories={columnChartCategories}
                  prevData={columnChartPrevData}
                  currentData={columnChartCurrentData}
                />
              </div>
              <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
                <table
                  className="w-full min-w-[400px] border-collapse"
                  role="table"
                  aria-label="Asset allocation by category"
                >
                  <thead>
                    <tr>
                      <th scope="col" className="bg-surface-stroke px-4 py-4 text-left sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary">
                          Items
                        </TextSmall>
                      </th>
                      <th scope="col" className="bg-surface-stroke px-4 py-4 text-center sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary">
                          Current month
                        </TextSmall>
                      </th>
                      <th scope="col" className="bg-surface-stroke px-4 py-4 text-center sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary">
                          Previous month
                        </TextSmall>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetAllocationRows.map((row) => (
                      <tr key={row.item} className="border-b border-surface-stroke last:border-b-0">
                        <td className="px-4 py-5 sm:px-6">
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3.5 w-3.5 shrink-0 rounded"
                              style={{ backgroundColor: row.color }}
                              aria-hidden
                            />
                            <TextMedium weight="semibold" className="text-text-primary">
                              {row.item}
                            </TextMedium>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-center sm:px-6">
                          <TextMedium weight="semibold" className="text-text-primary">
                            {row.currentMonth}
                          </TextMedium>
                        </td>
                        <td className="px-4 py-5 text-center sm:px-6">
                          <TextMedium weight="semibold" className="text-text-primary">
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
          <div className="flex flex-col gap-6 justify-start items-start">
            <H4 className="text-text-primary" weight="semibold">
              Credit quality
            </H4>
            <div className="flex min-w-0 w-full flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
                  <table
                    className="w-full min-w-[320px] border-collapse"
                    role="table"
                    aria-label="Credit quality by rating"
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="bg-surface-stroke px-4 py-4 text-left sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary">
                            Items
                          </TextSmall>
                        </th>
                        <th scope="col" className="bg-surface-stroke px-4 py-4 text-center sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary">
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {creditQualityRows.map((row, index) => (
                        <tr
                          key={row.item}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredCreditIndex === index && "bg-surface-stroke"
                          )}
                        >
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium weight="semibold" className="text-text-primary">
                                {row.item}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium weight="semibold" className="text-text-primary">
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
                <HighchartsVariablePieChart
                  data={creditQualityChartData}
                  ariaLabel="Credit quality by rating"
                  onSegmentHover={setHoveredCreditIndex}
                />
              </div>
            </div>
          </div>

          {/* 3. Top holdings: donut (left) + table (right) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary" weight="semibold">
              Top holdings
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <HighchartsVariablePieChart
                  data={holdingsChartDataForView}
                  ariaLabel="Top holdings by percentage"
                  onSegmentHover={setHoveredHoldingsIndex}
                />
              </div>
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
                  <table
                    className="w-full min-w-[320px] border-collapse"
                    role="table"
                    aria-label="Top holdings by percentage"
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="bg-surface-stroke px-4 py-4 text-left sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary">
                            Instrument
                          </TextSmall>
                        </th>
                        <th scope="col" className="bg-surface-stroke px-4 py-4 text-center sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary">
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topHoldingsRows.map((row, index) => (
                        <tr
                          key={row.name}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredHoldingsIndex === index && "bg-surface-stroke"
                          )}
                        >
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium weight="semibold" className="text-text-primary">
                                {row.name}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium weight="semibold" className="text-text-primary">
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

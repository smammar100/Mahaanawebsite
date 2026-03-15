"use client";

import { useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fmt, fmtAxis } from "@/lib/formatters";
import { CHART_COLORS } from "@/lib/fireConfig";
import type { ProjectionRow } from "@/lib/calculations";

const chartConfig = {
  portfolio: { label: "Portfolio", color: CHART_COLORS.portfolio },
  contributions: { label: "Contributions", color: CHART_COLORS.contributions },
  initialSavings: { label: "Initial savings", color: CHART_COLORS.initial },
  fireTarget: { label: "FIRE Goal", color: CHART_COLORS.goal },
} satisfies ChartConfig;

interface ProjectionSectionProps {
  hasData: boolean;
  data: ProjectionRow[];
  fireTarget: number;
  retirementAge: number | null;
  currentAge: number;
  currentSavings: number;
  monthlyContrib: number;
  effectiveRate: number;
}

export function ProjectionSection({
  hasData,
  data,
  fireTarget,
  retirementAge,
  currentAge,
  currentSavings,
  monthlyContrib,
  effectiveRate,
}: ProjectionSectionProps) {
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  const chartData = data.map((row) => ({
    ...row,
    fireTarget,
    initialSavings: currentSavings,
  }));

  const firstFireYear =
    retirementAge !== null
      ? data.find((row) => row.portfolio >= fireTarget)?.year ?? null
      : null;

  const showDots = data.length <= 25;

  return (
    <div className="rounded-2xl border border-surface-stroke bg-surface-card p-6 shadow-sm sm:p-8 lg:p-9">
        <div className="text-center">
          <p className="text-label text-system-brand">
            THE JOURNEY AHEAD
          </p>
          <h2 className="text-card-title mt-1 mb-6 text-text-primary sm:mb-8">
            Your FIRE projection
          </h2>
        </div>

        <div className="mt-1 mb-6 flex justify-center gap-6 border-b border-surface-stroke">
          <button
            type="button"
            onClick={() => setActiveTab("chart")}
            className={`pb-2 text-stat transition-colors ${
              activeTab === "chart"
                ? "border-b-2 border-system-brand text-system-brand"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("table")}
            className={`pb-2 text-stat transition-colors ${
              activeTab === "table"
                ? "border-b-2 border-system-brand text-system-brand"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            Table
          </button>
        </div>

        {!hasData ? (
          <div className="flex h-56 flex-col items-center justify-center rounded-lg border border-surface-stroke bg-surface-bg p-6 text-center sm:h-64 lg:h-80">
            <p className="text-text-tertiary">
              Enter your details above to see the chart
            </p>
          </div>
        ) : activeTab === "chart" ? (
          <>
            <div className="h-56 w-full min-w-0 sm:h-64 lg:h-80">
              <div className="h-full bg-white p-6">
                <ChartContainer config={chartConfig} className="h-full">
                <ComposedChart
                  key={`${fireTarget}-${retirementAge ?? 0}-${data.length}`}
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 24 }}
                >
                  <defs>
                    <linearGradient
                      id="portfolioGradientProj"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={CHART_COLORS.portfolio}
                        stopOpacity={0.12}
                      />
                      <stop
                        offset="100%"
                        stopColor={CHART_COLORS.portfolio}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="contributionsGradientProj"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={CHART_COLORS.contributions}
                        stopOpacity={0.08}
                      />
                      <stop
                        offset="100%"
                        stopColor={CHART_COLORS.contributions}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-surface-stroke)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    stroke="var(--color-text-tertiary)"
                    tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                    tickFormatter={(v) => `Y${v}`}
                    label={{
                      value: "Saving year",
                      position: "insideBottom",
                      offset: -5,
                      fill: "var(--color-text-tertiary)",
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    tickFormatter={(n) => fmtAxis(n)}
                    width={70}
                    domain={[0, "auto"]}
                    stroke="var(--color-text-tertiary)"
                    tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                  />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent
                        {...props}
                        labelFormatter={(_label, payload) =>
                          payload && typeof payload.year === "number" && typeof payload.age === "number"
                            ? `Year ${payload.year}, Age ${payload.age}`
                            : ""
                        }
                        formatter={(value) => fmt(Number(value))}
                      />
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="portfolio"
                    name="Portfolio Value"
                    stroke={CHART_COLORS.portfolio}
                    strokeWidth={2}
                    fill="url(#portfolioGradientProj)"
                    isAnimationActive={false}
                    dot={showDots}
                  />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    name="Contributions"
                    stroke={CHART_COLORS.contributions}
                    strokeWidth={2}
                    fill="url(#contributionsGradientProj)"
                    isAnimationActive={false}
                    dot={showDots}
                  />
                  <Line
                    type="monotone"
                    dataKey="initialSavings"
                    name="Initial savings"
                    stroke={CHART_COLORS.initial}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="fireTarget"
                    name="FIRE Goal"
                    stroke={CHART_COLORS.goal}
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    dot={false}
                    isAnimationActive={false}
                  />
                </ComposedChart>
                </ChartContainer>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 gap-y-3 lg:flex-nowrap">
              <div className="flex items-center gap-2">
                <div
                  className="h-[9px] w-[9px] rounded-full"
                  style={{ backgroundColor: CHART_COLORS.initial }}
                />
                <span className="text-tiny text-text-secondary">
                  Initial {fmt(currentSavings)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-[9px] w-[9px] rounded-full"
                  style={{ backgroundColor: CHART_COLORS.contributions }}
                />
                <span className="text-tiny text-text-secondary">
                  Contributions {fmt(monthlyContrib)} p/m
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-[9px] w-[9px] rounded-full"
                  style={{ backgroundColor: CHART_COLORS.portfolio }}
                />
                <span className="text-tiny text-text-secondary">
                  Return {(effectiveRate * 100).toFixed(2)}% p/a
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead>
                <tr className="border-b-2 border-surface-stroke">
                  <th className="pb-2 pr-4 text-label text-text-tertiary">
                    Year
                  </th>
                  <th className="pb-2 pr-4 text-label text-text-tertiary">
                    Age
                  </th>
                  <th className="pb-2 pr-4 text-label text-text-tertiary">
                    Portfolio Value
                  </th>
                  <th className="pb-2 pr-4 text-label text-text-tertiary">
                    Contributions (cum.)
                  </th>
                  <th className="pb-2 text-label text-text-tertiary">
                    Growth (cum.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.year}
                    className={`border-b border-surface-stroke hover:bg-primary-100/50 ${
                      firstFireYear === row.year ? "font-semibold" : ""
                    }`}
                  >
                    <td className="py-2 pr-4 text-text-primary">
                      {row.year}
                      {firstFireYear === row.year && (
                        <span className="ml-2 rounded-full bg-success-400 px-2 py-0.5 text-tiny text-white">
                          FIRE
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-text-primary">
                      {row.age}
                    </td>
                    <td className="py-2 pr-4 font-mono text-text-primary">
                      {fmt(row.portfolio)}
                    </td>
                    <td className="py-2 pr-4 font-mono text-text-secondary">
                      {fmt(row.contributions)}
                    </td>
                    <td className="py-2 font-mono text-text-secondary">
                      {fmt(row.growth)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
}

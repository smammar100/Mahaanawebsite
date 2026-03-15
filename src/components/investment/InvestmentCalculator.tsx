"use client";

import { useState } from "react";
import { useInvestmentCalculation } from "@/hooks/useInvestmentCalculation";
import { Container } from "@/components/layout/Container";
import { InputCard } from "@/components/investment/InputCard";
import { SummaryCard } from "@/components/investment/SummaryCard";
import { ResultsBand } from "@/components/investment/ResultsBand";
import { ProjectionChart } from "@/components/investment/ProjectionChart";
import { ProjectionTable } from "@/components/investment/ProjectionTable";
import { cleanCopy } from "@/lib/copy-utils";
import { fmt } from "@/lib/formatters";
import { CHART_COLORS, INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import { cx } from "@/utils/cx";

export function InvestmentCalculator() {
  const [initial, setInitial] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  const result = useInvestmentCalculation({
    initial,
    monthly,
    rate,
    years,
  });

  return (
    <Container className="max-w-[1080px]">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-0 lg:rounded-2xl lg:border lg:border-surface-stroke lg:bg-surface-card lg:shadow-sm lg:overflow-hidden">
        <InputCard
          className="lg:rounded-l-2xl lg:rounded-r-none lg:border-0 lg:border-r lg:border-surface-stroke"
          initial={initial}
          onInitialChange={setInitial}
          monthly={monthly}
          onMonthlyChange={setMonthly}
          rate={rate}
          onRateChange={setRate}
          years={years}
          onYearsChange={setYears}
        />
        <SummaryCard
          className="lg:rounded-r-2xl lg:border-0"
          initial={initial}
          futureValue={result.futureValue}
          totalContribs={result.totalContribs}
          totalInvested={result.totalInvested}
          interestEarned={result.interestEarned}
          growthPercent={result.growthPercent}
          years={years}
          rate={rate}
          hasData={result.hasData}
        />
      </div>

      {result.hasData && (
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <ResultsBand
            futureValue={result.futureValue}
            initial={initial}
            totalContribs={result.totalContribs}
            totalInvested={result.totalInvested}
            interestEarned={result.interestEarned}
            years={years}
            rate={rate}
          />
        </div>
      )}

      <div className="mt-4 space-y-4 pb-4">
        <div className="rounded-2xl border border-surface-stroke bg-surface-card p-6 shadow-sm sm:p-8 lg:p-9">
          <div className="text-center">
            <p className="text-label text-system-brand">
              {cleanCopy("THE JOURNEY AHEAD")}
            </p>
            <h2 className="text-card-title mt-1 mb-6 text-text-primary sm:mb-8">
              {cleanCopy("Your investment projection")}
            </h2>
          </div>

          <div className="mt-1 mb-6 flex justify-center gap-6 border-b border-surface-stroke">
            <button
              type="button"
              onClick={() => setActiveTab("chart")}
              className={cx(
                "pb-2 text-stat transition-colors",
                activeTab === "chart"
                  ? "border-b-2 border-system-brand text-system-brand"
                  : "text-text-tertiary hover:text-text-primary"
              )}
            >
              Chart
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("table")}
              className={cx(
                "pb-2 text-stat transition-colors",
                activeTab === "table"
                  ? "border-b-2 border-system-brand text-system-brand"
                  : "text-text-tertiary hover:text-text-primary"
              )}
            >
              Table
            </button>
          </div>

          {activeTab === "chart" ? (
            <>
              <ProjectionChart
                yearlyData={result.yearlyData}
                initial={initial}
                monthly={monthly}
                rate={rate}
                hasData={result.hasData}
              />
              <div className="mt-4 flex flex-wrap items-center gap-4 gap-y-3 border-t border-surface-stroke pt-4 lg:flex-nowrap sm:mt-5 sm:pt-5">
                <div className="flex items-center gap-2">
                  <div
                    className="h-[9px] w-[9px] rounded-full"
                    style={{ backgroundColor: CHART_COLORS.portfolio }}
                  />
                  <span className="text-tiny text-text-secondary">
                    Portfolio value
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-[9px] w-[9px] rounded-full"
                    style={{ backgroundColor: CHART_COLORS.invested }}
                  />
                  <span className="text-tiny text-text-secondary">
                    {monthly > 0
                      ? `Contributions ${fmt(monthly, INVESTMENT_CURRENCY)} p/m`
                      : "No monthly contributions"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-[9px] w-[9px] rounded-full"
                    style={{ backgroundColor: CHART_COLORS.initial }}
                  />
                  <span className="text-tiny text-text-secondary">
                    Initial {fmt(initial, INVESTMENT_CURRENCY)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <ProjectionTable yearlyData={result.yearlyData} />
          )}
        </div>
      </div>

      <p className="mt-0 pt-0 text-text-tertiary">
        All projections are for illustrative purposes. This calculator is for
        educational purposes only and does not constitute financial advice.
      </p>
    </Container>
  );
}

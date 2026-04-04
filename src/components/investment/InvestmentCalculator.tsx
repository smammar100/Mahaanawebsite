"use client";

import { useState } from "react";
import { useInvestmentCalculation } from "@/hooks/useInvestmentCalculation";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HighchartsInvestmentLineChart } from "@/components/ui/HighchartsInvestmentLineChart";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

type MandatoryField = "initial" | "rate" | "years";

function formatCurrency(value: number, fallback = "—") {
  if (!Number.isFinite(value) || value <= 0) {
    return fallback;
  }

  return `PKR ${Math.round(value).toLocaleString("en-PK")}`;
}

function SidebarInput({
  label,
  helperText,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
  errorText,
}: {
  label: string;
  helperText?: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  errorText?: string;
}) {
  const onValueChange = (input: string) => {
    if (!input.trim()) {
      onChange(0);
      return;
    }

    const parsed = Number(input);
    onChange(Number.isNaN(parsed) ? 0 : Math.max(min, parsed));
  };

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <p className="text-body-sm text-gray-100">{label}</p>
        {helperText ? (
          <p className="text-body-xs italic text-primary-150">{helperText}</p>
        ) : null}
      </div>
      <label
        className={cx(
          "flex h-11 items-center gap-2 rounded-lg border bg-white px-3 transition-colors",
          errorText
            ? "border-error-300 hover:border-error-300 focus-within:border-error-300"
            : "border-primary-300/35 hover:border-primary-150/70 focus-within:border-primary-150"
        )}
      >
        {prefix ? (
          <span className="font-mono text-body-xs text-text-tertiary">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          step={step}
          onChange={(event) => onValueChange(event.target.value)}
          className="w-full bg-transparent font-mono text-small text-text-primary outline-none placeholder:text-text-tertiary"
          placeholder="0"
          inputMode="numeric"
        />
        {suffix ? (
          <span className="font-mono text-body-xs text-text-tertiary">
            {suffix}
          </span>
        ) : null}
      </label>
      {errorText ? (
        <p className="text-body-xs text-error-150">{errorText}</p>
      ) : null}
    </div>
  );
}

export function InvestmentCalculator() {
  const [initial, setInitial] = useState(500000);
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errors, setErrors] = useState<Record<MandatoryField, string>>({
    initial: "",
    rate: "",
    years: "",
  });

  const validateMandatoryFields = () => {
    const nextErrors: Record<MandatoryField, string> = {
      initial: initial > 0 ? "" : "Initial investment is required.",
      rate: rate > 0 ? "" : "Rate of return is required.",
      years: years > 0 ? "" : "Investment period is required.",
    };

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleCalculateReturns = () => {
    if (!validateMandatoryFields()) {
      setHasCalculated(false);
      return;
    }

    setHasCalculated(true);
  };

  const result = useInvestmentCalculation({
    initial: hasCalculated ? initial : 0,
    monthly: hasCalculated ? monthly : 0,
    rate: hasCalculated ? rate : 0,
    years: hasCalculated ? years : 0,
  });

  const hasResults = hasCalculated && initial > 0 && years > 0;
  const months = Math.max(0, Math.floor(years) * 12);
  const totalContributed = initial + monthly * months;
  const totalReturns = Math.max(result.futureValue - totalContributed, 0);

  const chartCategories = result.yearlyData.map((point) => `Year ${point.year}`);
  const chartSeries = [
    {
      name: "Initial Investment",
      data: result.yearlyData.map(() => initial),
      color: "var(--color-text-primary)",
    },
    {
      name: "Returns",
      data: result.yearlyData.map((point) => point.interest),
      color: "var(--color-system-success)",
    },
    {
      name: "Total Value",
      data: result.yearlyData.map((point) => point.portfolio),
      color: "var(--chart-3)",
    },
  ];

  return (
    <div className="h-[calc(100dvh-var(--header-height)-env(safe-area-inset-top,0px))] overflow-hidden bg-surface-bg">
      <div className="flex h-full flex-col lg:flex-row">
        <aside className="w-full min-w-0 border-b border-primary-300/35 bg-primary-400 lg:h-full lg:w-[330px] lg:min-w-[330px] lg:border-r lg:border-b-0">
          <div className="compound-sidebar-scrollbar flex h-full min-h-full flex-col overflow-y-auto px-5 py-6 [scrollbar-width:thin] [scrollbar-color:var(--color-gray-400)_transparent]">
            <div className="border-b border-primary-300/35 pb-5">
              <p className="text-body-xs font-semibold tracking-[0.22em] text-primary-150">
                {cleanCopy("COMPOUND")}
              </p>
              <h1 className="mt-2 text-nav-heading text-[1.3rem] text-gray-100">
                {cleanCopy("Savings Calculator")}
              </h1>
            </div>

            <div className="space-y-5 pt-6">
              <section>
                <div className="space-y-4">
                  <SidebarInput
                    label="Initial Investment"
                    value={initial}
                    onChange={setInitial}
                    prefix="PKR"
                    errorText={errors.initial}
                  />
                  <SidebarInput
                    label="Monthly Contribution"
                    value={monthly}
                    onChange={setMonthly}
                    prefix="PKR"
                  />
                  <SidebarInput
                    label="Rate of Return"
                    value={rate}
                    onChange={setRate}
                    suffix="%"
                    step={0.1}
                    errorText={errors.rate}
                  />
                </div>
              </section>

              <section>
                <div className="space-y-4">
                  <SidebarInput
                    label="Investment Period"
                    value={years}
                    onChange={setYears}
                    suffix="yrs"
                    errorText={errors.years}
                  />
                  <div className="border-t border-primary-300/35" />
                  <Button
                    type="button"
                    onClick={handleCalculateReturns}
                    className="h-11 w-full rounded-lg bg-white font-semibold text-primary-400 hover:bg-primary-100"
                  >
                    Calculate Return
                  </Button>
                </div>
              </section>
            </div>

            <div className="mt-auto border-t border-primary-300/35 pt-4">
              <div className="flex flex-wrap gap-2">
                <AppStoreButton size="md" className="bg-black text-white ring-white/25" />
                <GooglePlayButton size="md" className="bg-black text-white ring-white/25" />
              </div>
            </div>
          </div>
        </aside>

        <section className="compound-main-scrollbar flex-1 overflow-y-auto bg-surface-bg px-4 py-6 md:px-8 md:py-6 lg:px-16 lg:py-6">
          {!hasResults ? (
            <div className="flex min-h-full flex-col items-center justify-center text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-surface-card text-text-tertiary">
                <svg
                  viewBox="0 0 24 24"
                  className="size-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <h2 className="mt-5 text-h5 text-text-primary">
                {cleanCopy("Enter your details")}
              </h2>
              <p className="mt-2 max-w-md text-body text-text-tertiary">
                {cleanCopy(
                  "Add your investment amount and growth period to preview your compound projection."
                )}
              </p>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[1100px] animate-fadeInUp">
              <h2 className="mt-1 text-h4 text-text-primary sm:text-h3">
                {cleanCopy("Investment Projection")}
              </h2>
              <div className="mt-6 flex justify-center">
                <div className="h-[470px] w-full max-w-[880px]">
                  <HighchartsInvestmentLineChart
                    categories={chartCategories}
                    series={chartSeries}
                    ariaLabel="Investment projection line chart with total value, contributions, and returns"
                  />
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-start justify-center gap-8 sm:gap-10">
                <div className="text-center">
                  <p className="text-body-xs font-semibold tracking-[0.12em] text-text-tertiary uppercase">
                    Initial Investment
                  </p>
                  <p className="mt-1 font-mono text-medium font-semibold text-text-primary">
                    {formatCurrency(initial)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-body-xs font-semibold tracking-[0.12em] text-text-tertiary uppercase">
                    Returns
                  </p>
                  <p className="mt-1 font-mono text-medium font-semibold text-system-success">
                    {formatCurrency(totalReturns)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-body-xs font-semibold tracking-[0.12em] text-text-tertiary uppercase">
                    Total Value
                  </p>
                  <p className="mt-1 font-mono text-medium font-semibold text-primary-200">
                    {formatCurrency(result.futureValue)}
                  </p>
                </div>
              </div>

              <Card className="mt-8 rounded-xl border-surface-stroke bg-surface-bg">
                <CardContent className="space-y-2 p-5 text-body-lg sm:p-6">
                  <p className="text-text-secondary">
                    With an initial investment of{" "}
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(initial)}
                    </span>{" "}
                    and monthly savings of{" "}
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(monthly)}
                    </span>
                    , your projected value after {Math.floor(years)} years is{" "}
                    <span className="font-semibold text-primary-200">
                      {formatCurrency(result.futureValue)}
                    </span>
                    .
                  </p>
                  <p className="text-text-secondary">
                    Total contributed amount is{" "}
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(totalContributed)}
                    </span>{" "}
                    while estimated returns are{" "}
                    <span className="font-semibold text-system-success">
                      {formatCurrency(totalReturns)}
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

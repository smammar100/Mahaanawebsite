"use client";

import { fmt, formatGrowthPercent } from "@/lib/formatters";
import { INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import { cx } from "@/utils/cx";

interface SummaryCardProps {
  className?: string;
  initial: number;
  futureValue: number;
  totalContribs: number;
  totalInvested: number;
  interestEarned: number;
  growthPercent: number;
  years: number;
  rate: number;
  hasData: boolean;
}

export function SummaryCard({
  className,
  initial,
  futureValue,
  totalContribs,
  totalInvested,
  interestEarned,
  growthPercent,
  years,
  rate,
  hasData,
}: SummaryCardProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-surface-stroke bg-surface-card p-6 sm:p-8 lg:p-10 flex flex-col justify-center",
        className
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest text-system-brand">
        PROJECTION
      </p>
      <h2 className="mt-1 font-heading text-2xl font-bold tracking-heading text-text-primary lg:text-3xl mb-6 sm:mb-8">
        Your future value
      </h2>

      <div className="flex flex-col justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
          FUTURE VALUE
        </p>
        <p
          className={cx(
            "mt-1 font-heading text-4xl font-extrabold tracking-heading lg:text-5xl transition-colors duration-300",
            hasData ? "text-text-primary" : "text-text-tertiary"
          )}
        >
          {hasData ? fmt(futureValue, INVESTMENT_CURRENCY) : "—"}
        </p>
        <p className="mt-1 min-h-[1.25rem] text-[13px] text-text-tertiary">
          {hasData
            ? `After ${years} year${years === 1 ? "" : "s"} at ${rate}% p.a.`
            : "Enter values to see your projection"}
        </p>
      </div>

      {hasData && (
        <div
          className={cx(
            "mt-6 grid grid-cols-2 gap-2 sm:gap-3 transition-opacity duration-300",
            hasData ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="rounded-xl border border-surface-stroke bg-surface-bg p-3 sm:p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary mb-1">
              Principal
            </p>
            <p className="text-base font-bold text-text-primary sm:text-lg">
              {fmt(initial, INVESTMENT_CURRENCY)}
            </p>
          </div>
          <div className="rounded-xl border border-surface-stroke bg-surface-bg p-3 sm:p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary mb-1">
              Contributions
            </p>
            <p className="text-base font-bold text-text-primary sm:text-lg">
              {fmt(totalContribs, INVESTMENT_CURRENCY)}
            </p>
          </div>
          <div className="rounded-xl border border-surface-stroke bg-surface-bg p-3 sm:p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary mb-1">
              Return Earned
            </p>
            <p className="text-base font-bold text-system-success sm:text-lg">
              {fmt(interestEarned, INVESTMENT_CURRENCY)}
            </p>
          </div>
          <div className="rounded-xl border border-surface-stroke bg-surface-bg p-3 sm:p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary mb-1">
              Total Growth
            </p>
            <p className="text-base font-bold text-system-success sm:text-lg">
              {formatGrowthPercent(growthPercent)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

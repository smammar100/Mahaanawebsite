"use client";

import { Container } from "@/components/layout/Container";
import { fmt } from "@/lib/formatters";
import { INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import { cx } from "@/utils/cx";

interface ResultsBandProps {
  futureValue: number;
  initial: number;
  totalContribs: number;
  totalInvested: number;
  interestEarned: number;
  years: number;
  rate: number;
}

export function ResultsBand({
  futureValue,
  initial,
  totalContribs,
  totalInvested,
  interestEarned,
  years,
  rate,
}: ResultsBandProps) {
  const stats = [
    { label: "Initial", value: fmt(initial, INVESTMENT_CURRENCY), green: false },
    {
      label: "Contributions",
      value: fmt(totalContribs, INVESTMENT_CURRENCY),
      green: false,
    },
    {
      label: "Total Invested",
      value: fmt(totalInvested, INVESTMENT_CURRENCY),
      green: false,
    },
    {
      label: "Return Earned",
      value: fmt(interestEarned, INVESTMENT_CURRENCY),
      green: true,
    },
  ];

  return (
    <section className="w-full py-6">
      <Container className="max-w-[680px] text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-text-tertiary">
          After {years} year{years === 1 ? "" : "s"} at {rate}% p.a.
        </p>
        <p className="mt-2 font-heading text-4xl font-extrabold tracking-heading text-text-primary sm:text-5xl lg:text-6xl mb-8">
          {fmt(futureValue, INVESTMENT_CURRENCY)}
        </p>

        <div className="flex flex-col overflow-hidden rounded-xl border border-surface-stroke bg-white sm:flex-row">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cx(
                "flex flex-1 flex-col py-4 px-5 text-center",
                i < stats.length - 1 && "border-b border-surface-stroke sm:border-b-0 sm:border-r"
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary mb-1">
                {stat.label}
              </p>
              <p
                className={cx(
                  "text-base font-bold sm:text-lg",
                  stat.green ? "text-system-success" : "text-text-primary"
                )}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

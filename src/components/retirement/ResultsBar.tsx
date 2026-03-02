"use client";

import { TextSmall } from "@/components/ui/Typography";
import { formatYearsMonths } from "@/lib/formatters";

interface ResultsBarProps {
  yearsToFire: number | null;
  monthsToFire: number | null;
  reachable: boolean;
  retirementAge: number | null;
}

export function ResultsBar({
  yearsToFire,
  monthsToFire,
  reachable,
  retirementAge,
}: ResultsBarProps) {
  const primaryText = reachable
    ? formatYearsMonths(yearsToFire, monthsToFire)
    : "Goal not reached";
  const subtitleText = reachable
    ? `Goal achieved · Retire at age ${retirementAge != null ? Math.round(retirementAge) : "—"}`
    : "Try increasing your monthly savings or choosing a higher-growth plan";

  return (
    <section className="w-full py-4">
      <div className="mx-auto max-w-[680px] px-4 text-center">
        <p className="font-heading text-4xl font-extrabold tracking-heading text-text-primary sm:text-5xl lg:text-6xl">
          {primaryText}
        </p>
        <TextSmall className="mt-3 text-text-tertiary">{subtitleText}</TextSmall>
      </div>
    </section>
  );
}

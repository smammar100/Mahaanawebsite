"use client";

import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const PILLS = [
  "All",
  "CPF",
  "SRS",
  "Bonds",
  "Equities",
  "Gold",
  "ESG",
  "ETFs",
  "Income Investing",
  "Passive Investing",
] as const;

export type InsightsPillValue = (typeof PILLS)[number];

interface InsightsFilterPillsProps {
  activePill: InsightsPillValue;
  onPillChange: (pill: InsightsPillValue) => void;
}

export function InsightsFilterPills({
  activePill,
  onPillChange,
}: InsightsFilterPillsProps) {
  return (
    <div
      className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
      role="group"
      aria-label="Filter by topic"
    >
      {PILLS.map((pill) => (
        <button
          key={pill}
          type="button"
          onClick={() => onPillChange(pill)}
          className={cx(
            "w-full rounded-full px-4 py-2 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand",
            activePill === pill
              ? "bg-system-brand text-white"
              : "bg-surface-card text-text-secondary hover:bg-surface-stroke hover:text-text-primary"
          )}
        >
          {cleanCopy(pill)}
        </button>
      ))}
    </div>
  );
}

"use client";

import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const PILLS = [
  { value: "All", label: "All" },
  { value: "Investing", label: "Investing" },
  { value: "Personal Finance", label: "Videos & Podcasts" },
  { value: "Market Views", label: "Latest News" },
] as const;

export type InsightsPillValue = (typeof PILLS)[number]["value"];

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
      className="flex w-full flex-wrap gap-2"
      role="group"
      aria-label={cleanCopy("Filter by category")}
    >
      {PILLS.map((pill) => (
        <button
          key={pill.value}
          type="button"
          onClick={() => onPillChange(pill.value)}
          className={cx(
            "min-h-11 min-w-[44px] rounded-full px-4 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand",
            activePill === pill.value
              ? "bg-system-brand text-white"
              : "bg-surface-card text-text-secondary hover:bg-surface-stroke hover:text-text-primary"
          )}
        >
          {cleanCopy(pill.label)}
        </button>
      ))}
    </div>
  );
}

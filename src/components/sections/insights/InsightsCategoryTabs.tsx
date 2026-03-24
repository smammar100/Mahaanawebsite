"use client";

import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const TABS = [
  "All",
  "Investing",
  "Personal Finance",
  "Market Views",
  "Solutions",
  "Private Wealth",
] as const;

export type InsightsTabValue = (typeof TABS)[number];

interface InsightsCategoryTabsProps {
  activeTab: InsightsTabValue;
  onTabChange: (tab: InsightsTabValue) => void;
}

export function InsightsCategoryTabs({
  activeTab,
  onTabChange,
}: InsightsCategoryTabsProps) {
  return (
    <nav
      className="flex min-h-[44px] w-full items-center justify-between gap-4 border-b border-surface-stroke"
      aria-label="Content categories"
    >
      <div className="flex flex-1 flex-wrap items-center gap-1 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => onTabChange(tab)}
            className={cx(
              "shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand",
              activeTab === tab
                ? "border-system-brand text-system-brand"
                : "border-transparent text-text-tertiary hover:text-text-primary"
            )}
          >
            {cleanCopy(tab)}
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-label="Search articles"
        className="shrink-0 rounded-lg p-2 text-text-tertiary hover:bg-surface-card hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
      >
        <svg
          className="size-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </nav>
  );
}

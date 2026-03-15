"use client";

import { TextSmall } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { pct } from "@/lib/formatters";
import type { RiskProfile } from "@/lib/riskProfiles";
import type { AssetAllocation } from "@/lib/riskProfiles";
import { cx } from "@/utils/cx";

const ASSET_CONFIG: {
  key: keyof AssetAllocation;
  label: string;
  colorVar: string;
}[] = [
  {
    key: "moneymarket",
    label: "Money Market",
    colorVar: "var(--color-primary-200)",
  },
  { key: "debt", label: "Debt", colorVar: "var(--color-teal-300)" },
  { key: "equity", label: "Equity", colorVar: "var(--color-info-200)" },
];

interface StrategyCardProps {
  className?: string;
  profiles: RiskProfile[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function StrategyCard({
  className,
  profiles,
  selectedId,
  onSelect,
}: StrategyCardProps) {
  const selected =
    profiles.find((p) => p.id === selectedId) ?? profiles[2];

  return (
    <div
      className={cx(
        "rounded-2xl border border-surface-stroke bg-surface-card p-8 md:p-10",
        className
      )}
    >
      <p className="text-label text-system-brand">
        {cleanCopy("THE PLAN")}
      </p>
      <h2 className="text-card-title mt-1 mb-6 text-text-primary sm:mb-8">
        {cleanCopy("Your investing strategy")}
      </h2>

      <div className="flex flex-col gap-2">
        {profiles.map((profile, index) => {
          const isActive = profile.id === selectedId;
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => onSelect(profile.id)}
              className={cx(
                "flex items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 text-left transition-colors",
                isActive
                  ? "border-primary-200 bg-primary-100 text-text-primary"
                  : "border-surface-stroke bg-surface-bg text-text-primary hover:border-surface-stroke hover:bg-surface-card"
              )}
            >
              <span
                className={cx(
                  "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-body-xs font-semibold",
                  isActive ? "bg-primary-200 text-gray-100" : "bg-surface-stroke text-text-tertiary"
                )}
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="w-28 text-stat text-text-primary">
                  {profile.label}
                </p>
                <p
                  className={cx(
                    "text-tiny truncate",
                    isActive ? "text-text-secondary" : "text-text-tertiary"
                  )}
                >
                  {profile.allocSummary}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-3">
        {ASSET_CONFIG.filter(({ key }) => selected.alloc[key] > 0).map(
          ({ key, label, colorVar }) => (
            <div key={key} className="flex items-center gap-3">
              <div
                className="h-[9px] w-[9px] shrink-0 rounded-full"
                style={{ backgroundColor: colorVar }}
              />
              <span className="w-28 shrink-0 text-tiny text-text-secondary">
                {label}
              </span>
              <div
                className="h-2 flex-1 overflow-hidden rounded-full bg-surface-stroke"
                role="progressbar"
                aria-valuenow={selected.alloc[key] * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full transition-all duration-400 ease-out"
                  style={{
                    width: `${selected.alloc[key] * 100}%`,
                    backgroundColor: colorVar,
                  }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-tiny text-text-primary">
                {pct(selected.alloc[key])}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

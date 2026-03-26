"use client";

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
    <div className={cx("min-w-0", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
        {cleanCopy("Strategy")}
      </p>
      <h2 className="mt-1 font-heading text-base font-semibold text-text-primary">
        {cleanCopy("Risk profile")}
      </h2>
      <p className="mt-1 text-tiny text-text-tertiary">
        {cleanCopy("Sets your blended return from the model asset assumptions.")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {profiles.map((profile) => {
          const isActive = profile.id === selectedId;
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => onSelect(profile.id)}
              className={cx(
                "rounded-full border px-3 py-1.5 text-tiny font-medium transition-colors",
                isActive
                  ? "border-system-brand bg-system-brand text-white"
                  : "border-surface-stroke bg-white text-text-secondary shadow-xs hover:border-text-tertiary/40"
              )}
            >
              {profile.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-tiny text-text-secondary">{selected.allocSummary}</p>

      <div className="mt-4 space-y-2.5">
        {ASSET_CONFIG.filter(({ key }) => selected.alloc[key] > 0).map(
          ({ key, label, colorVar }) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: colorVar }}
              />
              <span className="w-24 shrink-0 text-tiny text-text-secondary">
                {label}
              </span>
              <div
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-stroke"
                role="progressbar"
                aria-valuenow={selected.alloc[key] * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${selected.alloc[key] * 100}%`,
                    backgroundColor: colorVar,
                  }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-tiny text-text-primary">
                {pct(selected.alloc[key])}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

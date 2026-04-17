"use client";

import { TextMedium, TextSmall } from "@/components/ui/Typography";
import { keyFactSpansFullRow } from "@/lib/keyFactsLayout";
import { cx } from "@/utils/cx";

function KeyFactRow({
  label,
  value,
  labelWidthClassName,
  valueFallback,
}: {
  label: string;
  value: string;
  labelWidthClassName: string;
  valueFallback?: string;
}) {
  const raw = (value ?? "").trim();
  const displayValue =
    raw || (valueFallback !== undefined ? valueFallback : "");
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 sm:items-start">
      <TextSmall
        weight="medium"
        className={cx("shrink-0 text-text-tertiary", labelWidthClassName)}
      >
        {label}
      </TextSmall>
      <TextMedium
        weight="semibold"
        className="min-w-0 break-words text-text-primary"
      >
        {displayValue}
      </TextMedium>
    </div>
  );
}

export function KeyFactsGrid({
  items,
  labelWidthClassName = "sm:w-[160px]",
  valueFallback,
  className,
}: {
  items: ReadonlyArray<{ label: string; value: string }>;
  /** Fixed label column width on sm+ (fund pages use 150px–180px). */
  labelWidthClassName?: string;
  /** When set, used if `value` is empty (e.g. MIIETF → `"N/A"`). */
  valueFallback?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 md:gap-x-8 lg:gap-x-20",
        className
      )}
    >
      {items.map(({ label, value }, i) => {
        const full = keyFactSpansFullRow(label, value);
        return (
          <div
            key={`kf-${i}-${label}`}
            className={cx("min-w-0", full && "sm:col-span-2")}
          >
            <KeyFactRow
              label={label}
              value={value}
              labelWidthClassName={labelWidthClassName}
              valueFallback={valueFallback}
            />
          </div>
        );
      })}
    </div>
  );
}

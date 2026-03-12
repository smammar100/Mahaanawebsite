import { CURRENCY_SYMBOL } from "./fireConfig";

export const fmt = (n: number, currency: string = CURRENCY_SYMBOL): string => {
  if (n >= 1_000_000) return `${currency}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${currency}${(n / 1_000).toFixed(0)}K`;
  return `${currency}${Math.abs(n).toFixed(0)}`;
};

export const fmtAxis = (n: number, currency: string = CURRENCY_SYMBOL): string => {
  if (n >= 1_000_000) return `${currency}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${currency}${(n / 1_000).toFixed(0)}K`;
  return `${currency}${n}`;
};

export const pct = (v: number): string => `${(v * 100).toFixed(0)}%`;

/** Format growth as "+X.X%" for display. */
export function formatGrowthPercent(n: number): string {
  return `+${n.toFixed(1)}%`;
}

/** Y-axis tick formatter: K/M shorthand without currency symbol. */
export function formatAxisTick(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/**
 * Format time to FIRE as "X years, Y months" or "Goal not reached".
 */
export function formatYearsMonths(
  yearsToFire: number | null,
  monthsToFire: number | null
): string {
  if (yearsToFire == null || monthsToFire == null) return "Goal not reached";
  const y = Math.floor(yearsToFire);
  const m = Math.round(monthsToFire);
  if (y === 0 && m === 0) return "Goal achieved";
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} year${y === 1 ? "" : "s"}`);
  if (m > 0) parts.push(`${m} month${m === 1 ? "" : "s"}`);
  return parts.join(", ");
}

/** Format ISO date for card meta: "September 18, 2025". Returns null if invalid. */
export function formatPublishedDate(isoDate: string | null | undefined): string | null {
  if (!isoDate) return null;
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return null;
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return null;
  }
}

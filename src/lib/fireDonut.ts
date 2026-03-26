import type { FIREResult } from "@/lib/calculations";

/** Match sidebar dots and donut segments (green / blue / purple). */
export const FIRE_SEGMENT_COLORS = {
  startingCapital: "#1caa50",
  contributions: "#181f8b",
  growth: "#7042d2",
} as const;

export type FireDonutSegment = {
  key: keyof typeof FIRE_SEGMENT_COLORS;
  label: string;
  value: number;
  color: string;
};

/**
 * At FIRE achievement: portfolio = starting lump + net monthly contributions + growth.
 * Returns three non-negative values that sum to portfolio (when reachable).
 */
export function getFireDonutSegments(
  result: FIREResult,
  initialSavings: number
): { segments: FireDonutSegment[]; portfolioAtFire: number } | null {
  if (!result.reachable || result.retirementAge == null) return null;

  const target = result.fireTarget;
  const row = result.data.find((r) => r.portfolio >= target);
  if (!row) return null;

  const portfolio = row.portfolio;
  const contributionsCum = row.contributions;
  const initial = Math.max(0, initialSavings);
  const fromMonthly = Math.max(0, contributionsCum - initial);
  const growth = Math.max(0, portfolio - contributionsCum);

  const segments: FireDonutSegment[] = [
    {
      key: "startingCapital",
      label: "Starting capital",
      value: initial,
      color: FIRE_SEGMENT_COLORS.startingCapital,
    },
    {
      key: "contributions",
      label: "Contributions",
      value: fromMonthly,
      color: FIRE_SEGMENT_COLORS.contributions,
    },
    {
      key: "growth",
      label: "Investment growth",
      value: growth,
      color: FIRE_SEGMENT_COLORS.growth,
    },
  ];

  return { segments, portfolioAtFire: portfolio };
}

export const CURRENCY_SYMBOL = "PKR";

export const ASSET_RETURNS = {
  moneymarket: 6,
  debt: 8,
  equity: 12,
} as const;

/** Chart series colors (hex for Recharts consistency). */
export const CHART_COLORS = {
  portfolio: "#84a344",
  contributions: "#8b5cf6",
  initial: "#6366f1",
  goal: "#166534",
} as const;

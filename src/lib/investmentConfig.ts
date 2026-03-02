import { CURRENCY_SYMBOL } from "./fireConfig";

/** Re-export project currency for investment calculator. */
export const INVESTMENT_CURRENCY = CURRENCY_SYMBOL;

/** Chart series colors (exact hex/rgba per spec — do not map to tokens). */
export const CHART_COLORS = {
  portfolio: "#84a344",
  invested: "#8b5cf6",
  initial: "#6366f1",
  portfolioFill: "rgba(132, 163, 68, 0.12)",
  investedFill: "rgba(139, 92, 246, 0.08)",
} as const;

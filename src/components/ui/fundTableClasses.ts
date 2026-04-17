/** Card shell for fund page data tables — no horizontal clip so inner scroll works. */
export const fundTableCardClass =
  "min-w-0 max-w-full rounded-2xl border border-surface-stroke bg-surface-card";

/** Horizontal scroll strip; wrap `<table>` inside this within the card. */
export const fundTableScrollClass = "overflow-x-auto overscroll-x-contain";

/** Full-width fixed layout table — pair with `<colgroup>` for column shares. */
export const fundTableFixedClass = "w-full min-w-full table-fixed border-collapse";

/** ~7 metric columns + fund label (performance / similar dense grids). */
export const fundTableMinPerformance = "min-w-[720px]";

/** Variable period columns (e.g. MIIRF subfunds historical table). */
export const fundTableMinSubfundPerformance = "min-w-[780px]";

/** Four equal columns (distributions, etc.). */
export const fundTableMinDistributions = "min-w-[540px]";

/** Three numeric/header columns (asset allocation, credit quality style). */
export const fundTableMinThreeCol = "min-w-[500px]";

/** Four columns with a wide label (weighted exposure). */
export const fundTableMinFourCol = "min-w-[560px]";

/** Name + single percentage column. */
export const fundTableMinTwoCol = "min-w-[400px]";

/** Numeric / percentage cells: no wrap, aligned figures. */
export const fundTableMetricCellClass = "whitespace-nowrap text-center tabular-nums";

/**
 * Use in `<col>` for N equal metric columns that share a remainder (e.g. 80% total)
 * so widths sum to exactly 100% with the label column — avoids a visible gap on the
 * right where `thead` background does not paint with `table-fixed`.
 */
export function fundTableMetricColWidthPct(remainderPct: number, count: number): string {
  if (count <= 0) return "auto";
  return `calc(${remainderPct}% / ${count})`;
}

/**
 * Solid header band on `<thead>` so it spans the full table width. Per-cell `th`
 * backgrounds can leave a visible gap on the right with `table-fixed` and %-width
 * `<col>` columns due to rounding.
 */
export const fundTableTheadClass = "bg-surface-stroke";

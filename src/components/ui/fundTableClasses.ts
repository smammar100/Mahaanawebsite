/** Card wrapper for fund page data tables: fits container width without horizontal scroll. */
export const fundTableCardClass =
  "min-w-0 max-w-full overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card";

/** Full-width fixed layout table — pair with <colgroup> for column shares. */
export const fundTableFixedClass = "w-full min-w-full table-fixed border-collapse";

/**
 * Use in `<col>` for N equal metric columns that share a remainder (e.g. 80% total)
 * so widths sum to exactly 100% with the label column — avoids a right-edge gap
 * where `thead` background does not paint.
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

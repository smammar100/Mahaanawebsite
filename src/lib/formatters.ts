import { CURRENCY_SYMBOL } from "./fireConfig";

export const fmt = (n: number, currency: string = CURRENCY_SYMBOL): string => {
  if (n >= 1_000_000) return `${currency}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${currency}${(n / 1_000).toFixed(2)}K`;
  return `${currency}${Math.abs(n).toFixed(2)}`;
};

export const fmtAxis = (n: number, currency: string = CURRENCY_SYMBOL): string => {
  if (n >= 1_000_000) return `${currency}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${currency}${(n / 1_000).toFixed(2)}K`;
  return `${currency}${Number(n).toFixed(2)}`;
};

export const pct = (v: number): string => `${(v * 100).toFixed(2)}%`;

/** Format growth as "+X.XX%" for display. */
export function formatGrowthPercent(n: number): string {
  return `+${n.toFixed(2)}%`;
}

/** Format a numeric percentage for display (avoids float noise like 2.6399999999999997). Max 2 decimal places. */
export function formatPctDisplay(raw: string | number | null | undefined): string {
  if (raw == null || raw === "") return "—";
  const n = typeof raw === "number" ? raw : parseFloat(String(raw));
  if (Number.isNaN(n)) return "—";
  return `${Number(n).toFixed(2)}%`;
}

/** Y-axis tick formatter: K/M shorthand without currency symbol. Max 2 decimal places. */
export function formatAxisTick(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return Number(n).toFixed(2);
}

/**
 * PKR with K / M / B / T / Q / … suffix so the mantissa stays compact (avoids e.g. "2000000.00B").
 * Always 2 decimal places for the scaled value.
 */
const PKR_ABBREV_SUFFIXES = ["", "K", "M", "B", "T", "Q", "Sx", "Sp"] as const;

export function formatPkrAbbreviated(value: number): string {
  if (!Number.isFinite(value)) return "PKR —";
  const abs = Math.abs(value);
  if (abs < 1000) {
    return `PKR ${value.toLocaleString("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }
  const exp = Math.min(
    Math.floor(Math.log10(abs) / 3),
    PKR_ABBREV_SUFFIXES.length - 1
  );
  const scaled = value / 1000 ** exp;
  const suffix = PKR_ABBREV_SUFFIXES[exp];
  return `PKR ${scaled.toFixed(2)}${suffix}`;
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

/** Format date as "Mar 29, 2023" (short month). Returns empty string if invalid. */
export function formatShortDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

/**
 * Relative phrasing for recent posts (e.g. "2 days ago"); older than ~7 days uses short date.
 */
export function formatRelativeOrShortDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "";
    const now = Date.now();
    const diffMs = now - d.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMs < 0) return formatShortDate(isoDate);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatShortDate(isoDate);
  } catch {
    return "";
  }
}

/** Format date as "DD/MM/YYYY" (e.g. 13/06/2023). Returns empty string if invalid. */
export function formatDateDdMmYyyy(isoDate: string | null | undefined): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return "";
  }
}

/** Format date as "MMM YYYY" for chart categories (e.g. Apr 2023). */
export function formatMonthYear(isoDate: string | null | undefined): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

/** Default byline when CMS author is empty (matches blog/investor-education mapping). */
export const DEFAULT_ARTICLE_AUTHOR = "Mahaana";

/**
 * Strip a leading publish date accidentally stored in the author field, e.g.
 * "12 Mar 2026 · Syed Mohammad Ammar" → "Syed Mohammad Ammar".
 */
export function sanitizeArticleAuthorName(raw: string | null | undefined): string {
  const t = (raw ?? "").trim();
  if (!t) return "";
  const ddMonYyyy = t.match(/^\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}\s*·\s*(.+)$/);
  if (ddMonYyyy) return ddMonYyyy[1].trim();
  const monDdYyyy = t.match(
    /^[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4}\s*·\s*(.+)$/
  );
  if (monDdYyyy) return monDdYyyy[1].trim();
  return t;
}

/**
 * Normalize CMS reading time for consistent card display (e.g. "6 minutes" → "6 Min Read").
 * Empty input falls back to "5 Min Read".
 */
export function formatArticleReadTime(raw: string | null | undefined): string {
  const v = (raw ?? "").trim().replace(/^[·•]\s*/, "");
  if (!v) return "5 Min Read";
  if (/\bread\b/i.test(v) && /\bmin\b/i.test(v)) {
    return v.replace(/\s+/g, " ");
  }
  const numMatch = v.match(/(\d+)/);
  if (numMatch && /\bmin/i.test(v)) {
    return `${numMatch[1]} Min Read`;
  }
  return v;
}

/** Single-line card meta: author and reading time only (no publish date). */
export function formatArticleCardMeta(opts: {
  authorName: string;
  readTime: string;
}): string {
  const author =
    sanitizeArticleAuthorName(opts.authorName) || DEFAULT_ARTICLE_AUTHOR;
  const time = formatArticleReadTime(opts.readTime);
  return `${author} · ${time}`;
}

/**
 * Video card footer: duration only (no author). Uses first number in CMS string
 * (e.g. "5 Min Read", "12 minutes") → "5 min watch".
 */
export function formatVideoWatchTimeDisplay(raw: string | null | undefined): string {
  const v = (raw ?? "").trim();
  const numMatch = v.match(/(\d+)/);
  const n = numMatch ? numMatch[1] : "5";
  return `${n} min watch`;
}

/** News card footer: outlet / byline name only (no read time). */
export function formatNewsOutletDisplay(rawAuthor: string | null | undefined): string {
  return sanitizeArticleAuthorName(rawAuthor) || DEFAULT_ARTICLE_AUTHOR;
}

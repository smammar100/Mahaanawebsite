import {
  formatShortDate,
  formatDateDdMmYyyy,
  formatPctDisplay,
} from "./formatters";

const FUND_DATA_API_BASE =
  process.env.NEXT_PUBLIC_FUND_DATA_API_BASE_URL ??
  "https://fdepprodmahaana-gkb9bdeehudhdedy.z02.azurefd.net";

const MIIETF_FUND_DATA_URL = `${FUND_DATA_API_BASE}/marketfeedinvestmentuniverse/api/fund-data?name=miietf`;

/** Origin sent with MIIETF API requests so the API accepts requests from production. */
const MIIETF_API_ORIGIN = "https://www.mahaana.com";

// ---------------------------------------------------------------------------
// Raw API response types
// ---------------------------------------------------------------------------

export interface MiietfFundDataPerfItem {
  name: string;
  mtd: number;
  ytd: number;
  "30d": number;
  "90d": number;
  "1y": number;
  inception: number;
}

export interface MiietfFundDataPriceItem {
  date: string;
  nav: number;
  nav_adjusted: number;
  benchmark: number;
  kmi30: number;
}

export interface MiietfFundDataHolding {
  key: string;
  holding: number;
}

export interface MiietfFundDataWeightedExpo {
  key: string;
  miietf: number;
  kmi30: number;
  weight: number;
}

export interface MiietfFundDataDistribution {
  payout_date: string;
  payout_per_unit: number;
  ex_nav: number;
  yield: number;
}

export interface MiietfFundDataResponse {
  info: Record<string, string>;
  holdings: MiietfFundDataHolding[];
  perf: MiietfFundDataPerfItem[];
  price: MiietfFundDataPriceItem[];
  weighted_expo: MiietfFundDataWeightedExpo[];
  distribution: MiietfFundDataDistribution[];
}

// ---------------------------------------------------------------------------
// Page-ready (transformed) types for sections
// ---------------------------------------------------------------------------

export interface MiietfHeroFundData {
  nav: string;
  navDate: string;
  assetClass: string;
  riskLabel: string;
  mtd: string;
  /** Total expense ratio without govt. levy — matches factsheet “Expense ratio” in hero. */
  expenseRatioMtd: string;
  expenseRatioYtd: string;
  expenseRatioDate?: string;
}

export interface MiietfOverviewFundData {
  summary: string;
  investmentObjective: string;
  keyFactsLeft: Array<{ label: string; value: string }>;
  keyFactsRight: Array<{ label: string; value: string }>;
}

export interface MiietfPerformanceFundData {
  chartCategories: string[];
  chartSeries: Array<{ name: string; data: number[]; color: string }>;
  chartSubtitle: string;
  yAxisTitle: string;
  valueSuffix: string;
  tableRows: Array<{
    label: string;
    color: string;
    mtd: string;
    ytd: string;
    d30: string;
    d90: string;
    y1: string;
    sinceInception: string;
  }>;
}

export interface MiietfPortfolioWeightedExposureRow {
  sector: string;
  miietf: string;
  kmi30: string;
  weight: string;
  color: string;
  value: number;
}

export interface MiietfPortfolioHoldingRow {
  name: string;
  percentage: string;
  color: string;
  value: number;
}

export interface MiietfPortfolioFundData {
  topHoldings: MiietfPortfolioHoldingRow[];
  weightedExposure: MiietfPortfolioWeightedExposureRow[];
}

export type MiietfDistributionsFundData = Array<{
  date: string;
  pkrPerUnit: string;
  exNav: string;
  yieldPct: string;
}>;

export interface MiietfFundDataForPage {
  hero: MiietfHeroFundData;
  overview: MiietfOverviewFundData;
  performance: MiietfPerformanceFundData;
  portfolio: MiietfPortfolioFundData;
  distributions: MiietfDistributionsFundData;
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function getMiietfFundData(): Promise<MiietfFundDataResponse | null> {
  try {
    const url = `${MIIETF_FUND_DATA_URL}&_t=${Date.now()}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Origin: MIIETF_API_ORIGIN,
      },
    });
    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MIIETF fund API] Non-OK response:", res.status, res.statusText);
      }
      return null;
    }
    const data = (await res.json()) as MiietfFundDataResponse;
    if (!data?.info || !Array.isArray(data.perf) || !Array.isArray(data.price)) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MIIETF fund API] Unexpected response shape");
      }
      return null;
    }
    return data;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[MIIETF fund API] Fetch error:", err);
    }
    return null;
  }
}

// ---------------------------------------------------------------------------
// Transform: helpers
// ---------------------------------------------------------------------------

const CHART_COLORS = {
  miietf: "var(--color-primary-200)",
  benchmark: "var(--color-teal-200)",
  kmi30: "var(--color-error-200)",
} as const;

const EXPOSURE_COLORS = [
  "var(--color-primary-200)",
  "var(--color-teal-200)",
  "var(--color-error-200)",
  "var(--color-warning-200)",
  "var(--color-info-200)",
  "var(--color-info-150)",
] as const;

const HOLDINGS_COLORS = [
  "var(--color-primary-200)",
  "var(--color-teal-200)",
  "var(--color-error-200)",
  "var(--color-warning-200)",
  "var(--color-info-200)",
  "var(--color-info-150)",
  "var(--color-teal-150)",
  "var(--color-error-150)",
  "var(--color-coral-150)",
  "var(--color-primary-150)",
] as const;

/** Hero card keeps adjusted NAV for continuity with existing display. */
const HERO_PRICE_BASIS_FIELD = "nav_adjusted" as const;

/** Performance chart should use raw NAV values from API. */
const PERFORMANCE_PRICE_BASIS_FIELD = "nav" as const;
const PERFORMANCE_PRICE_BASIS_LABEL = "NAV price";

function pct2FromDecimal(v: number): string {
  return `${(v * 100).toFixed(2)}%`;
}

function pct2(v: number): string {
  return `${(v * 100).toFixed(2)}%`;
}

/** Format numeric value with up to 4 decimals (trim trailing zeros). */
function formatMax4Dp(v: number): string {
  return v.toFixed(4).replace(/\.?0+$/, "");
}

function infoVal(info: Record<string, string>, key: string): string {
  return info[key] ?? "";
}

function parseNum(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function deriveRiskLabel(assetClass: string): string {
  const v = assetClass.toLowerCase();
  if (v.includes("equity") || v.includes("etf")) return "High Risk";
  if (v.includes("debt") || v.includes("income")) return "Medium Risk";
  if (v.includes("money market") || v.includes("cash")) return "Low Risk";
  return "High Risk";
}

function sanitizeAuthorizedParticipant(value: string): string {
  return value
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ")
    .replace(/\s{2,}/g, " ");
}

function sanitizeHoldingName(name: string): string {
  if (name.trim().toLowerCase() === "meezan bnak limited") return "Meezan Bank Limited";
  return name;
}

// ---------------------------------------------------------------------------
// Transform: sections
// ---------------------------------------------------------------------------

function transformHero(raw: MiietfFundDataResponse): MiietfHeroFundData {
  const info = raw.info;
  const sortedByDate = [...raw.price].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const latestPrice = sortedByDate[0] ?? null;

  const navRaw = latestPrice ? parseNum(latestPrice[HERO_PRICE_BASIS_FIELD]) : null;
  const nav = navRaw != null ? formatMax4Dp(navRaw) : "";
  const navDate = latestPrice ? formatShortDate(latestPrice.date) : "";
  const assetClass = infoVal(info, "Fund Category");
  const riskLabel = deriveRiskLabel(assetClass);

  const miietfPerf = raw.perf?.find((p) => p.name === "MIIETF");
  const mtd = miietfPerf != null ? pct2FromDecimal(miietfPerf.mtd) : "";

  // Hero “Expense ratio” follows overview’s "with govt. levy" TER values.
  const mtdTerWithLevy = infoVal(info, "Monthly Total Expense Ratio");
  const ytdTerWithLevy = infoVal(info, "Yearly Total Expense Ratio");
  const expenseSubmission = infoVal(info, "Submission date");
  const expenseRatioMtd = mtdTerWithLevy ? `${formatPctDisplay(mtdTerWithLevy)} (MTD)` : "";
  const expenseRatioYtd = ytdTerWithLevy ? `${formatPctDisplay(ytdTerWithLevy)} (YTD)` : "";
  const expenseRatioDate = expenseSubmission
    ? formatShortDate(expenseSubmission)
    : undefined;

  return {
    nav,
    navDate,
    assetClass,
    riskLabel,
    mtd,
    expenseRatioMtd,
    expenseRatioYtd,
    expenseRatioDate,
  };
}

const OVERVIEW_LEFT_KEYS = [
  "Net Assets",
  "Launch Date",
  "Fund Category",
  "Benchmark",
  "Fund Auditors",
  "Fund Stability Rating",
] as const;

function transformOverview(raw: MiietfFundDataResponse): MiietfOverviewFundData {
  const info = raw.info;
  const keyFactsLeft = OVERVIEW_LEFT_KEYS.map((label) => {
    let value = infoVal(info, label);
    if (label === "Launch Date" && value) value = formatShortDate(value) || value;
    return { label, value };
  });

  const mtdWithout = infoVal(info, "Monthly Total Expense Ratio (without gov levy)");
  const ytdWithout = infoVal(info, "Yearly Total Expense Ratio (without gov levy)");
  const mtdWith = infoVal(info, "Monthly Total Expense Ratio");
  const ytdWith = infoVal(info, "Yearly Total Expense Ratio");

  const keyFactsRight: Array<{ label: string; value: string }> = [
    { label: "Fund manager", value: infoVal(info, "Fund manager") },
    { label: "Management Fee", value: infoVal(info, "Management Fee") },
    { label: "Authorized Participant", value: sanitizeAuthorizedParticipant(infoVal(info, "Authorized Participant")) },
    {
      label: "Total expense ratio (without govt. levy)",
      value: mtdWithout && ytdWithout ? `${formatPctDisplay(mtdWithout)} (MTD) | ${formatPctDisplay(ytdWithout)} (YTD)` : "",
    },
    {
      label: "Total expense ratio (with govt. levy)",
      value: mtdWith && ytdWith ? `${formatPctDisplay(mtdWith)} (MTD) | ${formatPctDisplay(ytdWith)} (YTD)` : "",
    },
  ];

  return {
    summary: infoVal(info, "Fund Summary"),
    investmentObjective: infoVal(info, "Investment Objective"),
    keyFactsLeft,
    keyFactsRight,
  };
}

/** MIIETF inception date; chart shows full history from this date to present. */
const MIIETF_INCEPTION_DATE_MS = new Date("2024-03-10").getTime();

function transformPerformance(raw: MiietfFundDataResponse): MiietfPerformanceFundData {
  const sortedPrice = [...raw.price].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const chartPrice = sortedPrice
    .filter((p) => new Date(p.date).getTime() >= MIIETF_INCEPTION_DATE_MS)
    .filter((p) => {
      const miietfVal = parseNum(p[PERFORMANCE_PRICE_BASIS_FIELD]);
      return (
        miietfVal != null &&
        parseNum(p.benchmark) != null &&
        parseNum(p.kmi30) != null
      );
    });
  const chartCategories = chartPrice.map((p) => formatShortDate(p.date));
  const miietfData = chartPrice.map((p) => parseNum(p[PERFORMANCE_PRICE_BASIS_FIELD]) as number);
  const benchmarkData = chartPrice.map((p) => parseNum(p.benchmark) as number);
  const kmi30Data = chartPrice.map((p) => parseNum(p.kmi30) as number);

  const chartSeries = [
    { name: "MIIETF", data: miietfData, color: CHART_COLORS.miietf },
    { name: "Benchmark", data: benchmarkData, color: CHART_COLORS.benchmark },
    { name: "KMI30", data: kmi30Data, color: CHART_COLORS.kmi30 },
  ];

  const tableRows = raw.perf.map((p) => ({
    label: p.name,
    color:
      p.name === "MIIETF"
        ? CHART_COLORS.miietf
        : p.name === "Benchmark"
          ? CHART_COLORS.benchmark
          : CHART_COLORS.kmi30,
    mtd: pct2FromDecimal(p.mtd),
    ytd: pct2FromDecimal(p.ytd),
    d30: pct2FromDecimal(p["30d"]),
    d90: pct2FromDecimal(p["90d"]),
    y1: pct2FromDecimal(p["1y"]),
    sinceInception: pct2FromDecimal(p.inception),
  }));

  return {
    chartCategories,
    chartSeries,
    chartSubtitle: `${PERFORMANCE_PRICE_BASIS_LABEL}. March 2024 to present.`,
    yAxisTitle: PERFORMANCE_PRICE_BASIS_LABEL,
    valueSuffix: "",
    tableRows,
  };
}

/** Format value already in percentage (e.g. 21.03) as "21.03%". */
function pctAlready(v: number): string {
  return `${v.toFixed(2)}%`;
}

function transformPortfolio(raw: MiietfFundDataResponse): MiietfPortfolioFundData {
  const weightedExposure = (raw.weighted_expo ?? []).map((row, i) => ({
    sector: row.key,
    miietf: pctAlready(row.miietf),
    kmi30: pctAlready(row.kmi30),
    weight: pctAlready(row.weight),
    color: EXPOSURE_COLORS[i % EXPOSURE_COLORS.length],
    value: row.miietf,
  }));

  const topHoldings = (raw.holdings ?? []).slice(0, 10).map((h, i) => ({
    name: sanitizeHoldingName(h.key),
    percentage: pct2(h.holding),
    color: HOLDINGS_COLORS[i % HOLDINGS_COLORS.length],
    value: h.holding * 100,
  }));

  return {
    topHoldings,
    weightedExposure,
  };
}

function transformDistributions(raw: MiietfFundDataResponse): MiietfDistributionsFundData {
  return (raw.distribution ?? []).map((d) => ({
    date: formatDateDdMmYyyy(d.payout_date),
    pkrPerUnit: d.payout_per_unit.toFixed(2),
    exNav: formatMax4Dp(d.ex_nav),
    yieldPct: pct2FromDecimal(d.yield),
  }));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getMiietfFundDataForPage(): Promise<MiietfFundDataForPage | null> {
  const raw = await getMiietfFundData();
  if (!raw || raw.price.length === 0 || raw.perf.length === 0) return null;

  return {
    hero: transformHero(raw),
    overview: transformOverview(raw),
    performance: transformPerformance(raw),
    portfolio: transformPortfolio(raw),
    distributions: transformDistributions(raw),
  };
}

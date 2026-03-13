import {
  formatShortDate,
  formatDateDdMmYyyy,
} from "./formatters";

const FUND_DATA_API_BASE =
  process.env.NEXT_PUBLIC_FUND_DATA_API_BASE_URL ??
  "https://fdepprodmahaana-gkb9bdeehudhdedy.z02.azurefd.net";

const MICF_FUND_DATA_URL = `${FUND_DATA_API_BASE}/marketfeedinvestmentuniverse/api/fund-data?name=micf`;

// ---------------------------------------------------------------------------
// Raw API response types
// ---------------------------------------------------------------------------

export interface MicfFundDataPerfItem {
  name: string;
  mtd: number;
  ytd: number;
  "30d": number;
  "90d": number;
  "1y": number;
  inception: number;
}

export interface MicfFundDataPriceItem {
  date: string;
  nav: number;
  nav_adjusted: number;
  benchmark: number;
}

export interface MicfFundDataHolding {
  key: string;
  holding: number;
}

export interface MicfFundDataAssetAlloc {
  key: string;
  current_month: number;
  prev_month: number;
}

export interface MicfFundDataCreditQuality {
  key: string;
  value: number;
}

export interface MicfFundDataDistribution {
  payout_date: string;
  payout_per_unit: number;
  ex_nav: number;
  yield: number;
}

export interface MicfFundDataResponse {
  info: Record<string, string>;
  perf: MicfFundDataPerfItem[];
  price: MicfFundDataPriceItem[];
  holdings: MicfFundDataHolding[];
  asset_alloc: MicfFundDataAssetAlloc[];
  credit_quality: MicfFundDataCreditQuality[];
  distribution: MicfFundDataDistribution[];
}

// ---------------------------------------------------------------------------
// Page-ready (transformed) types for sections
// ---------------------------------------------------------------------------

export interface MicfHeroFundData {
  nav: string;
  navDate: string;
  mtd: string;
  assetClass: string;
  expenseRatioMtd: string;
  expenseRatioYtd: string;
  expenseRatioDate?: string;
}

export interface MicfOverviewFundData {
  summary: string;
  investmentObjective: string;
  keyFactsLeft: Array<{ label: string; value: string }>;
  keyFactsRight: Array<{ label: string; value: string }>;
}

export interface MicfPerformanceFundData {
  chartCategories: string[];
  chartSeries: Array<{ name: string; data: number[]; color: string }>;
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

export interface MicfPortfolioFundData {
  assetAllocation: Array<{
    item: string;
    currentMonth: string;
    previousMonth: string;
    color: string;
  }>;
  creditQuality: Array<{
    item: string;
    percentage: string;
    color: string;
    value: number;
  }>;
  topHoldings: Array<{
    name: string;
    percentage: string;
    color: string;
    value: number;
  }>;
}

export type MicfDistributionsFundData = Array<{
  date: string;
  pkrPerUnit: string;
  exNav: string;
  yieldPct: string;
}>;

export interface MicfFundDataForPage {
  hero: MicfHeroFundData;
  overview: MicfOverviewFundData;
  performance: MicfPerformanceFundData;
  portfolio: MicfPortfolioFundData;
  distributions: MicfDistributionsFundData;
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function getMicfFundData(): Promise<MicfFundDataResponse | null> {
  try {
    const res = await fetch(MICF_FUND_DATA_URL, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MICF fund API] Non-OK response:", res.status, res.statusText);
      }
      return null;
    }
    const data = (await res.json()) as MicfFundDataResponse;
    if (!data?.info || !Array.isArray(data.perf) || !Array.isArray(data.price)) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MICF fund API] Unexpected response shape");
      }
      return null;
    }
    return data;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[MICF fund API] Fetch error:", err);
    }
    return null;
  }
}

// ---------------------------------------------------------------------------
// Transform: helpers
// ---------------------------------------------------------------------------

const CHART_COLORS = {
  micf: "var(--color-info-200)",
  benchmark: "var(--color-teal-200)",
} as const;

const ASSET_ALLOC_COLORS = [
  "var(--color-info-200)",
  "var(--color-teal-200)",
  "var(--color-error-200)",
  "var(--color-warning-200)",
  "var(--color-primary-200)",
  "var(--color-info-150)",
] as const;

const CREDIT_QUALITY_COLORS: Record<string, string> = {
  AAA: "var(--color-info-200)",
  "AA+": "var(--color-teal-200)",
  AA: "var(--color-error-200)",
  A1: "var(--color-warning-200)",
  "A+": "var(--color-info-150)",
};

const HOLDINGS_COLORS = [
  "var(--color-info-200)",
  "var(--color-teal-200)",
  "var(--color-error-200)",
  "var(--color-warning-200)",
  "var(--color-primary-200)",
  "var(--color-info-150)",
] as const;

function pct2(v: number): string {
  return `${(v * 100).toFixed(2)}%`;
}

function pct2FromDecimal(v: number): string {
  return `${(v * 100).toFixed(2)}%`;
}

function infoVal(info: Record<string, string>, key: string): string {
  return info[key] ?? "";
}

function normalizeAssetAllocKey(key: string): string {
  const k = key.trim();
  if (/govt\s*securities/i.test(k) && /gop|ijarah/i.test(k))
    return "Govt Securities (GOP ijarah)";
  if (/bank\s*deposits/i.test(k)) return "Bank Deposits";
  if (/musharaka/i.test(k)) return "Musharaka ";
  if (/short\s*term\s*sukuk/i.test(k)) return "Short Term Sukuk";
  if (/bai\s*muajjal/i.test(k)) return "Bai Muajjal";
  if (/other\s*assets/i.test(k)) return "Other Assets";
  return k;
}

// ---------------------------------------------------------------------------
// Transform: sections
// ---------------------------------------------------------------------------

function transformHero(raw: MicfFundDataResponse): MicfHeroFundData {
  const info = raw.info;
  const lastPrice = raw.price.length > 0 ? raw.price[raw.price.length - 1] : null;
  const perfMicf = raw.perf.find((p) => p.name === "MICF");

  const nav = lastPrice ? lastPrice.nav.toFixed(4) : "";
  const navDate = lastPrice ? formatShortDate(lastPrice.date) : "";
  const mtd = perfMicf != null ? pct2FromDecimal(perfMicf.mtd) : "";
  const assetClass = infoVal(info, "Fund Category");
  const expenseRatioMtd = infoVal(info, "Monthly Total Expense Ratio");
  const expenseRatioYtd = infoVal(info, "Yearly Total Expense Ratio");
  const expenseRatioDate = infoVal(info, "Submission date");

  return {
    nav,
    navDate,
    mtd,
    assetClass,
    expenseRatioMtd: expenseRatioMtd ? `${expenseRatioMtd}% (MTD)` : "",
    expenseRatioYtd: expenseRatioYtd ? `${expenseRatioYtd}% (YTD)` : "",
    expenseRatioDate: expenseRatioDate ? formatShortDate(expenseRatioDate) : undefined,
  };
}

const OVERVIEW_LEFT_KEYS = [
  "Net Assets",
  "Launch Date",
  "Fund Category",
  "Benchmark",
  "Fund Auditors",
  "Custodian",
  "Shariah Advisors",
] as const;

function transformOverview(raw: MicfFundDataResponse): MicfOverviewFundData {
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
    { label: "Fund Stability Rating", value: infoVal(info, "Fund Stability Rating") },
    { label: "Fund Manager", value: infoVal(info, "Fund manager") },
    { label: "Management Fee", value: infoVal(info, "Management Fee") },
    {
      label: "Total Expense Ratio (without govt. levy)",
      value: mtdWithout && ytdWithout ? `${mtdWithout}% (MTD) | ${ytdWithout}% (YTD)` : "",
    },
    {
      label: "Total Expense Ratio (with govt. levy)",
      value: mtdWith && ytdWith ? `${mtdWith}% (MTD) | ${ytdWith}% (YTD)` : "",
    },
    {
      label: "Weighted Average Time to Maturity (Days)",
      value: infoVal(info, "Weighted Average Time to Maturity (Days)"),
    },
    { label: "Sales Load", value: infoVal(info, "Sales Load") },
  ];

  return {
    summary: infoVal(info, "Fund Summary"),
    investmentObjective: infoVal(info, "Investment Objective"),
    keyFactsLeft,
    keyFactsRight,
  };
}

/** Last N days of daily price data to show in the performance chart (avoids overcrowded x-axis). */
const PERFORMANCE_CHART_DAYS = 365;

function transformPerformance(raw: MicfFundDataResponse): MicfPerformanceFundData {
  const sortedPrice = [...raw.price].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const chartPrice = sortedPrice.slice(-PERFORMANCE_CHART_DAYS);
  const chartCategories = chartPrice.map((p) => formatShortDate(p.date));
  const micfData = chartPrice.map((p) => (p.nav / 100 - 1) * 100);
  const benchmarkData = chartPrice.map((p) => (p.benchmark / 100 - 1) * 100);

  const chartSeries = [
    { name: "MICF", data: micfData, color: CHART_COLORS.micf },
    { name: "Benchmark", data: benchmarkData, color: CHART_COLORS.benchmark },
  ];

  const tableRows = raw.perf.map((p) => ({
    label: p.name,
    color: p.name === "MICF" ? CHART_COLORS.micf : CHART_COLORS.benchmark,
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
    tableRows,
  };
}

function transformPortfolio(raw: MicfFundDataResponse): MicfPortfolioFundData {
  const assetAllocation = raw.asset_alloc.map((a, i) => ({
    item: normalizeAssetAllocKey(a.key),
    currentMonth: pct2(a.current_month),
    previousMonth: pct2(a.prev_month),
    color: ASSET_ALLOC_COLORS[i % ASSET_ALLOC_COLORS.length],
  }));

  const creditQuality = raw.credit_quality.map((c) => ({
    item: c.key,
    percentage: pct2(c.value),
    color: CREDIT_QUALITY_COLORS[c.key] ?? "var(--color-info-200)",
    value: c.value * 100,
  }));

  // Aggregate holdings by key (sum), then take top entries
  const holdingSums = new Map<string, number>();
  for (const h of raw.holdings) {
    const k = h.key.trim();
    holdingSums.set(k, (holdingSums.get(k) ?? 0) + h.holding);
  }
  const sortedHoldings = Array.from(holdingSums.entries())
    .map(([name, value]) => ({ name, value: value * 100 }))
    .sort((a, b) => b.value - a.value);

  const topN = 6;
  const topHoldings = sortedHoldings.slice(0, topN).map((h, i) => ({
    name: h.name,
    percentage: `${h.value.toFixed(2)}%`,
    color: HOLDINGS_COLORS[i % HOLDINGS_COLORS.length],
    value: h.value,
  }));

  return {
    assetAllocation,
    creditQuality,
    topHoldings,
  };
}

function transformDistributions(raw: MicfFundDataResponse): MicfDistributionsFundData {
  return raw.distribution.map((d) => ({
    date: formatDateDdMmYyyy(d.payout_date),
    pkrPerUnit: d.payout_per_unit.toFixed(3),
    exNav: d.ex_nav.toFixed(4),
    yieldPct: pct2FromDecimal(d.yield),
  }));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getMicfFundDataForPage(): Promise<MicfFundDataForPage | null> {
  const raw = await getMicfFundData();
  if (!raw || raw.price.length === 0 || raw.perf.length === 0) return null;

  return {
    hero: transformHero(raw),
    overview: transformOverview(raw),
    performance: transformPerformance(raw),
    portfolio: transformPortfolio(raw),
    distributions: transformDistributions(raw),
  };
}

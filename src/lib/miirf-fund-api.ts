import { formatShortDate, formatMonthYear, formatPctDisplay } from "./formatters";

const FUND_DATA_API_BASE =
  process.env.NEXT_PUBLIC_FUND_DATA_API_BASE_URL ??
  "https://fdepprodmahaana-gkb9bdeehudhdedy.z02.azurefd.net";

const MIIRF_FUND_DATA_URL = `${FUND_DATA_API_BASE}/marketfeedinvestmentuniverse/api/fund-data?name=miirf`;

/** Origin sent with MIIRF API requests so the API accepts requests from production. */
const MIIRF_API_ORIGIN = "https://www.mahaana.com";

// ---------------------------------------------------------------------------
// Raw API response types (API returns strings for numbers)
// ---------------------------------------------------------------------------

export interface MiirfMainPriceItem {
  date: string;
  Conservative: string;
  "Low Risk": string;
  Balanced: string;
  "Medium Risk": string;
  Aggressive: string;
}

export interface MiirfMainFundRaw {
  info: Record<string, string>;
  price: MiirfMainPriceItem[];
}

export interface MiirfSubfundPriceItem {
  date: string;
  nav: string;
  ad_nav: string;
  benchmark: string;
}

export interface MiirfPerfItemRaw {
  name: string;
  mtd: number | null;
  ytd: number | null;
  "30d": number | null;
  "90d": number | null;
  "1y": number | null;
  inception: number | null;
}

export interface MiirfAssetAllocItemRaw {
  key: string;
  current_month: number;
  prev_month: number;
}

export interface MiirfHoldingRaw {
  key: string;
  holding: number;
}

export interface MiirfSubfundRaw {
  info: Record<string, string>;
  asset_alloc?: MiirfAssetAllocItemRaw[];
  holdings?: MiirfHoldingRaw[];
  perf: MiirfPerfItemRaw[];
  price: MiirfSubfundPriceItem[];
  sector_holdings?: MiirfHoldingRaw[];
}

export interface MiirfFundDataResponse {
  miirf: MiirfMainFundRaw;
  miirfmmsf: MiirfSubfundRaw;
  miirfdsf: MiirfSubfundRaw;
  miirfesf: MiirfSubfundRaw;
}

// ---------------------------------------------------------------------------
// Page-ready (transformed) types for sections
// ---------------------------------------------------------------------------

export interface MiirfOverviewFundData {
  summary: string;
  investmentObjective: string;
  keyFactsLeft: Array<{ label: string; value: string }>;
  keyFactsRight: Array<{ label: string; value: string }>;
}

export interface MiirfPerformanceFundData {
  chartCategories: string[];
  chartSeries: Array<{ name: string; data: number[]; color: string }>;
}

const CHART_COLORS_MAIN = {
  conservative: "var(--color-info-200)",
  lowRisk: "var(--color-teal-200)",
  balanced: "var(--color-error-200)",
  mediumRisk: "var(--color-warning-200)",
  aggressive: "var(--color-primary-200)",
} as const;

const HOLDINGS_COLORS = [
  "var(--color-info-200)",
  "var(--color-teal-200)",
  "var(--color-error-200)",
  "var(--color-warning-200)",
  "var(--color-primary-200)",
  "var(--color-info-150)",
  "var(--color-teal-150)",
  "var(--color-error-150)",
  "var(--color-coral-150)",
  "var(--color-primary-150)",
] as const;

export type MiirfSubfundPieSource = "asset_alloc" | "sector_holdings";

export type MiirfPieSliceRow = {
  name: string;
  percentage: string;
  color: string;
  value: number;
};

export interface MiirfSubfundData {
  navLabel: "NAV" | "iNAV";
  nav: { value: string; asOf: string };
  riskReward: string;
  mtd: { value: string; asOf: string };
  expenseRatio: { mtd: string; ytd: string; asOf: string };
  productSummary: string;
  investmentObjective: string;
  keyFacts: Array<{ label: string; value: string }>;
  /** Pie + table rows (asset allocation, sector allocation, or legacy holdings shape). */
  topHoldings: MiirfPieSliceRow[];
  pieSectionTitle: string;
  pieNameColumnLabel: string;
  performanceChartData: Array<{ date: string; subfund: number; benchmark: number }>;
  performanceChartDomain: [number, number];
  performanceYAxisTitle: string;
  performanceValueSuffix: string;
  performanceChartSubtitleLead: string;
  /** Not sent from server (not serializable). Client adds locally if needed. */
  performanceChartFormatter?: (v: number | string) => string;
  performanceTable: {
    subfundLabel: string;
    benchmarkLabel: string;
    subfundColor: string;
    benchmarkColor: string;
    rows: Array<{ period: string; subfund: string; benchmark: string }>;
  };
}

export interface MiirfSubfundsFundData {
  moneyMarket: MiirfSubfundData;
  debt: MiirfSubfundData;
  equity: MiirfSubfundData;
}

export interface MiirfFundDataForPage {
  overview: MiirfOverviewFundData;
  performance: MiirfPerformanceFundData;
  subfunds: MiirfSubfundsFundData;
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function getMiirfFundData(): Promise<MiirfFundDataResponse | null> {
  try {
    const url = `${MIIRF_FUND_DATA_URL}&_t=${Date.now()}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Origin: MIIRF_API_ORIGIN,
      },
    });
    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MIIRF fund API] Non-OK response:", res.status, res.statusText);
      }
      return null;
    }
    const data = (await res.json()) as MiirfFundDataResponse;
    if (!data?.miirf?.info || !Array.isArray(data.miirf.price)) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MIIRF fund API] Unexpected response shape");
      }
      return null;
    }
    return data;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[MIIRF fund API] Fetch error:", err);
    }
    return null;
  }
}

// ---------------------------------------------------------------------------
// Transform: helpers
// ---------------------------------------------------------------------------

function infoVal(info: Record<string, string>, key: string): string {
  const v = info[key] ?? "";
  return v.trim() || "—";
}

function parseNum(s: string | number | null | undefined): number {
  if (s == null) return 0;
  if (typeof s === "number" && !Number.isNaN(s)) return s;
  const n = parseFloat(String(s));
  return Number.isNaN(n) ? 0 : n;
}

/** Net assets: raw is full PKR (e.g. 371672055.75) → "PKR 371.67mn" */
function formatNetAssets(raw: string): string {
  const n = parseNum(raw);
  if (n === 0) return "—";
  return `PKR ${(n / 1e6).toFixed(2)}mn`;
}

function pctFromDecimal(v: number | null | undefined): string {
  if (v == null || Number.isNaN(v)) return "—";
  return `${(v * 100).toFixed(2)}%`;
}

const RISK_LABELS: Record<string, string> = {
  "Money Market": "Low Risk",
  Debt: "Medium Risk",
  Equity: "High Risk",
};

const PLACEHOLDER_PIE_SLICE: MiirfPieSliceRow = {
  name: "—",
  percentage: "—",
  color: HOLDINGS_COLORS[0],
  value: 1,
};

function pieSlicesFromAssetAlloc(alloc: MiirfAssetAllocItemRaw[]): MiirfPieSliceRow[] {
  if (!alloc.length) return [PLACEHOLDER_PIE_SLICE];
  const sorted = [...alloc].sort((a, b) => b.current_month - a.current_month);
  return sorted.slice(0, 10).map((a, i) => ({
    name: a.key.trim() || "—",
    percentage: `${(a.current_month * 100).toFixed(2)}%`,
    color: HOLDINGS_COLORS[i % HOLDINGS_COLORS.length],
    value: a.current_month * 100,
  }));
}

function pieSlicesFromHoldingsLike(holdings: MiirfHoldingRaw[]): MiirfPieSliceRow[] {
  if (!holdings.length) return [PLACEHOLDER_PIE_SLICE];
  return holdings.slice(0, 10).map((h, i) => ({
    name: h.key.trim() || "—",
    percentage: `${(h.holding * 100).toFixed(2)}%`,
    color: HOLDINGS_COLORS[i % HOLDINGS_COLORS.length],
    value: h.holding * 100,
  }));
}

// ---------------------------------------------------------------------------
// Transform: Overview (main fund)
// ---------------------------------------------------------------------------

function transformOverview(raw: MiirfMainFundRaw): MiirfOverviewFundData {
  const info = raw.info;
  const keyFactsLeft: Array<{ label: string; value: string }> = [
    { label: "Net Assets", value: formatNetAssets(info["Net Assets (PKR mn)"]) },
    { label: "Launch Date", value: info["Launch Date"] ? formatShortDate(info["Launch Date"]) || "—" : "—" },
    { label: "Fund Auditors", value: infoVal(info, "Fund Auditors") },
  ];
  const keyFactsRight: Array<{ label: string; value: string }> = [
    { label: "Fund Manager", value: infoVal(info, "Fund manager") },
    { label: "Fund Type", value: infoVal(info, "Fund Type") },
    { label: "Trustee", value: infoVal(info, "Custodian") },
  ];
  return {
    summary: infoVal(info, "Fund Summary"),
    investmentObjective: infoVal(info, "Investment Objective"),
    keyFactsLeft,
    keyFactsRight,
  };
}

// ---------------------------------------------------------------------------
// Transform: Performance (main fund – 5 risk profiles, value-based PKR 1,000)
// ---------------------------------------------------------------------------

const MAIN_RISK_KEYS = ["Conservative", "Low Risk", "Balanced", "Medium Risk", "Aggressive"] as const;

const ASSUMED_INVESTMENT = 1000;

/** Value-based series: ASSUMED_INVESTMENT * (NAV at date / NAV at first date). */
function transformPerformance(raw: MiirfMainFundRaw): MiirfPerformanceFundData {
  const sorted = [...raw.price].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const categories = sorted.map((p) => formatShortDate(p.date));
  const series = MAIN_RISK_KEYS.map((key) => {
    const firstNav = sorted[0] ? parseNum((sorted[0] as unknown as Record<string, string>)[key]) : 1;
    const data = sorted.map((p) => {
      const nav = parseNum((p as unknown as Record<string, string>)[key]);
      if (firstNav <= 0) return 0;
      return ASSUMED_INVESTMENT * (nav / firstNav);
    });
    const colorKey = key === "Conservative" ? "conservative" : key === "Low Risk" ? "lowRisk" : key === "Balanced" ? "balanced" : key === "Medium Risk" ? "mediumRisk" : "aggressive";
    return {
      name: key,
      data,
      color: CHART_COLORS_MAIN[colorKey],
    };
  });
  return { chartCategories: categories, chartSeries: series };
}

// ---------------------------------------------------------------------------
// Transform: Subfund (single)
// ---------------------------------------------------------------------------

function transformSubfund(
  raw: MiirfSubfundRaw,
  subfundLabel: string,
  navLabel: "NAV" | "iNAV",
  pieSource: MiirfSubfundPieSource
): MiirfSubfundData {
  const info = raw.info;
  const price = raw.price ?? [];
  const sortedPrice = [...price].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const latest = sortedPrice[0];
  const navValue = latest ? (latest.nav || latest.ad_nav || "—") : "—";
  const navAsOf = latest ? `As of ${formatShortDate(latest.date)}` : "—";

  const perfSubfund = raw.perf?.find((p) => p.name.includes("MIIRF"));
  const perfBench = raw.perf?.find((p) => p.name === "Benchmark");
  const mtdVal = perfSubfund != null ? pctFromDecimal(perfSubfund.mtd) : "—";
  const mtdAsOf = latest ? `As of ${formatShortDate(latest.date)}` : "—";

  const mtdTerRaw = info["Monthly Total Expense Ratio"];
  const ytdTerRaw = info["Yearly Total Expense Ratio"];
  const terMtd = mtdTerRaw != null && mtdTerRaw !== "" ? `${formatPctDisplay(mtdTerRaw)} (MTD)` : "—";
  const terYtd = ytdTerRaw != null && ytdTerRaw !== "" ? `${formatPctDisplay(ytdTerRaw)} (YTD)` : "—";
  const submissionDate = info["Submission date"] ? formatShortDate(info["Submission date"]) : "";
  const expenseAsOf = submissionDate ? `As of ${submissionDate}` : "—";

  const category = info["Fund Category"] ?? "";
  const riskReward = RISK_LABELS[category] ?? "—";

  const keyFacts: Array<{ label: string; value: string }> = [
    { label: "Net assets", value: formatNetAssets(info["Net Assets (PKR mn)"]) },
    { label: "Launch date", value: info["Launch Date"] ? formatShortDate(info["Launch Date"]) : "—" },
    { label: "Fund category", value: infoVal(info, "Fund Category") },
    { label: "Fund auditors", value: infoVal(info, "Fund Auditors") },
    { label: "Fund manager", value: infoVal(info, "Fund manager") },
    { label: "Trustee", value: infoVal(info, "Custodian") },
    {
      label: "Management fee",
      value: (() => {
        const raw = info["Management Fee"];
        if (raw == null || String(raw).trim() === "") return "—";
        const n = parseNum(raw);
        if (Number.isNaN(n) || n < 0) return "—";
        const pct = n > 0 && n <= 1 ? n * 100 : n;
        return `${pct.toFixed(2)}% p.a`;
      })(),
    },
    {
      label: "Total Expense Ratio (without govt. levy)",
      value: (() => {
        const m = info["Monthly Total Expense Ratio (without gov levy)"];
        const y = info["Yearly Total Expense Ratio (without gov levy)"];
        if (m == null && y == null) return "—";
        const mStr = m != null && m !== "" ? `${formatPctDisplay(m)} (MTD)` : "";
        const yStr = y != null && y !== "" ? `${formatPctDisplay(y)} (YTD)` : "";
        return [mStr, yStr].filter(Boolean).join(" | ") || "—";
      })(),
    },
    {
      label: "Total Expense Ratio (with govt. levy)",
      value: terMtd !== "—" || terYtd !== "—" ? [terMtd, terYtd].filter((s) => s !== "—").join(" | ") : "—",
    },
    { label: "Sales load", value: infoVal(info, "Sales Load") || "NIL" },
    { label: "Benchmark", value: infoVal(info, "Benchmark") },
  ].map(({ label, value }) => ({ label, value: value || "—" }));

  const topHoldings =
    pieSource === "asset_alloc"
      ? pieSlicesFromAssetAlloc(raw.asset_alloc ?? [])
      : (() => {
          const sectors = raw.sector_holdings ?? [];
          return sectors.length > 0
            ? pieSlicesFromHoldingsLike(sectors)
            : pieSlicesFromHoldingsLike(raw.holdings ?? []);
        })();

  const pieSectionTitle = pieSource === "asset_alloc" ? "Asset allocation" : "Sector allocation";
  const pieNameColumnLabel = pieSource === "asset_alloc" ? "Asset class" : "Sector";

  const performanceYAxisTitle = navLabel === "NAV" ? "NAV / benchmark" : "iNAV / benchmark";
  const performanceValueSuffix = "";
  const performanceChartSubtitleLead = "Subfund vs benchmark unit values.";

  const sortedByDate = [...price].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const performanceChartData = sortedByDate.map((p) => {
    const nav = parseNum(p.nav || p.ad_nav);
    const bench = parseNum(p.benchmark);
    return {
      date: formatShortDate(p.date),
      subfund: nav,
      benchmark: bench,
    };
  });

  const perfRows = [
    { period: "MTD", subfund: pctFromDecimal(perfSubfund?.mtd), benchmark: pctFromDecimal(perfBench?.mtd) },
    { period: "YTD", subfund: pctFromDecimal(perfSubfund?.ytd), benchmark: pctFromDecimal(perfBench?.ytd) },
    { period: "30D", subfund: pctFromDecimal(perfSubfund?.["30d"]), benchmark: pctFromDecimal(perfBench?.["30d"]) },
    { period: "90D", subfund: pctFromDecimal(perfSubfund?.["90d"]), benchmark: pctFromDecimal(perfBench?.["90d"]) },
    { period: "1Y", subfund: pctFromDecimal(perfSubfund?.["1y"]), benchmark: pctFromDecimal(perfBench?.["1y"]) },
    { period: "Since inception", subfund: pctFromDecimal(perfSubfund?.inception), benchmark: pctFromDecimal(perfBench?.inception) },
  ];

  const perfVals = performanceChartData.flatMap((d) => [d.subfund, d.benchmark]);
  const minVal = perfVals.length ? Math.min(...perfVals) : 0;
  const maxVal = perfVals.length ? Math.max(...perfVals) : 1;
  const span = maxVal - minVal || 1;
  const pad = Math.max(span * 0.08, 0.05);
  const performanceChartDomain: [number, number] = [minVal - pad, maxVal + pad];

  return {
    navLabel,
    nav: { value: navValue, asOf: navAsOf },
    riskReward,
    mtd: { value: mtdVal, asOf: mtdAsOf },
    expenseRatio: { mtd: terMtd, ytd: terYtd, asOf: expenseAsOf },
    productSummary: infoVal(info, "Fund Summary"),
    investmentObjective: infoVal(info, "Investment Objective"),
    keyFacts,
    topHoldings,
    pieSectionTitle,
    pieNameColumnLabel,
    performanceChartData,
    performanceChartDomain,
    performanceYAxisTitle,
    performanceValueSuffix,
    performanceChartSubtitleLead,
    performanceTable: {
      subfundLabel,
      benchmarkLabel: "Benchmark",
      subfundColor: "var(--color-info-200)",
      benchmarkColor: "var(--color-teal-200)",
      rows: perfRows,
    },
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getMiirfFundDataForPage(): Promise<MiirfFundDataForPage | null> {
  const raw = await getMiirfFundData();
  if (!raw?.miirf?.price?.length) return null;
  if (!raw.miirfmmsf || !raw.miirfdsf || !raw.miirfesf) return null;

  const overview = transformOverview(raw.miirf);
  const performance = transformPerformance(raw.miirf);
  const moneyMarket = transformSubfund(raw.miirfmmsf, "MIIRF (Money Market)", "iNAV", "asset_alloc");
  const debt = transformSubfund(raw.miirfdsf, "MIIRF (Debt)", "NAV", "asset_alloc");
  const equity = transformSubfund(raw.miirfesf, "MIIRF (Equity)", "iNAV", "sector_holdings");

  return {
    overview,
    performance,
    subfunds: { moneyMarket, debt, equity },
  };
}

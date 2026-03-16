import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { getMicfFundDataForPage } from "@/lib/micf-fund-api";
import { getFaqByProduct, getFundDocuments } from "@/lib/sanity/fetch";
import { FAQStructuredData } from "@/components/FAQStructuredData";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { MICFFAQSection } from "@/components/sections/MICFFAQSection";
import { MICFHero } from "@/components/sections/MICFHero";
import { MICFOverviewSection } from "@/components/sections/MICFOverviewSection";
import { MICFDistributionsSection } from "@/components/sections/MICFDistributionsSection";
import { MICFFundLiteratureSection } from "@/components/sections/MICFFundLiteratureSection";

const MICFPerformanceSection = nextDynamic(
  () => import("@/components/sections/MICFPerformanceSection").then((m) => ({ default: m.MICFPerformanceSection })),
  { ssr: true }
);
const MICFPortfolioSection = nextDynamic(
  () => import("@/components/sections/MICFPortfolioSection").then((m) => ({ default: m.MICFPortfolioSection })),
  { ssr: true }
);

export const metadata: Metadata = buildPageMetadata({
  title: "MICF | Mahaana",
  description:
    "Mahaana Islamic Cash Fund (MICF) — SECP-regulated, Shariah compliant money market fund. Low risk, daily returns, and instant liquidity. Invest from PKR 5,000.",
  path: "micf",
});

/** Revalidate at most every 24 hours so fund data API is run daily and NAV/performance values stay current without manual updates. */
export const revalidate = 86400;

export default async function MICFPage() {
  const [fundData, faqItems, fundDocs] = await Promise.all([
    getMicfFundDataForPage(),
    getFaqByProduct("micf"),
    getFundDocuments("micf"),
  ]);
  const documents = fundDocs.map((d) => ({
    title: d.title ?? "",
    fileUrl: d.fileUrl ?? null,
    category: d.category ?? "",
    publishDate: d.publishDate ?? null,
  }));
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <BreadcrumbStructuredData items={[{ name: "MICF", path: "micf" }]} />
      <FAQStructuredData items={faqItems} />
      <MICFHero fundData={fundData?.hero} />
      <MICFOverviewSection fundData={fundData?.overview} />
      <MICFPerformanceSection fundData={fundData?.performance} />
      <MICFPortfolioSection fundData={fundData?.portfolio} />
      <MICFDistributionsSection fundData={fundData?.distributions} />
      <MICFFundLiteratureSection documents={documents} />
      <MICFFAQSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}

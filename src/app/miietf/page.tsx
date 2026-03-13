import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { getMiietfFundDataForPage } from "@/lib/miietf-fund-api";
import { getFaqByProduct, getFundDocuments } from "@/lib/sanity/fetch";
import { MIIETFHero } from "@/components/sections/MIIETFHero";
import { MIIETFOverviewSection } from "@/components/sections/MIIETFOverviewSection";

const MIIETFPerformanceSection = nextDynamic(
  () => import("@/components/sections/MIIETFPerformanceSection").then((m) => ({ default: m.MIIETFPerformanceSection })),
  { ssr: true }
);
const MIIETFPortfolioSection = nextDynamic(
  () => import("@/components/sections/MIIETFPortfolioSection").then((m) => ({ default: m.MIIETFPortfolioSection })),
  { ssr: true }
);
const MIIETFDistributionsSection = nextDynamic(
  () => import("@/components/sections/MIIETFDistributionsSection").then((m) => ({ default: m.MIIETFDistributionsSection })),
  { ssr: true }
);
const MIIETFFundLiteratureSection = nextDynamic(
  () => import("@/components/sections/MIIETFFundLiteratureSection").then((m) => ({ default: m.MIIETFFundLiteratureSection })),
  { ssr: true }
);
const MIIETFFAQSection = nextDynamic(
  () => import("@/components/sections/MIIETFFAQSection").then((m) => ({ default: m.MIIETFFAQSection })),
  { ssr: true }
);
const Cta6Section = nextDynamic(
  () => import("@/components/sections/Cta6Section").then((m) => ({ default: m.Cta6Section })),
  { ssr: true }
);

export const metadata: Metadata = buildPageMetadata({
  title: "MIIETF | Mahaana",
  description: "Discover MIIETF with Mahaana. More details coming soon.",
  path: "miietf",
});

/** Revalidate at most every 24 hours so fund data API is run daily and NAV/performance values stay current without manual updates. */
export const revalidate = 86400;

export default async function MIIETFPage() {
  const [fundData, faqItems, fundDocs] = await Promise.all([
    getMiietfFundDataForPage(),
    getFaqByProduct("miietf"),
    getFundDocuments("miietf"),
  ]);
  const documents = fundDocs.map((d) => ({
    title: d.title ?? "",
    fileUrl: d.fileUrl ?? null,
    category: d.category ?? "",
    publishDate: d.publishDate ?? null,
  }));
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <MIIETFHero fundData={fundData?.hero} />
      <MIIETFOverviewSection fundData={fundData?.overview} />
      <MIIETFPerformanceSection fundData={fundData?.performance} />
      <MIIETFPortfolioSection fundData={fundData?.portfolio} />
      <MIIETFDistributionsSection fundData={fundData?.distributions} />
      <MIIETFFundLiteratureSection documents={documents} />
      <MIIETFFAQSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}

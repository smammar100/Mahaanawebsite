import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { getMiirfFundDataForPage } from "@/lib/miirf-fund-api";
import { getFaqByProduct, getFundDocuments } from "@/lib/sanity/fetch";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { MIIRFFAQSection } from "@/components/sections/MIIRFFAQSection";
import { MIIRFHero } from "@/components/sections/MIIRFHero";
import { MIIRFOverviewSection } from "@/components/sections/MIIRFOverviewSection";
import { MIIRFFundLiteratureSection } from "@/components/sections/MIIRFFundLiteratureSection";

const MIIRFSubfundsSection = dynamic(
  () => import("@/components/sections/MIIRFSubfundsSection").then((m) => ({ default: m.MIIRFSubfundsSection })),
  { ssr: true }
);
const MIIRFPerformanceSection = dynamic(
  () => import("@/components/sections/MIIRFPerformanceSection").then((m) => ({ default: m.MIIRFPerformanceSection })),
  { ssr: true }
);

export const metadata: Metadata = buildPageMetadata({
  title: "MIIRF | Mahaana",
  description: "Discover MIIRF with Mahaana. More details coming soon.",
  path: "miirf",
});

/** Revalidate at most every 24 hours so fund data API is run daily and NAV/performance values stay current. */
export const revalidate = 86400;

export default async function MIIRFPage() {
  const [fundData, faqItems, fundDocs] = await Promise.all([
    getMiirfFundDataForPage(),
    getFaqByProduct("miirf"),
    getFundDocuments("miirf"),
  ]);
  const documents = fundDocs.map((d) => ({
    title: d.title ?? "",
    fileUrl: d.fileUrl ?? null,
    category: d.category ?? "",
    publishDate: d.publishDate ?? null,
  }));
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <MIIRFHero />
      <MIIRFOverviewSection fundData={fundData?.overview} />
      <MIIRFPerformanceSection fundData={fundData?.performance} />
      <MIIRFSubfundsSection fundData={fundData?.subfunds} />
      <MIIRFFundLiteratureSection documents={documents} />
      <MIIRFFAQSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}

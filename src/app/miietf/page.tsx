import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getFaqByProduct, getFundDocuments } from "@/lib/sanity/fetch";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { MIIETFFAQSection } from "@/components/sections/MIIETFFAQSection";
import { MIIETFHero } from "@/components/sections/MIIETFHero";
import { MIIETFOverviewSection } from "@/components/sections/MIIETFOverviewSection";
import { MIIETFPerformanceSection } from "@/components/sections/MIIETFPerformanceSection";
import { MIIETFDistributionsSection } from "@/components/sections/MIIETFDistributionsSection";
import { MIIETFFundLiteratureSection } from "@/components/sections/MIIETFFundLiteratureSection";
import { MIIETFPortfolioSection } from "@/components/sections/MIIETFPortfolioSection";

export const metadata: Metadata = buildPageMetadata({
  title: "MIIETF | Mahaana",
  description: "Discover MIIETF with Mahaana. More details coming soon.",
  path: "miietf",
});

/** Always fetch fresh fund documents from Sanity (no static cache). */
export const revalidate = 0;

/** Force server render on every request so fund documents are never stale. */
export const dynamic = "force-dynamic";

export default async function MIIETFPage() {
  const [faqItems, fundDocs] = await Promise.all([
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
      <MIIETFHero />
      <MIIETFOverviewSection />
      <MIIETFPerformanceSection />
      <MIIETFPortfolioSection />
      <MIIETFDistributionsSection />
      <MIIETFFundLiteratureSection documents={documents} />
      <MIIETFFAQSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}

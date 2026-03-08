import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { MICFFAQSection } from "@/components/sections/MICFFAQSection";
import { MICFHero } from "@/components/sections/MICFHero";
import { MICFOverviewSection } from "@/components/sections/MICFOverviewSection";
import { MICFPerformanceSection } from "@/components/sections/MICFPerformanceSection";
import { MICFDistributionsSection } from "@/components/sections/MICFDistributionsSection";
import { MICFFundLiteratureSection } from "@/components/sections/MICFFundLiteratureSection";
import { MICFPortfolioSection } from "@/components/sections/MICFPortfolioSection";

export const metadata: Metadata = buildPageMetadata({
  title: "MICF | Mahaana",
  description: "Discover MICF with Mahaana. More details coming soon.",
  path: "micf",
});

export default function MICFPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <MICFHero />
      <MICFOverviewSection />
      <MICFPerformanceSection />
      <MICFPortfolioSection />
      <MICFDistributionsSection />
      <MICFFundLiteratureSection />
      <MICFFAQSection />
      <Cta6Section />
    </div>
  );
}

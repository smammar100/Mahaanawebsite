import type { Metadata } from "next";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { MIIETFFAQSection } from "@/components/sections/MIIETFFAQSection";
import { MIIETFHero } from "@/components/sections/MIIETFHero";
import { MIIETFOverviewSection } from "@/components/sections/MIIETFOverviewSection";
import { MIIETFPerformanceSection } from "@/components/sections/MIIETFPerformanceSection";
import { MIIETFDistributionsSection } from "@/components/sections/MIIETFDistributionsSection";
import { MIIETFFundLiteratureSection } from "@/components/sections/MIIETFFundLiteratureSection";
import { MIIETFPortfolioSection } from "@/components/sections/MIIETFPortfolioSection";

export const metadata: Metadata = {
  title: "MIIETF | Mahaana",
  description:
    "Discover MIIETF with Mahaana. More details coming soon.",
};

export default function MIIETFPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <MIIETFHero />
      <MIIETFOverviewSection />
      <MIIETFPerformanceSection />
      <MIIETFPortfolioSection />
      <MIIETFDistributionsSection />
      <MIIETFFundLiteratureSection />
      <MIIETFFAQSection />
      <Cta6Section />
    </div>
  );
}

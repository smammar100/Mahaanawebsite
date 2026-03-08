import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutCultureSection } from "@/components/sections/AboutCultureSection";
import { AboutMissionSection } from "@/components/sections/AboutMissionSection";
import { AboutValuesSection } from "@/components/sections/AboutValuesSection";
import { AboutTeamSection } from "@/components/sections/AboutTeamSection";
import { AboutBoardSection } from "@/components/sections/AboutBoardSection";
import { AboutNewsSection } from "@/components/sections/AboutNewsSection";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Cta6Section } from "@/components/sections/Cta6Section";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Mahaana",
  description:
    "Learn about Mahaana — Pakistan's leading SECP-licensed, Shariah-compliant investment platform. Our mission, team, and how we're changing the way Pakistanis invest.",
  path: "about",
});

export default function AboutUsPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] overflow-x-hidden bg-surface-bg">
      <AboutHero />
      <LogoStrip />
      <AboutCultureSection />
      <AboutMissionSection />
      <AboutValuesSection />
      <AboutTeamSection />
      <AboutBoardSection />
      <AboutNewsSection />
      <TestimonialsSection viewAllHref="/reviews" />
      <Cta6Section />
    </div>
  );
}

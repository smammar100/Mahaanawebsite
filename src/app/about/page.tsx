import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/sections/AboutHero";
import { LogoStrip } from "@/components/sections/LogoStrip";

const AboutCultureSection = dynamic(
  () => import("@/components/sections/AboutCultureSection").then((m) => ({ default: m.AboutCultureSection })),
  { ssr: true }
);
const AboutMissionSection = dynamic(
  () => import("@/components/sections/AboutMissionSection").then((m) => ({ default: m.AboutMissionSection })),
  { ssr: true }
);
const AboutValuesSection = dynamic(
  () => import("@/components/sections/AboutValuesSection").then((m) => ({ default: m.AboutValuesSection })),
  { ssr: true }
);
const AboutTeamSection = dynamic(
  () => import("@/components/sections/AboutTeamSection").then((m) => ({ default: m.AboutTeamSection })),
  { ssr: true }
);
const AboutBoardSection = dynamic(
  () => import("@/components/sections/AboutBoardSection").then((m) => ({ default: m.AboutBoardSection })),
  { ssr: true }
);
const AboutNewsSection = dynamic(
  () => import("@/components/sections/AboutNewsSection").then((m) => ({ default: m.AboutNewsSection })),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: true }
);
const Cta6Section = dynamic(
  () => import("@/components/sections/Cta6Section").then((m) => ({ default: m.Cta6Section })),
  { ssr: true }
);

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

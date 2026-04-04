import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { getLatestNewsPosts } from "@/lib/sanity/fetch";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMissionValuesSection } from "@/components/sections/AboutMissionValuesSection";
import { BlogSection } from "@/components/sections/BlogSection";

const AboutTeamSection = dynamic(
  () => import("@/components/sections/AboutTeamSection").then((m) => ({ default: m.AboutTeamSection })),
  { ssr: true }
);
const AboutBoardSection = dynamic(
  () => import("@/components/sections/AboutBoardSection").then((m) => ({ default: m.AboutBoardSection })),
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
    "Learn about Mahaana — Pakistan's leading SECP-licensed, Shariah compliant investment platform. Our mission and values, team, and how we're changing the way Pakistanis invest.",
  path: "about",
});

export default async function AboutUsPage() {
  const latestNews = await getLatestNewsPosts();

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] overflow-x-clip bg-surface-bg">
      <BreadcrumbStructuredData items={[{ name: "About Us", path: "about" }]} />
      <AboutHero />
      <AboutMissionValuesSection />
      <AboutTeamSection />
      <AboutBoardSection />
      <BlogSection
        posts={latestNews}
        allowEmpty
        emptyMessage="No news posts yet. Check back soon or browse all content on Investor education."
        heading="Latest news about Mahaana"
        eyebrow="In the news"
        description="Press, announcements, and media coverage featuring Mahaana"
        viewAllHref="/investor-education"
        viewAllLabel="View all news"
      />
      <TestimonialsSection />
      <Cta6Section />
    </div>
  );
}

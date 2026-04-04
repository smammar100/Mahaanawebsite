import { AboutFigmaHero } from "@/components/sections/about-figma/AboutFigmaHero";
import { AboutFigmaVisibility } from "@/components/sections/about-figma/AboutFigmaVisibility";
import { AboutFigmaTestimonials } from "@/components/sections/about-figma/AboutFigmaTestimonials";
import { AboutTeamSection } from "@/components/sections/AboutTeamSection";
import { AboutBoardSection } from "@/components/sections/AboutBoardSection";
import { Cta6Section } from "@/components/sections/Cta6Section";
import type { BlogPostForSection } from "@/lib/sanity/fetch";

interface AboutFigmaPageProps {
  newsPosts: BlogPostForSection[];
}

export function AboutFigmaPage({ newsPosts }: AboutFigmaPageProps) {
  return (
    <>
      <AboutFigmaHero />
      <AboutFigmaVisibility newsPosts={newsPosts} />
      <AboutTeamSection />
      <AboutBoardSection />
      <AboutFigmaTestimonials />
      <Cta6Section />
    </>
  );
}

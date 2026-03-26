"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { H1 } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import type { InsightsCategory, InsightsPageData } from "@/lib/insights-data";
import { InsightsFeaturedHero } from "@/components/sections/insights/InsightsFeaturedHero";
import {
  InsightsFilterPills,
  type InsightsPillValue,
} from "@/components/sections/insights/InsightsFilterPills";
import { InsightsArticleGridSection } from "@/components/sections/insights/InsightsArticleGridSection";
import { InsightsNewsletterCTA } from "@/components/sections/insights/InsightsNewsletterCTA";
import { CallToAction1 } from "@/components/ui/call-to-action-1";
import { insightsCategoryViewAllPath } from "@/lib/insights-category-routes";

interface InsightsPageClientProps {
  data: InsightsPageData;
}

export function InsightsPageClient({ data }: InsightsPageClientProps) {
  const [activePill, setActivePill] = useState<InsightsPillValue>("All");

  /** All hub sections when "All"; otherwise narrow to one category. */
  const singleCategory = useMemo((): InsightsCategory | null => {
    if (activePill === "All") return null;
    return activePill;
  }, [activePill]);

  const {
    featuredArticles,
    investingArticles,
    personalFinanceArticles,
    marketViewsArticles,
    allArticles,
  } = data;

  const heroArticle = featuredArticles[0] ?? null;
  const sideArticles = featuredArticles.slice(1, 4);

  const showHubExtras = singleCategory === null;

  const showFeatured =
    showHubExtras && (heroArticle !== null || sideArticles.length > 0);
  const showNewsletter = showHubExtras;

  const showInvestingSection =
    singleCategory === null || singleCategory === "Investing";

  const showPersonalFinanceSection =
    singleCategory === null || singleCategory === "Personal Finance";

  const showMarketViewsSection =
    singleCategory === null || singleCategory === "Market Views";

  const hasContent = allArticles.length > 0;

  const categoryPills = (
    <InsightsFilterPills
      activePill={activePill}
      onPillChange={setActivePill}
    />
  );

  if (!hasContent) {
    return (
      <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
        <Container className="py-16">
          <H1 className="mb-6 text-3xl text-text-primary sm:text-4xl">
            {cleanCopy("Investor Education")}
          </H1>
          <div className="mb-8">{categoryPills}</div>
          <p className="text-center text-text-tertiary">
            {cleanCopy(
              "No articles yet. Check back soon or visit our blog from the home page."
            )}
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <Container className="pt-[120px] pb-8 md:pb-10">
        <H1 className="mb-6 text-3xl text-text-primary sm:text-4xl">
          {cleanCopy("Investor Education")}
        </H1>
        <div className="mb-8 lg:mb-10">{categoryPills}</div>

        <div className="space-y-14 lg:space-y-16">
          {showFeatured && (
            <AnimatedSection>
              <InsightsFeaturedHero
                heroArticle={heroArticle}
                sideArticles={sideArticles}
              />
            </AnimatedSection>
          )}

          {showNewsletter && (
            <AnimatedSection>
              <InsightsNewsletterCTA />
            </AnimatedSection>
          )}

          {showInvestingSection && (
            <AnimatedSection>
              <InsightsArticleGridSection
                title="Investing"
                viewAllHref={insightsCategoryViewAllPath("Investing")}
                articles={investingArticles}
              />
            </AnimatedSection>
          )}

          {showPersonalFinanceSection && (
            <AnimatedSection className="border-t border-surface-stroke pt-14 lg:pt-16">
              <InsightsArticleGridSection
                title="Videos & Podcasts"
                viewAllHref={insightsCategoryViewAllPath("Personal Finance")}
                articles={personalFinanceArticles}
              />
            </AnimatedSection>
          )}

          {showMarketViewsSection && (
            <AnimatedSection className="border-t border-surface-stroke pt-14 lg:pt-16">
              <InsightsArticleGridSection
                title="Latest News"
                viewAllHref={insightsCategoryViewAllPath("Market Views")}
                articles={marketViewsArticles}
              />
            </AnimatedSection>
          )}

          <AnimatedSection className="pb-8">
            <CallToAction1 />
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
}

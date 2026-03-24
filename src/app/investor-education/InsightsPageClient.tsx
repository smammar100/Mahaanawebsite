"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cleanCopy } from "@/lib/copy-utils";
import type { InsightsPageData, InsightsArticle } from "@/lib/insights-data";
import { InsightsFeaturedHero } from "@/components/sections/insights/InsightsFeaturedHero";
import { InsightsMostPopular } from "@/components/sections/insights/InsightsMostPopular";
import {
  InsightsFilterPills,
  type InsightsPillValue,
} from "@/components/sections/insights/InsightsFilterPills";
import { InsightsArticleGridSection } from "@/components/sections/insights/InsightsArticleGridSection";
import { CallToAction1 } from "@/components/ui/call-to-action-1";
import { insightsCategoryViewAllPath } from "@/lib/insights-category-routes";

interface InsightsPageClientProps {
  data: InsightsPageData;
}

type InsightsTabValue =
  | "All"
  | "Investing"
  | "Personal Finance"
  | "Market Views"
  | "Solutions"
  | "Private Wealth";

export function InsightsPageClient({ data }: InsightsPageClientProps) {
  const activeTab = "All" as InsightsTabValue;
  const [activePill, setActivePill] = useState<InsightsPillValue>("All");

  const {
    featuredArticles,
    mostPopularArticles,
    investingArticles,
    personalFinanceArticles,
    marketViewsArticles,
    allArticles,
  } = data;

  // Featured hero: latest 4 items from investor education (1 hero + 3 side)
  const heroArticle = featuredArticles[0] ?? null;
  const sideArticles = featuredArticles.slice(1, 4);

  const filteredByPill = useMemo(() => {
    if (activePill === "All") return allArticles;
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(activePill.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(activePill.toLowerCase())
    );
  }, [allArticles, activePill]);

  const investingFiltered = useMemo(
    () =>
      activeTab === "All" || activeTab === "Investing"
        ? activePill === "All"
          ? investingArticles
          : filteredByPill.filter((a) => a.category === "Investing")
        : [],
    [activeTab, activePill, investingArticles, filteredByPill]
  );
  const personalFinanceFiltered = useMemo(
    () =>
      activeTab === "All" || activeTab === "Personal Finance"
        ? activePill === "All"
          ? personalFinanceArticles
          : filteredByPill.filter((a) => a.category === "Personal Finance")
        : [],
    [activeTab, activePill, personalFinanceArticles, filteredByPill]
  );
  const marketViewsFiltered = useMemo(
    () =>
      activeTab === "All" || activeTab === "Market Views"
        ? activePill === "All"
          ? marketViewsArticles
          : filteredByPill.filter((a) => a.category === "Market Views")
        : [],
    [activeTab, activePill, marketViewsArticles, filteredByPill]
  );

  const showFeatured = activeTab === "All";
  const showMostPopular = activeTab === "All";
  const showInvestingSection =
    activeTab === "All" || activeTab === "Investing";
  const showPersonalFinanceSection =
    activeTab === "All" || activeTab === "Personal Finance";
  const showMarketViewsSection =
    activeTab === "All" || activeTab === "Market Views";
  const showSolutionsSection = activeTab === "Solutions";
  const showPrivateWealthSection = activeTab === "Private Wealth";

  const hasContent =
    featuredArticles.length > 0 ||
    mostPopularArticles.length > 0 ||
    investingArticles.length > 0 ||
    personalFinanceArticles.length > 0 ||
    marketViewsArticles.length > 0;

  if (!hasContent) {
    return (
      <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
        <Container className="py-16">
          <p className="text-center text-text-tertiary">
            {cleanCopy("No articles yet. Check back soon or visit our blog from the home page.")}
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <Container className="pt-[120px] pb-8 md:pb-10">
        <div className="space-y-14 lg:space-y-16">
          {showFeatured && (heroArticle || sideArticles.length > 0) && (
            <AnimatedSection>
              <InsightsFeaturedHero
                heroArticle={heroArticle}
                sideArticles={sideArticles}
              />
            </AnimatedSection>
          )}

          {showMostPopular && mostPopularArticles.length > 0 && (
            <AnimatedSection>
              <InsightsMostPopular articles={mostPopularArticles} />
            </AnimatedSection>
          )}

          <AnimatedSection>
            <InsightsFilterPills
              activePill={activePill}
              onPillChange={setActivePill}
            />
          </AnimatedSection>

          {showInvestingSection && (
            <AnimatedSection>
              <InsightsArticleGridSection
                title="Articles"
                viewAllHref={insightsCategoryViewAllPath("Investing")}
                articles={investingFiltered}
              />
            </AnimatedSection>
          )}

          {showPersonalFinanceSection && (
            <AnimatedSection className="border-t border-surface-stroke pt-14 lg:pt-16">
              <InsightsArticleGridSection
                title="Videos and Podcast"
                viewAllHref={insightsCategoryViewAllPath("Personal Finance")}
                articles={personalFinanceFiltered}
              />
            </AnimatedSection>
          )}

          {showMarketViewsSection && (
            <AnimatedSection className="border-t border-surface-stroke pt-14 lg:pt-16">
              <InsightsArticleGridSection
                title="Latest News"
                viewAllHref={insightsCategoryViewAllPath("Market Views")}
                articles={marketViewsFiltered}
              />
            </AnimatedSection>
          )}

          {showSolutionsSection && (
            <AnimatedSection className="border-t border-surface-stroke pt-14 lg:pt-16">
              <InsightsArticleGridSection
                title="Solutions"
                viewAllHref={insightsCategoryViewAllPath("Solutions")}
                articles={[]}
              />
            </AnimatedSection>
          )}

          {showPrivateWealthSection && (
            <AnimatedSection className="border-t border-surface-stroke pt-14 lg:pt-16">
              <InsightsArticleGridSection
                title="Private Wealth"
                viewAllHref={insightsCategoryViewAllPath("Private Wealth")}
                articles={[]}
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

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { INSIGHTS_CATEGORY_SLUGS } from "@/lib/insights-category-routes";
import {
  getInvestorEducationSitemapEntries,
  getJobSitemapEntries,
} from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Exclude noindex routes: /style-guide, /studio (see robots.ts).
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/save-plus", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/retirement", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/micf", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/miietf", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/miirf", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/investment-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/retirement-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/help-center", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/security", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/reviews", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/investor-education", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/careers", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/legal", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms-conditions", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticEntries = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const articleEntriesRaw = await getInvestorEducationSitemapEntries();
  const articleEntries = articleEntriesRaw.map((entry) => ({
    url: `${SITE_URL}/investor-education/${entry.slug}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const investorEducationCategoryEntries = INSIGHTS_CATEGORY_SLUGS.map(
    (slug) => ({
      url: `${SITE_URL}/investor-education/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })
  );

  const jobEntriesRaw = await getJobSitemapEntries();
  const jobEntries = jobEntriesRaw.map((entry) => ({
    url: `${SITE_URL}/careers/${entry.slug}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.45,
  }));

  return [
    ...staticEntries,
    ...investorEducationCategoryEntries,
    ...articleEntries,
    ...jobEntries,
  ];
}

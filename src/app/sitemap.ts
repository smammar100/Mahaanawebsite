import type { MetadataRoute } from "next";
import { getInvestorEducationSlugs } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mahaana.com";

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
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const slugs = await getInvestorEducationSlugs();
  const articleEntries = slugs.map((slug) => ({
    url: `${baseUrl}/investor-education/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getLatestBlogPosts } from "@/lib/sanity/fetch";
import { InvestHero } from "@/components/sections/InvestHero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { HomeBelowFold } from "@/components/sections/HomeBelowFold";

export const metadata: Metadata = buildPageMetadata({
  title: "Mahaana — Changing the way Pakistanis Invest",
  description:
    "Mahaana is Pakistan's leading SECP-licensed, Shariah compliant investment platform. Earn daily returns, plan your retirement, and grow your wealth — starting from PKR 5,000.",
  path: "",
});

export default async function Home() {
  const blogPosts = await getLatestBlogPosts();

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <InvestHero />
      <LogoStrip />
      <HomeBelowFold posts={blogPosts} />
    </div>
  );
}

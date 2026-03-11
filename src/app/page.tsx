import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { getLatestBlogPosts } from "@/lib/sanity/fetch";
import { LogoStrip } from "@/components/sections/LogoStrip";

const InvestHero = dynamic(
  () => import("@/components/sections/InvestHero").then((m) => ({ default: m.InvestHero })),
  { ssr: true }
);

const WhyMahaanaTrade = dynamic(
  () => import("@/components/sections/WhyMahaanaTrade").then((m) => m.WhyMahaanaTrade),
  { ssr: true }
);
const FeatureCards = dynamic(
  () => import("@/components/sections/FeatureCards").then((m) => m.FeatureCards),
  { ssr: true }
);
const FeaturesSection = dynamic(
  () => import("@/components/sections/FeaturesSection").then((m) => m.FeaturesSection),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
  { ssr: true }
);
const ComplianceSection = dynamic(
  () => import("@/components/sections/ComplianceSection").then((m) => m.ComplianceSection),
  { ssr: true }
);
const BlogSection = dynamic(
  () => import("@/components/sections/BlogSection").then((m) => m.BlogSection),
  { ssr: true }
);
const Cta6Section = dynamic(
  () => import("@/components/sections/Cta6Section").then((m) => m.Cta6Section),
  { ssr: true }
);

export const metadata: Metadata = buildPageMetadata({
  title: "Mahaana — Changing the way Pakistanis Invest",
  description:
    "Mahaana is Pakistan's leading SECP-licensed, Shariah-compliant investment platform. Earn daily returns, plan your retirement, and grow your wealth — starting from PKR 5,000.",
  path: "",
});

export default async function Home() {
  const blogPosts = await getLatestBlogPosts();

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <InvestHero />
      <LogoStrip />
      <WhyMahaanaTrade />
      <FeatureCards />
      <FeaturesSection />
      <TestimonialsSection />
      <ComplianceSection />
      <BlogSection posts={blogPosts} />
      <Cta6Section />
    </div>
  );
}

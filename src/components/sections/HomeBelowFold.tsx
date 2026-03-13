"use client";

import dynamic from "next/dynamic";
import type { BlogPostForSection } from "@/lib/sanity/fetch";

const WhyMahaanaTrade = dynamic(
  () => import("@/components/sections/WhyMahaanaTrade").then((m) => m.WhyMahaanaTrade),
  { ssr: false, loading: () => <div className="min-h-[12rem]" aria-hidden /> }
);
const FeatureCards = dynamic(
  () => import("@/components/sections/FeatureCards").then((m) => m.FeatureCards),
  { ssr: false, loading: () => <div className="min-h-[12rem]" aria-hidden /> }
);
const FeaturesSection = dynamic(
  () => import("@/components/sections/FeaturesSection").then((m) => m.FeaturesSection),
  { ssr: false, loading: () => <div className="min-h-[12rem]" aria-hidden /> }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
  { ssr: false, loading: () => <div className="min-h-[12rem]" aria-hidden /> }
);
const ComplianceSection = dynamic(
  () => import("@/components/sections/ComplianceSection").then((m) => m.ComplianceSection),
  { ssr: false, loading: () => <div className="min-h-[12rem]" aria-hidden /> }
);
const BlogSection = dynamic(
  () => import("@/components/sections/BlogSection").then((m) => m.BlogSection),
  { ssr: false, loading: () => <div className="min-h-[12rem]" aria-hidden /> }
);
const Cta6Section = dynamic(
  () => import("@/components/sections/Cta6Section").then((m) => m.Cta6Section),
  { ssr: false, loading: () => <div className="min-h-[12rem]" aria-hidden /> }
);

export interface HomeBelowFoldProps {
  posts: BlogPostForSection[];
}

export function HomeBelowFold({ posts }: HomeBelowFoldProps) {
  return (
    <>
      <WhyMahaanaTrade />
      <FeatureCards />
      <FeaturesSection />
      <TestimonialsSection />
      <ComplianceSection />
      <BlogSection posts={posts} />
      <Cta6Section />
    </>
  );
}

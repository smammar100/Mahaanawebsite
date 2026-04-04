import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { getLatestNewsPosts } from "@/lib/sanity/fetch";
const AboutFigmaPage = dynamic(
  () => import("@/components/sections/AboutFigmaPage").then((m) => ({ default: m.AboutFigmaPage })),
  { ssr: true }
);

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Mahaana",
  description:
    "Learn about Mahaana — Pakistan's leading SECP-licensed, Shariah compliant investment platform. Our mission and values, team, and how we're changing the way Pakistanis invest.",
  path: "about",
});

export default async function AboutUsPage() {
  const newsPosts = await getLatestNewsPosts();

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] overflow-x-clip">
      <BreadcrumbStructuredData items={[{ name: "About Us", path: "about" }]} />
      <AboutFigmaPage newsPosts={newsPosts} />
    </div>
  );
}

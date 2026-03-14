import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { CareersOpeningsSection } from "@/components/sections/CareersOpeningsSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers | Mahaana",
  description: "Join the Mahaana team. Explore career opportunities.",
  path: "careers",
});

export default function CareersPage() {
  return (
    <div className="bg-surface-bg">
      <CareersOpeningsSection />
    </div>
  );
}

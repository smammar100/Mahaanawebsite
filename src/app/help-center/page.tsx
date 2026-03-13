import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getHelpCenterFaqs } from "@/lib/sanity/fetch";
import { HelpCenterSection } from "@/components/sections/HelpCenterSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Help Center | Mahaana",
  description:
    "Find answers to common questions about your account, security, and Mahaana products.",
  path: "help-center",
});

export default async function HelpCenterPage() {
  const faqs = await getHelpCenterFaqs();

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <HelpCenterSection items={faqs} />
    </div>
  );
}

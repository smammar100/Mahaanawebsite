import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getLegalDocuments } from "@/lib/sanity/fetch";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { LegalPageContent } from "./LegalPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Legal | Mahaana",
  description:
    "Corporate information, licenses, and governance policies for Mahaana Wealth Limited.",
  path: "legal",
});

export default async function LegalPage() {
  const legalDocuments = await getLegalDocuments();

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <BreadcrumbStructuredData items={[{ name: "Legal", path: "legal" }]} />
      <LegalPageContent legalDocuments={legalDocuments} />
    </div>
  );
}

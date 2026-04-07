"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { H1, H2, H3, TextLarge } from "@/components/ui/Typography";
import type { LegalDocumentForSection } from "@/lib/sanity/fetch";
import { cleanCopy } from "@/lib/copy-utils";

const COMPANY_DATA = [
  { label: "Legal Name", value: "Mahaana Wealth Limited" },
  { label: "Incorporation Number", value: "0198242" },
  { label: "Status", value: "Public Interest Company (Public Unlisted)" },
  { label: "NTN", value: "9626280-6" },
  {
    label: "Auditors",
    value: "Rahman Sarfaraz Rahim Iqbal Rafiq, Chartered Accountants",
  },
  {
    label: "Legal Advisors",
    value: "Niaz Brohi Law Chambers, Usama Aslam",
  },
  {
    label: "Company license",
    value: "View license",
    openLicenseModal: true,
  },
];

const LICENSE_IMAGE_SRC = "/images/invest/Comapny%20license.jpeg";

const downloadReportClassName =
  "inline-flex items-center gap-1.5 text-body-sm font-semibold text-system-brand underline transition-colors hover:text-system-brand/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand";

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LegalPageContent({
  legalDocuments = [],
}: {
  legalDocuments?: LegalDocumentForSection[];
}) {
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);

  return (
    <>
      <Dialog open={licenseModalOpen} onOpenChange={setLicenseModalOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col gap-0 p-0">
          <div className="flex items-center justify-between border-b border-surface-stroke px-6 py-4">
            <DialogTitle className="text-xl">
              Company License
            </DialogTitle>
            <DialogClose className="rounded-lg p-2 text-text-tertiary transition-colors hover:bg-surface-card hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand">
              <span className="sr-only">Close</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
          <div className="overflow-y-auto p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LICENSE_IMAGE_SRC}
              alt="SECP Company License for Mahaana Wealth Limited"
              className="w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center pt-[172px] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
        <Container className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <H1 className="max-w-3xl text-text-primary">
            Legal &{" "}
            <span className="bg-gradient-to-r from-system-brand to-primary-300 bg-clip-text text-transparent">
              Governance
            </span>
          </H1>
          <TextLarge className="max-w-2xl text-text-tertiary">
            {cleanCopy(
              "Transparency and regulatory compliance form the foundation of trust at Mahaana Wealth. Explore our corporate information, active licenses, and governance policies."
            )}
          </TextLarge>
        </Container>
      </section>

      {/* Content */}
      <main className="section-y">
        <Container className="max-w-[960px] readable-line-length space-y-16">
          {/* Company Information */}
          <div>
                <span className="text-label mb-3 block text-system-brand">
                  {cleanCopy("Corporate Details")}
                </span>
                <H3 className="mb-3 text-text-primary">
                  Company Information
                </H3>
                <p className="mb-8 max-w-[580px] text-body text-text-tertiary">
                  {cleanCopy(
                    "Key corporate and registration details for Mahaana Wealth Limited."
                  )}
                </p>
                <div className="overflow-hidden rounded-2xl border border-surface-stroke bg-[#F9F9F9] shadow-sm">
                  {COMPANY_DATA.map((item, i) => (
                    <div
                      key={item.label}
                      className={
                        i < COMPANY_DATA.length - 1
                          ? "border-b border-surface-stroke/50 px-4 py-5 transition-colors hover:bg-surface-card/50 sm:px-8"
                          : "px-4 py-5 transition-colors hover:bg-surface-card/50 sm:px-8"
                      }
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <span className="text-body-sm font-medium text-text-tertiary">
                          {item.label}
                        </span>
                        {"openLicenseModal" in item && item.openLicenseModal ? (
                          <button
                            type="button"
                            onClick={() => setLicenseModalOpen(true)}
                            className="text-body-sm font-semibold text-system-brand underline transition-colors hover:text-system-brand/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:text-right"
                          >
                            {item.value}
                          </button>
                        ) : (
                          <span className="text-body-sm font-semibold text-text-primary sm:text-right">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
          </div>

          {/* Legal Documents (Sanity) */}
          {legalDocuments.length > 0 && (
            <div>
              <span className="text-label mb-3 block text-system-brand">
                {cleanCopy("Reports & Documents")}
              </span>
              <H3 className="mb-3 text-text-primary">Legal Documents</H3>
              <p className="mb-8 max-w-[580px] text-body text-text-tertiary">
                {cleanCopy("Download key legal and regulatory documents.")}
              </p>
              <div className="overflow-hidden rounded-2xl border border-surface-stroke bg-[#F9F9F9] shadow-sm">
                {legalDocuments.map((doc, index) => (
                  <div
                    key={doc._id}
                    className={
                      index < legalDocuments.length - 1
                        ? "flex flex-col gap-3 border-b border-surface-stroke/50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                        : "flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                    }
                  >
                    <span className="text-body-sm font-semibold text-text-primary">
                      {doc.title}
                    </span>
                    {doc.fileUrl ? (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={downloadReportClassName}
                      >
                        Download report
                        <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-system-brand" />
                      </a>
                    ) : (
                      <span className={downloadReportClassName}>
                        Download report
                        <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-system-brand" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}

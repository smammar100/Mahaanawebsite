"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, TextMedium } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const FUND_LITERATURE_TABS = [
  { id: "general", label: "General" },
  { id: "fund-manager-reports", label: "Fund manager reports" },
  { id: "shariah-compliance", label: "Shariah compliance" },
  { id: "financial-statements", label: "Financial statements" },
] as const;

type TabId = (typeof FUND_LITERATURE_TABS)[number]["id"];
const DOCS_PREVIEW_LIMIT = 5;

const GENERAL_DOCUMENTS = [
  { title: "Trust Deed", href: "#" },
  { title: "Offering Document", href: "#" },
] as const;

const FALLBACK_DOCUMENTS: Record<TabId, { title: string; href: string }[]> = {
  general: GENERAL_DOCUMENTS.map((d) => ({ title: d.title, href: d.href })),
  "fund-manager-reports": [],
  "shariah-compliance": [],
  "financial-statements": [],
};

const isDocumentUrl = (href: string) => /^https?:\/\//i.test(href);

const downloadReportClassName =
  "flex items-center justify-end gap-1 text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand";
const listMotionTransition = { type: "spring", stiffness: 240, damping: 26 } as const;

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
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

export function MICFFundLiteratureSection({
  documents,
}: {
  documents?: {
    title: string;
    fileUrl: string | null;
    category: string;
    publishDate?: string | null;
  }[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [expandedTabs, setExpandedTabs] = useState<Record<TabId, boolean>>({
    general: false,
    "fund-manager-reports": false,
    "shariah-compliance": false,
    "financial-statements": false,
  });

  type DocEntry = { title: string; href: string; publishDate?: string | null };
  const sanityByCategory: Record<TabId, DocEntry[]> = {
    general: [],
    "fund-manager-reports": [],
    "shariah-compliance": [],
    "financial-statements": [],
  };
  if (documents?.length) {
    documents.forEach((d) => {
      if (d.category in sanityByCategory && d.title) {
        sanityByCategory[d.category as TabId].push({
          title: d.title,
          href: d.fileUrl ?? "#",
          publishDate: d.publishDate ?? null,
        });
      }
    });
  }
  const fundManagerReportsSorted = [...sanityByCategory["fund-manager-reports"]].sort(
    (a, b) => (b.publishDate ?? "").localeCompare(a.publishDate ?? "")
  );
  const byCategory: Record<TabId, { title: string; href: string }[]> = {
    general:
      sanityByCategory.general.length > 0
        ? sanityByCategory.general
        : FALLBACK_DOCUMENTS.general,
    "fund-manager-reports":
      fundManagerReportsSorted.length > 0
        ? fundManagerReportsSorted
        : FALLBACK_DOCUMENTS["fund-manager-reports"],
    "shariah-compliance":
      sanityByCategory["shariah-compliance"].length > 0
        ? sanityByCategory["shariah-compliance"]
        : FALLBACK_DOCUMENTS["shariah-compliance"],
    "financial-statements":
      sanityByCategory["financial-statements"].length > 0
        ? sanityByCategory["financial-statements"]
        : FALLBACK_DOCUMENTS["financial-statements"],
  };
  const tabDocs = byCategory[activeTab];
  const hasDocs = tabDocs.length > 0;
  const isExpanded = expandedTabs[activeTab];
  const visibleDocs = isExpanded ? tabDocs : tabDocs.slice(0, DOCS_PREVIEW_LIMIT);
  const hasOverflowDocs = tabDocs.length > DOCS_PREVIEW_LIMIT;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative min-w-0 overflow-x-visible overflow-y-clip bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="micf-fund-literature-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="micf-fund-literature-section-heading"
          weight="bold"
          className="text-text-primary"
        >
          Fund literature
        </H3>

        <div className="flex flex-col gap-6 sm:gap-6">
          {/* Tab bar */}
          <div
            className="fund-tab-list flex w-full min-h-[44px] max-w-full flex-nowrap overflow-x-auto snap-x snap-mandatory justify-start gap-1 rounded-full bg-gray-100 p-1.5 sm:justify-between"
            role="tablist"
            aria-label="Fund literature categories"
          >
            {FUND_LITERATURE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cx(
                  "min-h-[44px] shrink-0 snap-start rounded-full px-4 py-3 text-center whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:flex-1 sm:min-w-0 sm:px-5",
                  activeTab === tab.id
                    ? "bg-white border border-white text-text-primary shadow-sm"
                    : "text-text-tertiary hover:bg-white/80 hover:text-text-primary"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Document list — per tab */}
          {activeTab === "general" && (
            <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
              <motion.div layout className="min-w-0 w-full">
                <AnimatePresence initial={false}>
                  {visibleDocs.map((doc, index) => (
                    <motion.div
                      layout
                      transition={listMotionTransition}
                      key={doc.title + index}
                      className={cx(
                        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-5 sm:px-6",
                        index < visibleDocs.length - 1 || hasOverflowDocs
                          ? "border-b border-surface-stroke"
                          : null
                      )}
                    >
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
                      >
                        {doc.title}
                      </TextMedium>
                      {isDocumentUrl(doc.href) ? (
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={downloadReportClassName}
                        >
                          Download report
                          <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-system-brand" />
                        </a>
                      ) : (
                        <span className={downloadReportClassName}>
                          Download report
                          <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-system-brand" />
                        </span>
                      )}
                    </motion.div>
                  ))}
                  {hasOverflowDocs ? (
                    <motion.div
                      layout
                      transition={listMotionTransition}
                      className="px-4 py-4 sm:px-6"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedTabs((prev) => ({
                            ...prev,
                            [activeTab]: !prev[activeTab],
                          }))
                        }
                        className="text-body-sm font-semibold text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                      >
                        {isExpanded ? "Show less document" : "View all documents"}
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
          {activeTab !== "general" && hasDocs && (
            <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
              <motion.div layout className="min-w-0 w-full">
                <AnimatePresence initial={false}>
                  {visibleDocs.map((doc, index) => (
                    <motion.div
                      layout
                      transition={listMotionTransition}
                      key={doc.title + index}
                      className={cx(
                        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-5 sm:px-6",
                        index < visibleDocs.length - 1 || hasOverflowDocs
                          ? "border-b border-surface-stroke"
                          : null
                      )}
                    >
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
                      >
                        {doc.title}
                      </TextMedium>
                      {isDocumentUrl(doc.href) ? (
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={downloadReportClassName}
                        >
                          Download report
                          <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-system-brand" />
                        </a>
                      ) : (
                        <span className={downloadReportClassName}>
                          Download report
                          <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-system-brand" />
                        </span>
                      )}
                    </motion.div>
                  ))}
                  {hasOverflowDocs ? (
                    <motion.div
                      layout
                      transition={listMotionTransition}
                      className="px-4 py-4 sm:px-6"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedTabs((prev) => ({
                            ...prev,
                            [activeTab]: !prev[activeTab],
                          }))
                        }
                        className="text-body-sm font-semibold text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                      >
                        {isExpanded ? "Show less document" : "View all documents"}
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
          {activeTab !== "general" && !hasDocs && (
            <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card px-4 py-8 sm:px-6 text-center">
              <TextMedium weight="medium" className="text-text-tertiary">
                No documents in this category yet.
              </TextMedium>
            </div>
          )}
        </div>
      </Container>
    </motion.section>
  );
}

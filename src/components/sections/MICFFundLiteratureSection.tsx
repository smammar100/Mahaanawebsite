"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextMedium } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const FUND_LITERATURE_TABS = [
  { id: "general", label: "General" },
  { id: "fund-manager-reports", label: "Fund manager reports" },
  { id: "shariah-compliance", label: "Shariah compliance" },
  { id: "financial-statements", label: "Financial statements" },
] as const;

type TabId = (typeof FUND_LITERATURE_TABS)[number]["id"];

const GENERAL_DOCUMENTS = [
  { title: "Trust Deed", href: "#" },
  { title: "Offering Document", href: "#" },
] as const;

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

export function MICFFundLiteratureSection() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

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
        <H2
          id="micf-fund-literature-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Fund literature
        </H2>

        <div className="flex flex-col gap-6 sm:gap-6">
          {/* Tab bar */}
          <div
            className="fund-tab-list flex w-full min-h-[44px] max-w-full flex-nowrap overflow-x-auto snap-x snap-mandatory justify-start gap-1 rounded-full bg-gray-100 p-1.5"
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
                  "min-h-[44px] shrink-0 snap-start rounded-full px-5 py-3 text-center font-body text-base whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand",
                  activeTab === tab.id
                    ? "bg-white border border-white text-text-primary font-semibold shadow-sm"
                    : "font-medium text-text-tertiary hover:bg-white/80 hover:text-text-primary"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Document list — General tab content */}
          {activeTab === "general" && (
            <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
              <div className="min-w-0 w-full">
                {GENERAL_DOCUMENTS.map((doc, index) => (
                  <div
                    key={doc.title}
                    className={cx(
                      "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-5 sm:px-6",
                      index < GENERAL_DOCUMENTS.length - 1 &&
                        "border-b border-surface-stroke"
                    )}
                  >
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary text-base"
                    >
                      {doc.title}
                    </TextMedium>
                    <a
                      href={doc.href}
                      className="flex items-center justify-end gap-1 font-body text-base font-semibold text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                    >
                      Download report
                      <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-system-brand" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for other tabs — same card layout, empty or future content */}
          {activeTab !== "general" && (
            <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white px-4 py-8 sm:px-6 text-center">
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

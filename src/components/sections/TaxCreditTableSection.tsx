"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextRegular } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

interface TaxCreditRow {
  monthlyIncome: number;
  annualIncome: number;
  annualIncomeTax: number;
  effectiveTaxRate: string;
  vpsInvestmentPermissible: number;
  maxTaxCredit: number;
}

const SALARIED_TAX_ROWS: TaxCreditRow[] = [
  { monthlyIncome: 50000, annualIncome: 600000, annualIncomeTax: 0, effectiveTaxRate: "0.00%", vpsInvestmentPermissible: 120000, maxTaxCredit: 0 },
  { monthlyIncome: 100000, annualIncome: 1200000, annualIncomeTax: 6000, effectiveTaxRate: "0.50%", vpsInvestmentPermissible: 240000, maxTaxCredit: 1200 },
  { monthlyIncome: 150000, annualIncome: 1800000, annualIncomeTax: 72000, effectiveTaxRate: "4.00%", vpsInvestmentPermissible: 360000, maxTaxCredit: 14400 },
  { monthlyIncome: 183333, annualIncome: 2200000, annualIncomeTax: 116000, effectiveTaxRate: "5.27%", vpsInvestmentPermissible: 440000, maxTaxCredit: 23200 },
  { monthlyIncome: 200000, annualIncome: 2400000, annualIncomeTax: 138000, effectiveTaxRate: "5.75%", vpsInvestmentPermissible: 480000, maxTaxCredit: 27600 },
  { monthlyIncome: 266667, annualIncome: 3200000, annualIncomeTax: 346000, effectiveTaxRate: "10.81%", vpsInvestmentPermissible: 640000, maxTaxCredit: 69200 },
  { monthlyIncome: 300000, annualIncome: 3600000, annualIncomeTax: 466000, effectiveTaxRate: "12.94%", vpsInvestmentPermissible: 720000, maxTaxCredit: 93200 },
  { monthlyIncome: 341667, annualIncome: 4100000, annualIncomeTax: 616000, effectiveTaxRate: "15.02%", vpsInvestmentPermissible: 820000, maxTaxCredit: 123200 },
  { monthlyIncome: 400000, annualIncome: 4800000, annualIncomeTax: 861000, effectiveTaxRate: "17.94%", vpsInvestmentPermissible: 960000, maxTaxCredit: 172200 },
  { monthlyIncome: 500000, annualIncome: 6000000, annualIncomeTax: 1281000, effectiveTaxRate: "21.35%", vpsInvestmentPermissible: 1200000, maxTaxCredit: 256200 },
  { monthlyIncome: 600000, annualIncome: 7200000, annualIncomeTax: 1701000, effectiveTaxRate: "23.63%", vpsInvestmentPermissible: 1440000, maxTaxCredit: 340200 },
  { monthlyIncome: 833333, annualIncome: 10000000, annualIncomeTax: 2681000, effectiveTaxRate: "26.81%", vpsInvestmentPermissible: 2000000, maxTaxCredit: 536200 },
  { monthlyIncome: 1200000, annualIncome: 14400000, annualIncomeTax: 4221000, effectiveTaxRate: "29.31%", vpsInvestmentPermissible: 2880000, maxTaxCredit: 844200 },
  { monthlyIncome: 2000000, annualIncome: 24000000, annualIncomeTax: 7721000, effectiveTaxRate: "32.17%", vpsInvestmentPermissible: 4800000, maxTaxCredit: 1544200 },
  { monthlyIncome: 3500000, annualIncome: 42000000, annualIncomeTax: 14021000, effectiveTaxRate: "33.38%", vpsInvestmentPermissible: 8400000, maxTaxCredit: 2804200 },
  { monthlyIncome: 5000000, annualIncome: 60000000, annualIncomeTax: 20321000, effectiveTaxRate: "33.87%", vpsInvestmentPermissible: 12000000, maxTaxCredit: 4064200 },
];

const NON_SALARIED_TAX_ROWS: TaxCreditRow[] = [
  { monthlyIncome: 50000, annualIncome: 600000, annualIncomeTax: 0, effectiveTaxRate: "0.00%", vpsInvestmentPermissible: 120000, maxTaxCredit: 0 },
  { monthlyIncome: 75000, annualIncome: 900000, annualIncomeTax: 45000, effectiveTaxRate: "5.00%", vpsInvestmentPermissible: 180000, maxTaxCredit: 9000 },
  { monthlyIncome: 100000, annualIncome: 1200000, annualIncomeTax: 90000, effectiveTaxRate: "7.50%", vpsInvestmentPermissible: 240000, maxTaxCredit: 18000 },
  { monthlyIncome: 133333, annualIncome: 1600000, annualIncomeTax: 170000, effectiveTaxRate: "10.63%", vpsInvestmentPermissible: 320000, maxTaxCredit: 34000 },
  { monthlyIncome: 150000, annualIncome: 1800000, annualIncomeTax: 230000, effectiveTaxRate: "12.78%", vpsInvestmentPermissible: 360000, maxTaxCredit: 46000 },
  { monthlyIncome: 200000, annualIncome: 2400000, annualIncomeTax: 410000, effectiveTaxRate: "17.08%", vpsInvestmentPermissible: 480000, maxTaxCredit: 82000 },
  { monthlyIncome: 266667, annualIncome: 3200000, annualIncomeTax: 650000, effectiveTaxRate: "20.31%", vpsInvestmentPermissible: 640000, maxTaxCredit: 130000 },
  { monthlyIncome: 300000, annualIncome: 3600000, annualIncomeTax: 810000, effectiveTaxRate: "22.50%", vpsInvestmentPermissible: 720000, maxTaxCredit: 162000 },
  { monthlyIncome: 466667, annualIncome: 5600000, annualIncomeTax: 1610000, effectiveTaxRate: "28.75%", vpsInvestmentPermissible: 1120000, maxTaxCredit: 322000 },
  { monthlyIncome: 500000, annualIncome: 6000000, annualIncomeTax: 1790000, effectiveTaxRate: "29.38%", vpsInvestmentPermissible: 1200000, maxTaxCredit: 358000 },
  { monthlyIncome: 1250000, annualIncome: 15000000, annualIncomeTax: 6424000, effectiveTaxRate: "42.83%", vpsInvestmentPermissible: 3000000, maxTaxCredit: 1284800 },
];

const PAGE_SIZE = 9;

function formatNum(n: number): string {
  return n.toLocaleString("en-PK");
}

export function TaxCreditTableSection() {
  const [classType, setClassType] = useState<"salaried" | "non-salaried">("salaried");
  const [page, setPage] = useState(1);

  const rows = classType === "salaried" ? SALARIED_TAX_ROWS : NON_SALARIED_TAX_ROWS;
  const totalPages = Math.ceil(rows.length / PAGE_SIZE) || 1;
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const switchClass = (type: "salaried" | "non-salaried") => {
    setClassType(type);
    setPage(1);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16"
      aria-labelledby="tax-credit-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:px-16 sm:gap-6">
        <div className="mx-auto max-w-3xl flex flex-col text-center">
          <H2
            id="tax-credit-heading"
            className="font-heading text-[1.75rem] font-semibold leading-[1.2] tracking-heading text-text-primary sm:text-[2rem] lg:text-[2.25rem]"
          >
            Visualize your tax savings with Mahaana Retirement
          </H2>
          <TextRegular className="mt-4 text-text-secondary">
            View detailed tax credit calculations across all income slabs and understand exactly how much you can save by investing in Mahaana Retirement.
          </TextRegular>
        </div>

        <div
          className="flex flex-wrap justify-center gap-1.5"
          role="group"
          aria-label="Tax class"
        >
          <button
            type="button"
            onClick={() => switchClass("salaried")}
            className={cx(
              "rounded-full px-5 py-2.5 font-body text-small font-semibold transition-colors",
              classType === "salaried"
                ? "bg-surface-card border border-surface-stroke text-text-primary shadow-sm"
                : "text-text-tertiary hover:text-text-secondary"
            )}
          >
            Salaried class
          </button>
          <button
            type="button"
            onClick={() => switchClass("non-salaried")}
            className={cx(
              "rounded-full px-5 py-2.5 font-body text-small font-semibold transition-colors",
              classType === "non-salaried"
                ? "bg-surface-card border border-surface-stroke text-text-primary shadow-sm"
                : "text-text-tertiary hover:text-text-secondary"
            )}
          >
            Non-salaried class
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]" role="table" aria-label="Tax credit by income">
              <thead>
                <tr className="bg-primary-200">
                  <th className="px-4 py-3 text-left font-body text-tiny font-semibold uppercase tracking-wide text-white sm:px-6">
                    Monthly income
                  </th>
                  <th className="px-4 py-3 text-left font-body text-tiny font-semibold uppercase tracking-wide text-white sm:px-6">
                    Annual income
                  </th>
                  <th className="px-4 py-3 text-left font-body text-tiny font-semibold uppercase tracking-wide text-white sm:px-6">
                    Annual income tax
                  </th>
                  <th className="px-4 py-3 text-left font-body text-tiny font-semibold uppercase tracking-wide text-white sm:px-6">
                    Effective tax rate
                  </th>
                  <th className="px-4 py-3 text-left font-body text-tiny font-semibold uppercase tracking-wide text-white sm:px-6">
                    VPS investment permissible for tax credit
                  </th>
                  <th className="px-4 py-3 text-left font-body text-tiny font-semibold uppercase tracking-wide text-white sm:px-6">
                    Maximum tax credit amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-stroke">
                {pageRows.map((row, i) => (
                  <tr
                    key={`${classType}-${start + i}`}
                    className={i % 2 === 0 ? "bg-surface-card" : "bg-surface-bg"}
                  >
                    <td className="px-4 py-4 font-body text-small text-text-primary sm:px-6">
                      {formatNum(row.monthlyIncome)}
                    </td>
                    <td className="px-4 py-4 font-body text-small text-text-primary sm:px-6">
                      {formatNum(row.annualIncome)}
                    </td>
                    <td className="px-4 py-4 font-body text-small text-text-primary sm:px-6">
                      {formatNum(row.annualIncomeTax)}
                    </td>
                    <td className="px-4 py-4 font-body text-small text-text-primary sm:px-6">
                      {row.effectiveTaxRate}
                    </td>
                    <td className="px-4 py-4 font-body text-small text-text-primary sm:px-6">
                      {formatNum(row.vpsInvestmentPermissible)}
                    </td>
                    <td className="px-4 py-4 font-body text-small text-text-primary sm:px-6">
                      {formatNum(row.maxTaxCredit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-stroke px-4 py-4 sm:px-6">
            <p className="font-body text-small text-text-secondary">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentPage <= 1}
                className={cx(
                  "rounded-full border border-surface-stroke bg-surface-card px-4 py-2 font-body text-small font-medium transition-colors",
                  currentPage <= 1
                    ? "cursor-not-allowed text-text-tertiary opacity-70"
                    : "text-text-primary hover:bg-gray-100"
                )}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={currentPage >= totalPages}
                className={cx(
                  "rounded-full border border-surface-stroke bg-surface-card px-4 py-2 font-body text-small font-semibold transition-colors",
                  currentPage >= totalPages
                    ? "cursor-not-allowed text-text-tertiary opacity-70"
                    : "text-text-primary hover:bg-gray-100"
                )}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, H4, TextMedium, TextSmall } from "@/components/ui/Typography";
import { HighchartsVariablePieChart } from "@/components/ui/HighchartsVariablePieChart";
import type { MiietfPortfolioFundData } from "@/lib/miietf-fund-api";
import {
  fundPageSectionScrollMargin,
  sectionFadeInUp,
  sectionViewport,
} from "@/lib/sectionMotion";
import {
  fundTableCardClass,
  fundTableFixedClass,
  fundTableMetricCellClass,
  fundTableMinFourCol,
  fundTableMinTwoCol,
  fundTableScrollClass,
  fundTableTheadClass,
} from "@/components/ui/fundTableClasses";
import { cx } from "@/utils/cx";

const EXPOSURE_COLORS = {
  fertilizer: "var(--color-primary-200)",
  oilGas: "var(--color-teal-200)",
  cements: "var(--color-error-200)",
  commercialBanks: "var(--color-warning-200)",
  invBanks: "var(--color-info-200)",
  others: "var(--color-info-150)",
} as const;

const WEIGHTED_EXPOSURE_ROWS = [
  {
    sector: "Fertilizer",
    color: EXPOSURE_COLORS.fertilizer,
    miietf: "21.04%",
    kmi30: "19.70%",
    weight: "0.21%",
    value: 21.04,
  },
  {
    sector: "Oil & Gas Exploration",
    color: EXPOSURE_COLORS.oilGas,
    miietf: "19.54%",
    kmi30: "14.17%",
    weight: "3.25%",
    value: 19.54,
  },
  {
    sector: "Cements",
    color: EXPOSURE_COLORS.cements,
    miietf: "15.08%",
    kmi30: "8.20%",
    weight: "0.96%",
    value: 15.08,
  },
  {
    sector: "Commercial Banks",
    color: EXPOSURE_COLORS.commercialBanks,
    miietf: "8.36%",
    kmi30: "8.23%",
    weight: "0.66%",
    value: 8.36,
  },
  {
    sector: "Inv. Banks / Inv. Cos. / Securities Cos.",
    color: EXPOSURE_COLORS.invBanks,
    miietf: "8.38%",
    kmi30: "8.63%",
    weight: "-1.27%",
    value: 8.38,
  },
  {
    sector: "Others",
    color: EXPOSURE_COLORS.others,
    miietf: "27.61%",
    kmi30: "41.07%",
    weight: "-4.74%",
    value: 27.61,
  },
];

const HOLDINGS_COLORS = {
  fauji: "var(--color-primary-200)",
  engro: "var(--color-teal-200)",
  meezan: "var(--color-error-200)",
  lucky: "var(--color-warning-200)",
  ppl: "var(--color-info-200)",
  hub: "var(--color-info-150)",
  ogdcl: "var(--color-teal-150)",
  mari: "var(--color-error-150)",
  systems: "var(--color-coral-150)",
  pso: "var(--color-primary-150)",
} as const;

const TOP_HOLDINGS_ROWS = [
  { name: "Fauji Fertilizer Limited", percentage: "15.63%", color: HOLDINGS_COLORS.fauji, value: 15.63 },
  { name: "Engro Holdings Limited", percentage: "8.38%", color: HOLDINGS_COLORS.engro, value: 8.38 },
  { name: "Meezan Bnak Limited", percentage: "7.15%", color: HOLDINGS_COLORS.meezan, value: 7.15 },
  { name: "Lucky Cement Limited", percentage: "7.06%", color: HOLDINGS_COLORS.lucky, value: 7.06 },
  { name: "Pakistan Petroleum Limited", percentage: "6.92%", color: HOLDINGS_COLORS.ppl, value: 6.92 },
  { name: "Hub Power Company Limited", percentage: "6.87%", color: HOLDINGS_COLORS.hub, value: 6.87 },
  {
    name: "Oil & Gas Development Company Limited",
    percentage: "6.85%",
    color: HOLDINGS_COLORS.ogdcl,
    value: 6.85,
  },
  { name: "Mari Energies", percentage: "5.77%", color: HOLDINGS_COLORS.mari, value: 5.77 },
  { name: "Systems Limited", percentage: "4.69%", color: HOLDINGS_COLORS.systems, value: 4.69 },
  {
    name: "Pakistan State Oil Company Limited",
    percentage: "4.34%",
    color: HOLDINGS_COLORS.pso,
    value: 4.34,
  },
];

export function MIIETFPortfolioSection({ fundData }: { fundData?: MiietfPortfolioFundData | null }) {
  const [hoveredExposureIndex, setHoveredExposureIndex] = useState<number | null>(null);
  const [hoveredHoldingsIndex, setHoveredHoldingsIndex] = useState<number | null>(null);

  const exposureRows = fundData == null ? WEIGHTED_EXPOSURE_ROWS : fundData.weightedExposure;
  const holdingsRows = fundData == null ? TOP_HOLDINGS_ROWS : fundData.topHoldings;
  const exposureChartData = exposureRows.map((row) => ({
    name: row.sector,
    value: row.value,
    fill: row.color,
  }));
  const holdingsChartData = holdingsRows.map((row) => ({
    name: row.name,
    value: row.value,
    fill: row.color,
  }));

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx(
        "relative overflow-hidden bg-surface-bg section-y",
        fundPageSectionScrollMargin
      )}
      aria-labelledby="portfolio-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="portfolio-section-heading"
          weight="semibold"
          className="text-text-primary"
        >
          Portfolio
        </H3>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* Weighted exposure: table (50%) + chart (50%) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary" weight="semibold">
              Weighted exposure
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className={fundTableCardClass}>
                  <div className={fundTableScrollClass}>
                  <table
                    className={cx(fundTableFixedClass, fundTableMinFourCol)}
                    role="table"
                    aria-label="Weighted exposure by sector"
                  >
                    <colgroup>
                      <col className="min-w-0 w-[42%]" />
                      <col className="w-[19.33%]" />
                      <col className="w-[19.33%]" />
                      <col className="w-[19.34%]" />
                    </colgroup>
                    <thead className={fundTableTheadClass}>
                      <tr>
                        <th
                          scope="col"
                          className="min-w-0 px-3 py-4 text-left sm:px-4"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary"
                          >
                            Sectors
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 text-center sm:px-3"
                        >
                          <TextSmall
                            weight="semibold"
                            className={cx("text-text-tertiary", fundTableMetricCellClass)}
                          >
                            MIIETF
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 text-center sm:px-3"
                        >
                          <TextSmall
                            weight="semibold"
                            className={cx("text-text-tertiary", fundTableMetricCellClass)}
                          >
                            KMI30
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 text-center sm:px-3"
                        >
                          <TextSmall
                            weight="semibold"
                            className={cx("text-text-tertiary", fundTableMetricCellClass)}
                          >
                            Weight
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {exposureRows.map((row, index) => (
                        <tr
                          key={row.sector}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredExposureIndex === index && "bg-surface-stroke"
                          )}
                        >
                          <td className="min-w-0 px-3 py-5 sm:px-4">
                            <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
                              <span
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded sm:mt-0"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium
                                weight="semibold"
                                className="min-w-0 break-words leading-snug text-text-primary"
                              >
                                {row.sector}
                              </TextMedium>
                            </div>
                          </td>
                          <td className={cx("px-2 py-5 sm:px-3", fundTableMetricCellClass)}>
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary"
                            >
                              {row.miietf}
                            </TextMedium>
                          </td>
                          <td className={cx("px-2 py-5 sm:px-3", fundTableMetricCellClass)}>
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary"
                            >
                              {row.kmi30}
                            </TextMedium>
                          </td>
                          <td className={cx("px-2 py-5 sm:px-3", fundTableMetricCellClass)}>
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary"
                            >
                              {row.weight}
                            </TextMedium>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <HighchartsVariablePieChart
                  data={exposureChartData}
                  ariaLabel="Weighted exposure by sector"
                  onSegmentHover={setHoveredExposureIndex}
                />
              </div>
            </div>
          </div>

          {/* Top holdings: chart (50%) + table (50%) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary" weight="semibold">
              Top holdings
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <HighchartsVariablePieChart
                  data={holdingsChartData}
                  ariaLabel="Top holdings by percentage"
                  onSegmentHover={setHoveredHoldingsIndex}
                />
              </div>
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className={fundTableCardClass}>
                  <div className={fundTableScrollClass}>
                  <table
                    className={cx(fundTableFixedClass, fundTableMinTwoCol)}
                    role="table"
                    aria-label="Top holdings by percentage"
                  >
                    <colgroup>
                      <col className="min-w-0 w-[74%]" />
                      <col className="w-[26%]" />
                    </colgroup>
                    <thead className={fundTableTheadClass}>
                      <tr>
                        <th
                          scope="col"
                          className="min-w-0 px-3 py-4 text-left sm:px-4"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary"
                          >
                            Holdings
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 text-center sm:px-3"
                        >
                          <TextSmall
                            weight="semibold"
                            className={cx("text-text-tertiary", fundTableMetricCellClass)}
                          >
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdingsRows.map((row, index) => (
                        <tr
                          key={row.name}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredHoldingsIndex === index && "bg-surface-stroke"
                          )}
                        >
                          <td className="min-w-0 px-3 py-5 sm:px-4">
                            <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
                              <span
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded sm:mt-0"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium
                                weight="semibold"
                                className="min-w-0 break-words leading-snug text-text-primary"
                              >
                                {row.name}
                              </TextMedium>
                            </div>
                          </td>
                          <td className={cx("px-2 py-5 sm:px-3", fundTableMetricCellClass)}>
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary"
                            >
                              {row.percentage}
                            </TextMedium>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

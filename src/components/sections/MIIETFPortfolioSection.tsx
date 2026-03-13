"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, H4, TextMedium, TextSmall } from "@/components/ui/Typography";
import { HighchartsVariablePieChart } from "@/components/ui/HighchartsVariablePieChart";
import type { MiietfPortfolioFundData } from "@/lib/miietf-fund-api";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const EXPOSURE_COLORS = {
  fertilizer: "var(--color-info-200)",
  oilGas: "var(--color-teal-200)",
  cements: "var(--color-error-200)",
  commercialBanks: "var(--color-warning-200)",
  invBanks: "var(--color-primary-200)",
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
  fauji: "var(--color-info-200)",
  engro: "var(--color-teal-200)",
  meezan: "var(--color-error-200)",
  lucky: "var(--color-warning-200)",
  ppl: "var(--color-primary-200)",
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

  const exposureRows = fundData?.weightedExposure ?? WEIGHTED_EXPOSURE_ROWS;
  const holdingsRows = fundData?.topHoldings ?? TOP_HOLDINGS_ROWS;
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
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="portfolio-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="portfolio-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Portfolio
        </H2>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* Weighted exposure: table (50%) + chart (50%) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Weighted exposure
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
                  <table
                    className="w-full min-w-[400px] border-collapse"
                    role="table"
                    aria-label="Weighted exposure by sector"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="bg-surface-stroke px-4 py-4 text-left sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
                          >
                            Sectors
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
                          >
                            MIIETF
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
                          >
                            KMI30
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
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
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium
                                weight="semibold"
                                className="text-text-primary text-base"
                              >
                                {row.sector}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary text-base"
                            >
                              {row.miietf}
                            </TextMedium>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary text-base"
                            >
                              {row.kmi30}
                            </TextMedium>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary text-base"
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
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
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
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
                  <table
                    className="w-full min-w-[320px] border-collapse"
                    role="table"
                    aria-label="Top holdings by percentage"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="bg-surface-stroke px-4 py-4 text-left sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
                          >
                            Holdings
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
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
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium
                                weight="semibold"
                                className="text-text-primary text-base"
                              >
                                {row.name}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary text-base"
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
      </Container>
    </motion.section>
  );
}

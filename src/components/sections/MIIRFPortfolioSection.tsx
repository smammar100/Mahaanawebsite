"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, H4, TextMedium, TextSmall } from "@/components/ui/Typography";
import { HighchartsVariablePieChart } from "@/components/ui/HighchartsVariablePieChart";
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
    miirf: "45.68%",
    km130: "45.68%",
    weight: "45.68%",
    value: 45.68,
  },
  {
    sector: "Oil & Gas Exploration",
    color: EXPOSURE_COLORS.oilGas,
    miirf: "27.98%",
    km130: "27.98%",
    weight: "27.98%",
    value: 27.98,
  },
  {
    sector: "Cements",
    color: EXPOSURE_COLORS.cements,
    miirf: "12.79%",
    km130: "12.79%",
    weight: "12.79%",
    value: 12.79,
  },
  {
    sector: "Commercial Banks",
    color: EXPOSURE_COLORS.commercialBanks,
    miirf: "12.79%",
    km130: "12.79%",
    weight: "12.79%",
    value: 12.79,
  },
  {
    sector: "Inv. Banks / Inv. Cos. / Securities Cos.",
    color: EXPOSURE_COLORS.invBanks,
    miirf: "12.79%",
    km130: "12.79%",
    weight: "12.79%",
    value: 12.79,
  },
  {
    sector: "Others",
    color: EXPOSURE_COLORS.others,
    miirf: "13.29%",
    km130: "13.29%",
    weight: "13.29%",
    value: 13.29,
  },
] as const;

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
  { name: "Fauji Fertilizer Limited", percentage: "3.34%", color: HOLDINGS_COLORS.fauji, value: 3.34 },
  { name: "Engro Holdings Limited", percentage: "2.53%", color: HOLDINGS_COLORS.engro, value: 2.53 },
  { name: "Meezan Bank Limited", percentage: "1.59%", color: HOLDINGS_COLORS.meezan, value: 1.59 },
  { name: "Lucky Cement Limited", percentage: "1.38%", color: HOLDINGS_COLORS.lucky, value: 1.38 },
  { name: "Pakistan Petroleum Limited", percentage: "1.18%", color: HOLDINGS_COLORS.ppl, value: 1.18 },
  { name: "Hub Power Company Limited", percentage: "1.06%", color: HOLDINGS_COLORS.hub, value: 1.06 },
  {
    name: "Oil & Gas Development Company Limited",
    percentage: "1.01%",
    color: HOLDINGS_COLORS.ogdcl,
    value: 1.01,
  },
  { name: "Mari Energies", percentage: "1.01%", color: HOLDINGS_COLORS.mari, value: 1.01 },
  { name: "Systems Limited", percentage: "1.01%", color: HOLDINGS_COLORS.systems, value: 1.01 },
  {
    name: "Pakistan State Oil Company Limited",
    percentage: "1.01%",
    color: HOLDINGS_COLORS.pso,
    value: 1.01,
  },
] as const;

const exposureChartData = WEIGHTED_EXPOSURE_ROWS.map((row) => ({
  name: row.sector,
  value: row.value,
  fill: row.color,
}));

const holdingsChartData = TOP_HOLDINGS_ROWS.map((row) => ({
  name: row.name,
  value: row.value,
  fill: row.color,
}));

export function MIIRFPortfolioSection() {
  const [hoveredExposureIndex, setHoveredExposureIndex] = useState<number | null>(null);
  const [hoveredHoldingsIndex, setHoveredHoldingsIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="miirf-portfolio-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="miirf-portfolio-section-heading"
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
                            MIIRF
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
                            KM130
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
                      {WEIGHTED_EXPOSURE_ROWS.map((row, index) => (
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
                              {row.miirf}
                            </TextMedium>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary text-base"
                            >
                              {row.km130}
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
                      {TOP_HOLDINGS_ROWS.map((row, index) => (
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

"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextMedium, TextSmall } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const DISTRIBUTIONS_ROWS = [
  {
    date: "13 / 06 / 2023",
    pkrPerUnit: "2.375",
    exNav: "101.5469",
    yieldPct: "2.34%",
  },
  {
    date: "13 / 06 / 2025",
    pkrPerUnit: "14.250",
    exNav: "106.2402",
    yieldPct: "13.41%",
  },
] as const;

export function MIIRFDistributionsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="miirf-distributions-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="miirf-distributions-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Distributions
        </H2>

        <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
          <table
            className="w-full min-w-[480px] border-collapse"
            role="table"
            aria-label="Distributions"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="bg-gray-100 px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary text-sm"
                  >
                    Date
                  </TextSmall>
                </th>
                <th
                  scope="col"
                  className="bg-gray-100 px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary text-sm"
                  >
                    PKR / Unit
                  </TextSmall>
                </th>
                <th
                  scope="col"
                  className="bg-gray-100 px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary text-sm"
                  >
                    Ex-NAV
                  </TextSmall>
                </th>
                <th
                  scope="col"
                  className="bg-gray-100 px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary text-sm"
                  >
                    Yield (%)
                  </TextSmall>
                </th>
              </tr>
            </thead>
            <tbody>
              {DISTRIBUTIONS_ROWS.map((row) => (
                <tr
                  key={row.date}
                  className="border-b border-surface-stroke last:border-b-0"
                >
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary text-base"
                    >
                      {row.date}
                    </TextMedium>
                  </td>
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary text-base"
                    >
                      {row.pkrPerUnit}
                    </TextMedium>
                  </td>
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary text-base"
                    >
                      {row.exNav}
                    </TextMedium>
                  </td>
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary text-base"
                    >
                      {row.yieldPct}
                    </TextMedium>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </motion.section>
  );
}

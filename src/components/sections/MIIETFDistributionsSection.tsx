"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, TextMedium, TextSmall } from "@/components/ui/Typography";
import type { MiietfDistributionsFundData } from "@/lib/miietf-fund-api";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

/** Parse DD/MM/YYYY (with or without spaces) to YYYY-MM-DD for sorting. */
function toSortableDate(dateStr: string): string {
  const [d, m, y] = dateStr.replace(/\s/g, "").split("/");
  if (!d || !m || !y) return "0000-00-00";
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

const DISTRIBUTIONS_ROWS: MiietfDistributionsFundData = [
  {
    date: "24/06/2024",
    pkrPerUnit: "0.500",
    exNav: "10.9000",
    yieldPct: "4.59%",
  },
  {
    date: "19/06/2025",
    pkrPerUnit: "2.250",
    exNav: "12.8400",
    yieldPct: "17.52%",
  },
];

export function MIIETFDistributionsSection({ fundData }: { fundData?: MiietfDistributionsFundData | null }) {
  const rows = fundData ?? DISTRIBUTIONS_ROWS;
  const sortedRows = [...rows].sort((a, b) =>
    toSortableDate(b.date).localeCompare(toSortableDate(a.date))
  );
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="distributions-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="distributions-section-heading"
          weight="semibold"
          className="text-text-primary"
        >
          Distributions
        </H3>

        <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
          <table
            className="w-full min-w-[480px] border-collapse"
            role="table"
            aria-label="Distributions"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary"
                  >
                    Date
                  </TextSmall>
                </th>
                <th
                  scope="col"
                  className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary"
                  >
                    PKR / Unit
                  </TextSmall>
                </th>
                <th
                  scope="col"
                  className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary"
                  >
                    Ex-NAV
                  </TextSmall>
                </th>
                <th
                  scope="col"
                  className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                >
                  <TextSmall
                    weight="semibold"
                    className="text-text-tertiary"
                  >
                    Yield (%)
                  </TextSmall>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr
                  key={row.date}
                  className="border-b border-surface-stroke last:border-b-0"
                >
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary"
                    >
                      {row.date}
                    </TextMedium>
                  </td>
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary"
                    >
                      {row.pkrPerUnit}
                    </TextMedium>
                  </td>
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary"
                    >
                      {row.exNav}
                    </TextMedium>
                  </td>
                  <td className="px-4 py-5 text-center sm:px-6">
                    <TextMedium
                      weight="semibold"
                      className="text-text-primary"
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

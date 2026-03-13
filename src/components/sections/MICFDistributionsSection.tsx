"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextMedium, TextSmall } from "@/components/ui/Typography";
import type { MicfDistributionsFundData } from "@/lib/micf-fund-api";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

/** Parse DD/MM/YYYY (with or without spaces) to YYYY-MM-DD for sorting. */
function toSortableDate(dateStr: string): string {
  const [d, m, y] = dateStr.replace(/\s/g, "").split("/");
  if (!d || !m || !y) return "0000-00-00";
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

const DISTRIBUTIONS_ROWS = [
  {
    date: "13/06/2023",
    pkrPerUnit: "2.375",
    exNav: "101.5469",
    yieldPct: "2.34%",
  },
  {
    date: "26/06/2023",
    pkrPerUnit: "2.290",
    exNav: "100.0038",
    yieldPct: "2.29%",
  },
  {
    date: "12/12/2023",
    pkrPerUnit: "10.700",
    exNav: "100.3250",
    yieldPct: "10.67%",
  },
  {
    date: "07/06/2024",
    pkrPerUnit: "5.500",
    exNav: "105.0288",
    yieldPct: "5.24%",
  },
  {
    date: "13/06/2025",
    pkrPerUnit: "14.250",
    exNav: "106.2402",
    yieldPct: "13.41%",
  },
] as const;

export function MICFDistributionsSection({
  fundData,
}: {
  fundData?: MicfDistributionsFundData | null;
}) {
  const rows = (fundData ?? [...DISTRIBUTIONS_ROWS]).slice().sort(
    (a, b) => toSortableDate(b.date).localeCompare(toSortableDate(a.date))
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="micf-distributions-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="micf-distributions-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Distributions
        </H2>

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
                    className="text-text-tertiary text-sm"
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
                    className="text-text-tertiary text-sm"
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
                    className="text-text-tertiary text-sm"
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
                    className="text-text-tertiary text-sm"
                  >
                    Yield (%)
                  </TextSmall>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
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

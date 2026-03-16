"use client";

import { fmt } from "@/lib/formatters";
import { INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import type { YearlySnapshot } from "@/hooks/useInvestmentCalculation";
import { cleanCopy } from "@/lib/copy-utils";

interface ProjectionTableProps {
  yearlyData: YearlySnapshot[];
}

export function ProjectionTable({ yearlyData }: ProjectionTableProps) {
  const rows = yearlyData.filter((row) => row.year >= 1);

  return (
    <div className="max-h-80 overflow-y-auto">
      <table className="w-full min-w-[500px] text-left">
        <thead>
          <tr className="border-b-2 border-surface-stroke">
            <th className="whitespace-nowrap pb-2 pr-4 text-label text-text-tertiary">
              {cleanCopy("Year")}
            </th>
            <th className="whitespace-nowrap pb-2 pr-4 text-label text-text-tertiary">
              {cleanCopy("Portfolio Value")}
            </th>
            <th className="whitespace-nowrap pb-2 pr-4 text-label text-text-tertiary">
              {cleanCopy("Amount Invested")}
            </th>
            <th className="whitespace-nowrap pb-2 pr-4 text-label text-text-tertiary">
              {cleanCopy("Return Earned")}
            </th>
            <th className="whitespace-nowrap pb-2 text-label text-text-tertiary">
              {cleanCopy("Annual Growth")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.year}
              className="border-b border-surface-stroke hover:bg-primary-100/50"
            >
              <td className="py-2 pr-4 text-text-primary">
                {row.year}
              </td>
              <td className="py-2 pr-4 font-mono text-text-primary">
                {fmt(row.portfolio, INVESTMENT_CURRENCY)}
              </td>
              <td className="py-2 pr-4 font-mono text-text-secondary">
                {fmt(row.invested, INVESTMENT_CURRENCY)}
              </td>
              <td className="py-2 pr-4 font-mono font-semibold text-system-success">
                {fmt(row.interest, INVESTMENT_CURRENCY)}
              </td>
              <td className="py-2 font-mono font-semibold text-system-success">
                {fmt(row.annualGrowth, INVESTMENT_CURRENCY)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import Image from "next/image";
import { File02, LineChartUp01, ShieldTick, Zap } from "@untitledui/icons";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextRegular } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

interface SecurityBenefitsSectionProps {
  className?: string;
}

const protectionItems = [
  {
    icon: ShieldTick,
    label: "Bankgrade encryption",
  },
  {
    icon: Zap,
    label: "Role based access",
  },
  {
    icon: File02,
    label: "Regular audits",
  },
  {
    icon: LineChartUp01,
    label: "We never compromise on your data",
  },
] as const;

export function SecurityBenefitsSection({
  className,
}: SecurityBenefitsSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx("w-full py-16", className)}
      aria-labelledby="security-benefits-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="overflow-hidden bg-white">
          <div className="grid items-center gap-x-10 gap-y-0 p-0 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col gap-8 lg:gap-10">
              <div className="flex max-w-[520px] flex-col gap-4">
                <H2
                  id="security-benefits-heading"
                  className="max-w-[520px] text-[2.5rem] leading-[1.12] tracking-heading sm:text-[3rem] lg:text-h1"
                >
                  Institutional grade asset protections
                </H2>
                <TextRegular className="max-w-[520px] text-text-secondary sm:text-[1.125rem] sm:leading-8">
                  With SECP regulation and CDC safekeeping, your investments
                  enjoy the same protections as the nation&apos;s largest
                  financial institutions.
                </TextRegular>
              </div>

              <ul className="flex flex-col gap-2" aria-label="Asset protection features">
                {protectionItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.label} className="flex items-center gap-4">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-200 sm:size-10">
                        <Icon className="size-5 shrink-0" aria-hidden />
                      </div>
                      <TextRegular
                        weight="medium"
                        className="text-text-secondary sm:text-[1.125rem] sm:leading-8"
                      >
                        {item.label}
                      </TextRegular>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex w-full justify-center lg:justify-end">
              <div className="w-full max-w-[600px] overflow-hidden rounded-[2rem] bg-[#fafafa]">
                <Image
                  src="/images/invest/flow%20chart.png"
                  alt="Flow chart illustrating how Mahaana, CDC, and the market protect client assets."
                  width={600}
                  height={640}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 799px) 100vw, (max-width: 1099px) 70vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

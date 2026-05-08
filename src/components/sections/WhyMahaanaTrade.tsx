"use client";

import {
  Zap,
  LineChartUp01,
  MoonStar,
  ShieldTick,
  Sliders01,
  Wallet01,
} from "@untitledui/icons";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextLarge, TextRegular } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const features = [
  {
    icon: Zap,
    title: "Fast, paperless onboarding",
    desc: "Open an account in under 10 minutes. No paperwork, no branches.",
    span: "lg:col-span-2 lg:row-span-2",
    size: "tall" as const,
  },
  {
    icon: LineChartUp01,
    title: "Earn daily, grow steadily",
    desc: "Your savings grow every day with consistent daily returns.",
    span: "lg:col-span-2",
    size: "standard" as const,
  },
  {
    icon: MoonStar,
    title: "Fully shariah-compliant",
    desc: "We invest only in 100% Shariah compliant products. We are also endorsed by Al Hilal.",
    span: "lg:col-span-2 lg:row-span-2",
    size: "tall" as const,
  },
  {
    icon: Sliders01,
    title: "Smart Portfolio Rebalancing",
    desc: "We optimize your portfolio to keep it aligned with your goals.",
    span: "lg:col-span-2",
    size: "standard" as const,
  },
  {
    icon: Wallet01,
    title: "Instant liquidity",
    desc: "Withdraw your funds anytime with no lock-in periods. Your money, your control.",
    span: "lg:col-span-3",
    size: "wide" as const,
  },
  {
    icon: ShieldTick,
    title: "Data & Fund protection",
    desc: "Bank-grade encryption, CDC custody, and SECP regulation at your back.",
    span: "lg:col-span-3",
    size: "wide" as const,
  },
];

export function WhyMahaanaTrade() {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up section-y",
        isVisible && "visible"
      )}
      aria-labelledby="why-mahaana-heading"
    >
      <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-label text-system-brand">
              {cleanCopy("Why MAHAANA")}
            </p>
            <H2
              id="why-mahaana-heading"
              className="text-text-primary w-full max-w-3xl"
            >
              All in one, Shariah Compliant
              <br />
              Investment Platform
            </H2>
          </div>
          <TextRegular className="max-w-2xl text-text-tertiary">
            {cleanCopy(
              "Mahaana Save+ helps you earn daily returns on your money that sits in the zero or minimal returns your bank account offers."
            )}
          </TextRegular>
        </div>

        {/* Cards bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6 lg:auto-rows-[200px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isTall = feature.size === "tall";
            return (
              <motion.div
                key={index}
                className={cx(
                  "flex flex-col justify-between rounded-2xl border border-surface-stroke bg-surface-card p-6 transition-colors hover:border-primary-200/40",
                  isTall && "lg:p-8",
                  feature.span
                )}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -2 }}
              >
                <div
                  className={cx(
                    "flex shrink-0 items-center justify-center rounded-xl bg-primary-100",
                    isTall ? "size-16 p-3" : "size-12 p-2"
                  )}
                >
                  <Icon
                    className={cx(
                      "text-primary-200",
                      isTall ? "size-8" : "size-6"
                    )}
                    aria-hidden
                  />
                </div>
                <div className={cx("flex flex-col gap-2", isTall ? "mt-8" : "mt-6")}>
                  <TextLarge weight="semibold" className="text-text-primary">
                    {feature.title}
                  </TextLarge>
                  <TextRegular className="text-text-tertiary">
                    {cleanCopy(feature.desc)}
                  </TextRegular>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

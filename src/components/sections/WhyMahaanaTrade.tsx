"use client";

import {
  Zap,
  LineChartUp01,
  MoonStar,
  ShieldTick,
  Sliders01,
  Wallet01,
} from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H2, TextLarge, TextRegular } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/utils/cx";

const features = [
  {
    icon: Zap,
    title: "Fast, paperless onboarding",
    desc: "Open an account in under 10 minutes. No paperwork, no branches.",
  },
  {
    icon: LineChartUp01,
    title: "Earn daily, grow steadily",
    desc: "Your savings grow every day with consistent daily returns.",
  },
  {
    icon: MoonStar,
    title: "Fully shariah-compliant",
    desc: "We invest only in 100% Shariah compliant products. We are also endorsed by Al Hilal",
  },
  {
    icon: ShieldTick,
    title: "Data & Fund protection",
    desc: "Bank-grade encryption, CDC custody, and SECP regulation at your back.",
  },
  {
    icon: Wallet01,
    title: "Instant liquidity",
    desc: "Withdraw your funds anytime with no lock-in periods. Your money, your control.",
  },
  {
    icon: Sliders01,
    title: "Smart Portfolio Rebalancing",
    desc: "We optimize your portfolio to keep it aligned with your goals.",
  },
];

export function WhyMahaanaTrade() {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        isVisible && "visible"
      )}
      aria-labelledby="why-mahaana-heading"
    >
      <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-body text-small font-semibold uppercase tracking-wide text-system-brand">
              Why MAHAANA
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
            Mahaana Save+ helps you earn daily returns on your money that sits in
            the zero or minimal returns your bank account offers.
          </TextRegular>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-surface-card p-6"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 p-2">
                  <Icon className="size-6 text-primary-200" aria-hidden />
                </div>
                <div className="flex flex-col gap-2">
                  <TextLarge
                    weight="semibold"
                    className="text-text-primary"
                  >
                    {feature.title}
                  </TextLarge>
                  <TextRegular className="text-text-tertiary">
                    {feature.desc}
                  </TextRegular>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

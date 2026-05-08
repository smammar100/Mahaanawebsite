"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextLarge, TextRegular } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const cardEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function WhyMahaanaTrade() {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      className={cx("section-fade-in-up section-y", isVisible && "visible")}
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
              className="w-full max-w-3xl text-text-primary"
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

        {/* Bento grid: 3 small (top row) + 2 wide (bottom row) on lg */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
          {/* Card 1 — Fast onboarding */}
          <motion.article
            {...cardEntrance(0)}
            className="relative col-span-full flex flex-col overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card p-6 transition-colors hover:border-primary-200/40 lg:col-span-2"
          >
            <FastOnboardingArt />
            <Title>Fast, paperless onboarding</Title>
            <Body>Open an account in under 10 minutes. No paperwork, no branches.</Body>
          </motion.article>

          {/* Card 2 — Shariah compliant */}
          <motion.article
            {...cardEntrance(0.08)}
            className="relative col-span-full flex flex-col overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card p-6 transition-colors hover:border-primary-200/40 sm:col-span-1 lg:col-span-2"
          >
            <ShariahArt />
            <Title>Fully shariah-compliant</Title>
            <Body>
              We invest only in 100% Shariah compliant products. We are also endorsed by Al Hilal.
            </Body>
          </motion.article>

          {/* Card 3 — Instant liquidity */}
          <motion.article
            {...cardEntrance(0.16)}
            className="relative col-span-full flex flex-col overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card p-6 transition-colors hover:border-primary-200/40 sm:col-span-1 lg:col-span-2"
          >
            <InstantLiquidityArt />
            <Title>Instant liquidity</Title>
            <Body>
              Withdraw your funds anytime with no lock-in periods. Your money, your control.
            </Body>
          </motion.article>

          {/* Card 4 — Earn daily (wide, with chart) */}
          <motion.article
            {...cardEntrance(0.24)}
            className="relative col-span-full overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card transition-colors hover:border-primary-200/40 lg:col-span-3"
          >
            <div className="grid h-full p-6 sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between gap-6">
                <Title>Earn daily, grow steadily</Title>
                <Body>
                  Your savings grow every day with consistent, Shariah-compliant daily returns.
                </Body>
              </div>
              <DailyGrowthChart />
            </div>
          </motion.article>

          {/* Card 5 — Data & fund protection (wide, with security mock) */}
          <motion.article
            {...cardEntrance(0.32)}
            className="relative col-span-full overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card transition-colors hover:border-primary-200/40 lg:col-span-3"
          >
            <div className="grid h-full p-6 sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between gap-6">
                <Title>
                  Data &amp; Fund
                  <br aria-hidden />
                  protection
                </Title>
                <Body>
                  Bank-grade encryption, CDC custody, and SECP regulation — your money has a moat.
                </Body>
              </div>
              <ProtectionArt />
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <TextLarge weight="semibold" className="mt-6 text-text-primary">
      {children}
    </TextLarge>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <TextRegular className="mt-2 text-text-tertiary">{cleanCopy(String(children))}</TextRegular>;
}

/* ── Illustrations (inline SVG, on-brand) ─────────────────────────────────── */
/* ── Illustrations (3D PNGs from public/images/illustrations) ─────────────── */

const ILLO = {
  onboarding: { src: "/images/illustrations/onboarding.webp", w: 757, h: 793 },
  shariah: { src: "/images/illustrations/shariah.webp", w: 1166, h: 798 },
  liquidity: { src: "/images/illustrations/liquidity.webp", w: 1188, h: 788 },
  growth: { src: "/images/illustrations/growth.webp", w: 1127, h: 785 },
  security: { src: "/images/illustrations/security.webp", w: 919, h: 768 },
} as const;

/** Phone with a 10-minute countdown, paper plane, and a potted plant. */
function FastOnboardingArt() {
  return (
    <div className="relative mx-auto flex h-36 w-full items-center justify-center sm:h-40">
      <Image
        src={ILLO.onboarding.src}
        alt=""
        width={ILLO.onboarding.w}
        height={ILLO.onboarding.h}
        sizes="(max-width: 600px) 70vw, 200px"
        className="h-full w-auto object-contain"
      />
    </div>
  );
}

/** Halal shield in front of a faded mosque silhouette, with leaves and a podium. */
function ShariahArt() {
  return (
    <div className="relative mx-auto flex h-36 w-full items-center justify-center sm:h-40">
      <Image
        src={ILLO.shariah.src}
        alt=""
        width={ILLO.shariah.w}
        height={ILLO.shariah.h}
        sizes="(max-width: 600px) 70vw, 260px"
        className="h-full w-auto object-contain"
      />
    </div>
  );
}

/** Save+ balance card, wallet with cash, ₨ coin, and a Withdraw pill. */
function InstantLiquidityArt() {
  return (
    <div className="relative mx-auto flex h-36 w-full items-center justify-center sm:h-40">
      <Image
        src={ILLO.liquidity.src}
        alt=""
        width={ILLO.liquidity.w}
        height={ILLO.liquidity.h}
        sizes="(max-width: 600px) 70vw, 280px"
        className="h-full w-auto object-contain"
      />
    </div>
  );
}

/** Stacks of purple coins with growing plants under a sweeping upward arrow. */
function DailyGrowthChart() {
  return (
    <div className="relative mt-6 hidden h-full min-h-[200px] items-center justify-center sm:mt-0 sm:flex">
      <Image
        src={ILLO.growth.src}
        alt=""
        width={ILLO.growth.w}
        height={ILLO.growth.h}
        sizes="(max-width: 1100px) 35vw, 320px"
        className="h-auto max-h-[240px] w-auto object-contain"
      />
    </div>
  );
}

/** Big purple padlock with a shield+check inside, surrounded by floating
 * 256-bit / CDC / SECP credential chips on a dotted orbit. */
function ProtectionArt() {
  return (
    <div className="relative mt-6 hidden h-full min-h-[200px] items-center justify-center sm:mt-0 sm:flex">
      <Image
        src={ILLO.security.src}
        alt=""
        width={ILLO.security.w}
        height={ILLO.security.h}
        sizes="(max-width: 1100px) 35vw, 320px"
        className="h-auto max-h-[260px] w-auto object-contain"
      />
    </div>
  );
}

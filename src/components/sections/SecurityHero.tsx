"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { TextRegular, TextSmall } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const INFO_CARDS = [
  {
    label: "CUSTODIAN",
    title: "Central depository company (CDC)",
    image: "/images/invest/CDC%20color.svg",
    alt: "CDC",
  },
  {
    label: "LICENSED BY",
    title: "Securities & Exchange Commission of Pakistan (SECP)",
    image: "/images/invest/SECP%20logo%20color.svg",
    alt: "SECP",
  },
] as const;

export function SecurityHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16"
      aria-labelledby="security-hero-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div
          className={cx(
            "grid grid-cols-1 grid-rows-1 overflow-hidden rounded-lg bg-transparent",
            "min-h-[280px] sm:min-h-[320px] lg:min-h-0",
            "lg:grid-cols-2"
          )}
        >
          {/* Left column: content — 50% width on desktop */}
          <div className="flex min-w-0 flex-col justify-center gap-8 py-8 px-4 sm:p-8 md:py-10 md:pr-10 md:pl-0 lg:gap-10 lg:pr-12 lg:py-12 xl:pr-20 xl:py-16">
            <div className="flex flex-col gap-4">
              <h1
                id="security-hero-heading"
                className="max-w-[592px] text-text-primary"
              >
                {cleanCopy("Your money fully protected")}
              </h1>
              <TextRegular className="max-w-[446px] text-text-tertiary">
                {cleanCopy(
                  "At Mahaana, we understand that investment security is your primary concern. To address this we've partnered with Central Depository Company (CDC) and are licensed by Securities & Exchange Commission of Pakistan (SECP)."
                )}
              </TextRegular>
            </div>

            <div className="flex flex-col gap-4">
              {INFO_CARDS.map((card) => (
                <div
                  key={card.label}
                  className={cx(
                    "flex min-w-0 w-fit items-center gap-3 rounded-xl border border-surface-stroke/30 p-3 sm:p-4"
                  )}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-surface-stroke/15">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={44}
                      height={44}
                      className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <TextSmall
                      weight="medium"
                      className="text-text-tertiary uppercase tracking-wide"
                    >
                      {card.label}
                    </TextSmall>
                    <TextSmall
                      weight="semibold"
                      className="text-text-primary leading-[1.35]"
                    >
                      {card.title}
                    </TextSmall>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: visual — 50% width on desktop */}
          <div className="relative flex min-h-[280px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl p-0 sm:min-h-[320px] lg:min-h-0">
            <Image
              src="/images/invest/Card.webp"
              alt="Security card illustration"
              width={426}
              height={400}
              className="h-fit w-full max-w-[426px] object-contain lg:w-full"
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

"use client";

import Image from "next/image";
import { ChevronRight, Fingerprint03, PasscodeLock } from "@untitledui/icons";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { TextRegular } from "@/components/ui/Typography";
import { cx } from "@/utils/cx";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

interface ComplianceSectionProps {
  className?: string;
}

const securityCards = [
  {
    type: "image" as const,
    image: "/images/invest/SECP%20logo%20color.svg",
    alt: "SECP",
    text: "Licensed by Security Exchange Commission Pakistan (SECP)",
  },
  {
    type: "image" as const,
    image: "/images/invest/CDC%20color.svg",
    alt: "CDC",
    text: (
      <>
        Custodians Central Depository Company
        <br />
        (CDC)
      </>
    ),
  },
  {
    type: "icon" as const,
    icon: Fingerprint03,
    text: "2FA adds an extra layer of security to safeguard your account.",
  },
  {
    type: "icon" as const,
    icon: PasscodeLock,
    text: "Custom security. Bank-grade encryption. 24/7 protection from fraud.",
  },
];

export function ComplianceSection({ className }: ComplianceSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx(
        "border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        className
      )}
      aria-labelledby="compliance-heading"
    >
      <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Left column - content */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-small font-semibold uppercase tracking-wide text-system-brand">
              Why MAHAANA
            </p>
            <h2
              id="compliance-heading"
              className="font-heading text-[2rem] font-semibold leading-[120%] tracking-heading text-text-primary sm:text-[2.5rem] lg:text-h2"
            >
              Your security is our #1 priority
            </h2>
            <TextRegular className="text-text-secondary text-[1.125rem] leading-7">
              Your funds are securely held with the Central Depository Company
              (CDC) and can only be withdrawn to your bank account. We&apos;re
              SECP-licensed, MUFAP members, and supported by reputable local and
              global sponsors with a top investment team.
            </TextRegular>
            <a
              href="#compliance"
              className="flex items-center gap-1 font-body text-medium font-semibold text-system-brand transition-colors hover:text-primary-300 w-fit"
            >
              Learn more about Mahaana security
              <ChevronRight className="mt-0.5 size-5 shrink-0" aria-hidden />
            </a>
          </div>

          {/* Right column - security cards 2x2 grid */}
          <div
            className={cx(
              "grid grid-cols-2 gap-0 overflow-hidden rounded-2xl",
              "min-h-[150px] sm:min-h-[171px]"
            )}
          >
            {securityCards.map((card, index) => (
              <div
                key={index}
                className={cx(
                  "flex flex-1 flex-col items-center justify-between gap-0 bg-[#F2F2F0] p-3 sm:p-4 min-h-[150px] sm:min-h-[171px]",
                  // 2x2 grid corners
                  index === 0 && "rounded-tl-2xl",
                  index === 1 && "rounded-tr-2xl",
                  index === 2 && "rounded-bl-2xl",
                  index === 3 && "rounded-br-2xl"
                )}
              >
                <div
                  className={cx(
                    "flex flex-1 flex-col items-center justify-center",
                    card.type === "image" ? "h-[52px] min-h-[52px] w-fit" : "h-fit min-h-0 w-full"
                  )}
                >
                  {card.type === "image" ? (
                    <div className="flex h-[52px] w-full flex-shrink-0 items-center justify-center">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        width={52}
                        height={52}
                        className="h-8 w-auto object-contain sm:h-[52px]"
                      />
                    </div>
                  ) : (
                    <card.icon
                      className="size-8 shrink-0 text-text-primary sm:size-10"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="font-body text-small leading-5 text-text-primary text-center shrink-0">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

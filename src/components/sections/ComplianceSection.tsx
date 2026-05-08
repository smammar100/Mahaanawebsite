"use client";

import { ArrowRight, ShieldTick, Wallet01 } from "@untitledui/icons";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { Container } from "@/components/layout/Container";
import { H3, TextLarge, TextRegular } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

interface ComplianceSectionProps {
  className?: string;
  /** When false, hides the "Security" eyebrow and "Learn more about security" CTA (e.g. on the security page). Default true for homepage. */
  showEyebrowAndCta?: boolean;
  /** When false, hides the supporting cards grid (SECP/CDC/Secure transactions/etc.). Default true. */
  showCards?: boolean;
}

type IconCard = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
};
type LogoCard = {
  logo: { src: string; alt: string };
  title: string;
  description: string;
};

const securityCards: (IconCard | LogoCard)[] = [
  {
    logo: { src: "/images/invest/SECP%20logo%20color.svg", alt: "SECP" },
    title: "Regulated by SECP",
    description:
      "We operate under strict investor protection laws as a licensed financial services provider regulated by the SECP.",
  },
  {
    logo: { src: "/images/invest/CDC%20color.svg", alt: "CDC" },
    title: "Assets safeguarded with CDC",
    description:
      "Your investments are securely held in your name with Pakistan's licensed central securities custodian, the CDC.",
  },
  {
    icon: ShieldTick,
    title: "Secure transactions",
    description:
      "No cash handling, your payments go directly to the CDC through verified and secure banking channels.",
  },
  {
    icon: Wallet01,
    title: "We can't touch your funds",
    description:
      "Mahaana never holds your money. You remain in full control of your investments at all times.",
  },
];

export function ComplianceSection({
  className,
  showEyebrowAndCta = true,
  showCards = true,
}: ComplianceSectionProps) {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      id="compliance"
      className={cx(
        "section-fade-in-up w-full section-y",
        isVisible && "visible",
        className
      )}
      aria-labelledby="compliance-heading"
    >
      <Container className="flex flex-col gap-8 px-4 sm:gap-10 sm:px-6 md:px-8 lg:gap-14 lg:px-12 xl:px-16">
        {/* Spotlight header: text left, illustration right */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start gap-2">
              {showEyebrowAndCta && (
                <p className="text-label text-system-brand">
                  {cleanCopy("Security")}
                </p>
              )}
              <H3
                id="compliance-heading"
                className="text-text-primary w-full max-w-3xl"
              >
                How we keep your
                <br />
                money safe
              </H3>
            </div>
            <TextRegular className="mt-4 max-w-2xl text-text-tertiary">
              {cleanCopy(
                "Your financial security is our top priority. By partnering with CDC, we provide a secure environment for your investments. With CDC's robust security protocols and Mahaana's transparent processes, you can be confident that your money is in safe hands."
              )}
            </TextRegular>
            {showEyebrowAndCta && (
              <Button
                href="/security"
                color="secondary"
                size="md"
                iconTrailing={ArrowRight}
                className="mt-6 w-fit"
              >
                Learn more about security
              </Button>
            )}
          </div>

          <motion.div
            className="relative flex min-h-[240px] w-full items-center justify-center sm:min-h-[300px] lg:min-h-[360px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <motion.div
              className="flex w-full max-w-[390px] items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/security/vault.webp"
                alt=""
                width={1000}
                height={991}
                className="h-fit w-full object-contain"
                sizes="(max-width: 1023px) 60vw, 390px"
              />
            </motion.div>
          </motion.div>
        </div>

        {showCards && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {securityCards.map((card) => {
              const Icon = "icon" in card ? card.icon : null;
              return (
                <div
                  key={card.title}
                  className="flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-100 p-2">
                    {"logo" in card ? (
                      <Image
                        src={card.logo.src}
                        alt={card.logo.alt}
                        width={48}
                        height={48}
                        className="size-8 object-contain"
                      />
                    ) : Icon ? (
                      <Icon className="size-6 text-primary-200" aria-hidden />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <TextLarge
                      weight="semibold"
                      className="text-text-primary"
                    >
                      {card.title}
                    </TextLarge>
                    <TextRegular className="text-text-tertiary">
                      {cleanCopy(card.description)}
                    </TextRegular>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

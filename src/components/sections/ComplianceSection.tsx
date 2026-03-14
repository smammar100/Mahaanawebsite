"use client";

import { ArrowRight, ShieldTick, Wallet01 } from "@untitledui/icons";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { Container } from "@/components/layout/Container";
import { H2, TextLarge, TextRegular } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/utils/cx";

interface ComplianceSectionProps {
  className?: string;
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

export function ComplianceSection({ className }: ComplianceSectionProps) {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      id="compliance"
      className={cx(
        "section-fade-in-up w-full border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        isVisible && "visible",
        className
      )}
      aria-labelledby="compliance-heading"
    >
      <Container className="flex flex-col gap-8 px-4 sm:gap-10 sm:px-6 md:px-8 lg:gap-14 lg:px-12 xl:px-16">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start gap-2">
            <p className="font-body text-small font-semibold uppercase tracking-wide text-system-brand">
              Security
            </p>
            <H2
              id="compliance-heading"
              className="text-text-primary w-full max-w-3xl"
            >
              How we keep your
              <br />
              money safe
            </H2>
          </div>
          <TextRegular className="mt-4 max-w-2xl text-text-tertiary">
            Your financial security is our top priority. By partnering with
            CDC, we provide a secure environment for your investments. With
            CDC&apos;s robust security protocols and Mahaana&apos;s transparent
            processes, you can be confident that your money is in safe hands.
          </TextRegular>
          <Button
            href="/security"
            color="secondary"
            size="md"
            iconTrailing={ArrowRight}
            className="mt-6 w-fit"
          >
            Learn more about security
          </Button>
        </div>

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
                    {card.description}
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

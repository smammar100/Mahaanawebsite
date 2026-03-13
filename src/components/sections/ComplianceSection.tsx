"use client";

import { File02, Target04, Zap } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H2, TextLarge, TextRegular } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/utils/cx";

interface ComplianceSectionProps {
  className?: string;
}

const securityCards = [
  {
    icon: Zap,
    title: "Regulated by SECP",
    description:
      "We operate under strict investor protection laws as a licensed financial services provider regulated by the SECP.",
  },
  {
    icon: File02,
    title: "Assets safeguarded with CDC",
    description:
      "Your investments are securely held in your name with Pakistan's licensed central securities custodian, the CDC.",
  },
  {
    icon: Target04,
    title: "Secure transactions",
    description:
      "No cash handling, your payments go directly to the CDC through verified and secure banking channels.",
  },
  {
    icon: Target04,
    title: "We can't touch your funds",
    description:
      "Mahaana never holds your money. You remain in full control of your investments at all times.",
  },
] as const;

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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-10 xl:gap-20">
          <div className="min-w-0">
            <H2
              id="compliance-heading"
              className="max-w-[600px] text-[2.5rem] leading-[1.15] tracking-heading sm:text-[3rem] lg:text-[3.5rem]"
            >
              How we keep your money safe
            </H2>
          </div>
          <TextRegular className="min-w-0 text-text-secondary sm:text-[1.125rem] sm:leading-8 lg:max-w-[520px]">
            Your financial security is our top priority. By partnering with
            CDC, we provide a secure environment for your investments. With
            CDC&apos;s robust security protocols and Mahaana&apos;s transparent
            processes, you can be confident that your money is in safe hands.
          </TextRegular>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {securityCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 p-2">
                  <Icon className="size-6 text-primary-200" aria-hidden />
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

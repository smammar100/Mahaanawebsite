"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { H3, TextLarge, TextRegular } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { cleanCopy } from "@/lib/copy-utils";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/utils/cx";

const features = [
  {
    number: "Step 1",
    title: "Answer few questions",
    description:
      "Fill out your details in less than 10 minutes and get onboarded",
    image: "/images/invest/Step%201.webp",
    imageOrder: "order-1",
    contentOrder: "order-2",
    href: "#open-account",
  },
  {
    number: "Step 2",
    title: "Fund your account",
    description:
      "Invest as low as PKR5,000 to open your Mahaana account.",
    image: "/images/invest/Step%202.webp",
    imageOrder: "order-2",
    contentOrder: "order-1",
    href: "#open-account",
  },
  {
    number: "Step 3",
    title: "Watch your savings grow",
    description:
      "Watch your investments work for you while we do the heavy lifting",
    image: "/images/invest/Step%203.webp",
    imageOrder: "order-1",
    contentOrder: "order-2",
    href: "#open-account",
  },
];

export function FeatureCards() {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 pb-32",
        isVisible && "visible"
      )}
      aria-labelledby="feature-cards-heading"
    >
      <Container className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
        {/* Header */}
        <div className="flex flex-col items-start gap-0">
          <div className="flex flex-col items-start gap-2">
            <p className="text-label text-system-brand">
              {cleanCopy("Investing made effortless")}
            </p>
            <H3
              id="feature-cards-heading"
              className="text-text-primary w-full max-w-3xl"
            >
              Open your Mahaana account in under 10 minutes
            </H3>
          </div>
          <TextRegular className="mt-4 max-w-2xl text-text-tertiary">
            Your money shouldn&apos;t sit on the sidelines. Get started with Mahaana today.
          </TextRegular>
        </div>

        {/* Cards grid: min height so grid doesn't collapse; rows size to content */}
        <div className="grid h-fit min-h-[380px] grid-cols-1 grid-auto-rows-[minmax(380px,auto)] gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 pb-16">
          {features.map((feature, index) => (
            <div key={index} className="min-h-[380px] w-full">
              <PinContainer
                href={feature.href}
                containerClassName="block h-full w-full"
                className="flex h-full flex-col rounded-2xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card"
              >
                <div className="flex min-h-full flex-1 flex-col">
                  <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-bg ${feature.imageOrder}`}>
                    <Image
                      src={feature.image}
                      alt={feature.title ? `Illustration for ${feature.title}` : "Feature illustration"}
                      width={400}
                      height={400}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="h-[200px] w-full rounded-xl object-contain"
                    />
                  </div>
                  <div className={`mt-4 flex flex-1 flex-col p-2 ${feature.contentOrder}`}>
                  <p className="text-text-tertiary">
                    {feature.number}
                  </p>
                  <TextLarge
                    weight="semibold"
                    className="mt-3 text-text-primary"
                  >
                    {feature.title}
                  </TextLarge>
                  <TextRegular className="mt-2 text-text-tertiary">
                    {feature.description}
                  </TextRegular>
                </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// PinContainer and PinPerspective - adapted from Aceternity UI 3D Pin
// Original: https://ui.aceternity.com/registry/3d-pin.json

interface PinContainerProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  containerClassName?: string;
}

function PinContainer({
  children,
  href,
  className,
  containerClassName,
}: PinContainerProps) {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cx("group/pin relative z-50 cursor-pointer", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="group"
    >
      {/* Spacer so container has height when both card and overlay are absolute */}
      <div className="min-h-[380px] w-full" aria-hidden />
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 mt-4 ml-[0.09375rem] w-full -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{ transform }}
          className="absolute left-1/2 top-1/2 flex w-full items-start justify-start overflow-hidden rounded-2xl transition duration-700"
        >
          <div className={cx("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective href={href} />
    </div>
  );
}

interface PinPerspectiveProps {
  href?: string;
}

function PinPerspective({ href }: PinPerspectiveProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[60] flex items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100 [&>[data-clickable]]:pointer-events-auto">
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 justify-center" data-clickable>
          <Button
            href={href || "#open-account"}
            color="primary"
            size="md"
            className="rounded-xl"
          >
            Open your account
          </Button>
        </div>

        {/* Pin line and dot (landing point) */}
        <div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-primary-300 blur-[2px] group-hover/pin:h-40" />
        <div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-primary-300 group-hover/pin:h-40" />
        <div className="absolute bottom-1/2 right-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-primary-200 blur-[3px]" />
        <div className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-primary-300" />
      </div>
    </div>
  );
}

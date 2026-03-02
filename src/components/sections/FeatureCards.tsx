"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { H2, TextLarge, TextRegular } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const features = [
  {
    number: "Step 1",
    title: "Answer few questions",
    description:
      "Fill out your details in less than 10 mins and get onboarded",
    image: "/images/invest/Step 1.png",
    imageOrder: "order-1",
    contentOrder: "order-2",
    href: "#open-account",
  },
  {
    number: "Step 2",
    title: "Fund your account",
    description:
      "Invest as low as PKR 5,000 to open your Mahaana Investment account",
    image: "/images/invest/Step 2.png",
    imageOrder: "order-2",
    contentOrder: "order-1",
    href: "#open-account",
  },
  {
    number: "Step 3",
    title: "Watch your savings grow",
    description:
      "Watch your investments work for you while we do the heavy lifting",
    image: "/images/invest/Step 3.png",
    imageOrder: "order-1",
    contentOrder: "order-2",
    href: "#open-account",
  },
];

export function FeatureCards() {
  return (
    <section
      className="border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 pb-28"
      aria-labelledby="feature-cards-heading"
    >
      <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Header */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col items-start" style={{ gap: '0.5rem' }}>
            <p className="font-body text-small font-semibold uppercase tracking-wide text-system-brand">
              Investing made effortless
            </p>
            <H2
              id="feature-cards-heading"
              className="text-text-primary w-full max-w-[600px]"
            >
              Open your Mahaana account in under 10 minutes
            </H2>
          </div>
          <TextRegular className="max-w-2xl text-text-secondary">
            Your money shouldn&apos;t sit on the sidelines. Get started with Mahaana today.
          </TextRegular>
        </div>

        {/* Cards grid */}
        <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="w-full">
              <PinContainer
                href={feature.href}
                containerClassName="block h-full w-full"
                className="flex h-full flex-col rounded-2xl border border-surface-stroke bg-surface-card p-4"
              >
                <div className="flex min-h-full flex-1 flex-col">
                  <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-bg ${feature.imageOrder}`}>
                    <img
                      src={feature.image}
                      alt=""
                      width={800}
                      height={500}
                      className="h-[200px] w-full rounded-xl object-contain"
                    />
                  </div>
                  <div className={`mt-4 flex flex-1 flex-col p-2 ${feature.contentOrder}`}>
                  <p className="font-body text-small font-medium leading-none tracking-tight text-text-tertiary">
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
    <motion.div className="pointer-events-none z-[60] flex h-80 w-96 items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100 [&>[data-clickable]]:pointer-events-auto">
      <div className="inset-0 -mt-7 h-full w-full flex-none">
        <div className="absolute inset-x-0 top-0 flex justify-center" data-clickable>
          <Button
            href={href || "#open-account"}
            color="primary"
            size="md"
            className="rounded-xl"
          >
            Open your account
          </Button>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 mt-4 ml-[0.09375rem] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
            transition={{ duration: 6, repeat: Infinity, delay: 0 }}
            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-primary-300/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-primary-300/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
            transition={{ duration: 6, repeat: Infinity, delay: 4 }}
            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-primary-300/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          />
        </div>

        <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-primary-300 blur-[2px] group-hover/pin:h-40" />
        <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-primary-300 group-hover/pin:h-40" />
        <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-primary-200 blur-[3px]" />
        <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-primary-300" />
      </div>
    </motion.div>
  );
}

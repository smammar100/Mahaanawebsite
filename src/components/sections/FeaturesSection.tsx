"use client";

import Image from "next/image";
import { CheckCircle } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { cleanCopy } from "@/lib/copy-utils";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/utils/cx";

const savePlusFeatures = [
  "Build wealth securely with low risk, optimized funds",
  "Completely liquid: withdraw your money anytime you want",
  "Secure, SECP-regulated, and built for your peace of mind",
];

const retirementFeatures = [
  "Claim up to a 20% income tax credit on your contributions",
  "100% Shariah compliant, expert curated portfolios",
  "Personalized to your unique risk level and retirement goals",
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4 items-start w-full">
      <div
        className="flex shrink-0 size-7 items-center justify-center rounded-[14px] bg-primary-100"
        aria-hidden
      >
        <CheckCircle className="size-4 text-primary-200" />
      </div>
          <TextRegular className="flex-1 text-white/95 leading-7 min-w-0">
        {children}
      </TextRegular>
    </div>
  );
}

interface FeatureBlockProps {
  badge: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  imageSrc: string;
  imageFirst?: boolean;
}

function FeatureBlock({
  badge,
  title,
  description,
  features,
  cta,
  ctaHref,
  imageSrc,
  imageFirst = false,
}: FeatureBlockProps) {
  return (
    <div className="flex flex-col gap-8 sm:gap-12 lg:gap-24 items-center w-full">
      <div
        className={`flex flex-col gap-6 sm:gap-8 lg:gap-12 w-full lg:flex-row lg:items-stretch ${
          imageFirst ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Content */}
        <div className="flex flex-1 flex-col order-2 lg:order-1">
          <p className="text-label text-primary-150 mb-2">
            {cleanCopy(badge)}
          </p>
          <H3 className="text-white/95 mb-4">
            {title}
          </H3>
          <TextRegular className="text-white/95 max-w-xl mb-6">
            {cleanCopy(description)}
          </TextRegular>
          <div className="flex flex-col gap-2 mb-10">
            {features.map((feature, i) => (
              <CheckItem key={i}>{cleanCopy(feature)}</CheckItem>
            ))}
          </div>
          <Button
            href={ctaHref}
            color="secondary"
            size="lg"
            className="w-fit rounded-lg"
          >
            {cleanCopy(cta)}
          </Button>
        </div>

        {/* Image */}
        <div className="flex flex-1 min-w-0 order-1 lg:order-2">
          <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] lg:min-h-0 rounded-[10px] overflow-hidden shadow-[0px_32px_64px_-12px_rgba(16,24,40,0.14)] border border-surface-stroke">
            <Image
              src={imageSrc}
              alt={title ? `Illustration for ${title}` : "Feature illustration"}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up border-t border-surface-stroke pt-16 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 bg-gradient-brand",
        isVisible && "visible"
      )}
      aria-labelledby="features-heading"
    >
      <Container className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-5 items-center text-center px-0 sm:px-4">
          <div className="inline-flex items-center justify-center rounded-2xl px-2 py-0.5">
            <p className="text-label text-white">
              {cleanCopy("Investing made effortless")}
            </p>
          </div>
          <H3
            id="features-heading"
            className="text-white/95 max-w-[28rem]"
          >
            Find the perfect ways to Invest
          </H3>
        </div>

        {/* Feature blocks */}
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          <FeatureBlock
            badge="MAHAANA SAVE+"
            title="High yield savings, without the bank restrictions."
            description="Protect your purchasing power and build your safety net. Save+ gives you access to institutional level, low risk funds that deliver steady growth, all with the flexibility to access your money whenever you need it."
            features={savePlusFeatures}
            cta="Learn more about Save+"
            ctaHref="/retirement"
            imageSrc="/images/invest/Save+.webp"
          />
          <FeatureBlock
            badge="MAHAANA RETIREMENT"
            title="Build your future. Cut your tax bill by up to 20%."
            description="Grow your long term savings with a Shariah compliant, tax efficient retirement plan. We build a personalized portfolio based on your goals, allowing you to build wealth securely while significantly reducing your monthly income tax."
            features={retirementFeatures}
            cta="Learn more about Retirement"
            ctaHref="#retirement"
            imageSrc="/images/invest/Retirement.webp"
            imageFirst
          />
        </div>
      </Container>
    </section>
  );
}

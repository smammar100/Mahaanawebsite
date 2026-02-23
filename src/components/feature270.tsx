"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Button } from "@/components/ui/button";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
  icon?: string;
  learnMoreHref?: string;
}

interface ControlsProps {
  handleNext: () => void;
  handlePrevious: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const Controls = ({
  handleNext,
  handlePrevious,
  isPreviousDisabled,
  isNextDisabled,
}: ControlsProps) => {
  return (
    <div className="hidden flex-col items-start gap-4 lg:flex">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full !bg-background/50 hover:!bg-background/100 [&_svg:not([class*='size-'])]:size-6"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
      >
        <ChevronUp />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full !bg-background/50 hover:!bg-background/100 [&_svg:not([class*='size-'])]:size-6"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <ChevronDown />
      </Button>
    </div>
  );
};

interface FeatureCardProps {
  feature: FeatureItem;
  isActive: boolean;
  onClick: () => void;
}

const FeatureCard = ({ feature, isActive, onClick }: FeatureCardProps) => {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        transition={{
          layout: {
            duration: 0.4,
            ease: "easeOut",
          },
        }}
        style={{
          borderRadius: "16px",
        }}
        className="flex cursor-pointer items-start gap-4 overflow-hidden bg-white md:w-fit md:max-w-sm"
        onClick={onClick}
      >
        {isActive ? (
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`feature-description-active-${feature.title}`}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="p-6 md:p-8"
          >
            <p className="body-md">
              <span className="font-semibold">{feature.title}.</span>{" "}
              <span>{feature.description}</span>
            </p>
            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
              <Button variant="link" className="gap-2 p-0 h-auto" asChild>
                <Link href={feature.learnMoreHref ?? "#"}>
                  Learn more about {feature.title}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`feature-description-inactive-${feature.title}`}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: "easeOut",
            }}
            className={cn(
              "flex h-fit shrink-0 items-center gap-4 md:py-3.5 md:pr-6 md:pl-3",
              !isActive && "h-0 w-0 md:h-auto md:w-auto",
            )}
            style={{
              height: "auto",
              lineHeight: "normal",
            }}
          >
            {feature.icon ? (
              <img
                src={feature.icon}
                alt=""
                className="size-6 shrink-0"
                width={24}
                height={24}
              />
            ) : (
              <PlusCircle strokeWidth={1.5} className="shrink-0" />
            )}
            <p className="body-md shrink-0 font-semibold">{feature.title}</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

interface FeaturesDesktopProps {
  features: FeatureItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  handleFeatureClick: (index: number) => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesDesktop = ({
  features,
  handleNext,
  handlePrevious,
  activeIndex,
  handleFeatureClick,
  isPreviousDisabled,
  isNextDisabled,
}: FeaturesDesktopProps) => {
  return (
    <div className="relative z-10 hidden items-start justify-start gap-6 md:flex">
      <Controls
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
      <div className="flex flex-col gap-4">
        {features.map((feature, index) => {
          return (
            <FeatureCard
              key={`feature-card-${index}`}
              feature={feature}
              isActive={index === activeIndex}
              onClick={() => handleFeatureClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface FeatureMobileProps {
  features: FeatureItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  direction: 1 | -1;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesMobile = ({
  features,
  handleNext,
  handlePrevious,
  activeIndex,
  direction,
  isPreviousDisabled,
  isNextDisabled,
}: FeatureMobileProps) => {
  const variants = {
    initial: (d: 1 | -1) => ({
      opacity: 0,
      scale: 0.6,
      x: d * 50 + "%",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (d: 1 | -1) => ({
      opacity: 0,
      scale: 0.6,
      x: d * -50 + "%",
    }),
  };

  return (
    <div className="absolute bottom-6 left-0 z-10 flex w-full items-end justify-between gap-6 px-6 md:hidden">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full !bg-background/100 [&_svg:not([class*='size-'])]:size-6"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
      >
        <ChevronLeft />
      </Button>
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`feature-mobile-${activeIndex}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="h-full w-full object-cover"
        >
          <FeatureCard
            feature={features[activeIndex]}
            isActive={true}
            onClick={() => {}}
          />
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full !bg-background/100 [&_svg:not([class*='size-'])]:size-6"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    image: "/images/retirement.png",
    title: "Retirement",
    description:
      "Build a foundation for your goals. Our retirement solutions help you save with purpose and grow your capital with integrity.",
    icon: "/images/retirement.svg",
    learnMoreHref: "#",
  },
  {
    image: "/images/Save+.png",
    title: "Save+",
    description:
      "Move forward together with a platform where your savings are invested with clarity and care.",
    icon: "/images/save+.svg",
    learnMoreHref: "#",
  },
];

interface Feature270Props {
  heading?: string;
  subheading?: string;
  features?: FeatureItem[];
  className?: string;
}

const Feature270 = ({
  className,
  heading = "Find the Perfect Way to Invest",
  subheading = "Everyone invests differently that's why Mahaana gives you options that fit your goals, lifestyle, and pace.",
  features = DEFAULT_FEATURES,
}: Feature270Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleNext = () => {
    setDirection(1);
    if (activeIndex !== features.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    if (activeIndex !== 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleFeatureClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const xOffset = !isMobile ? 50 : 15;
  const yOffset = !isMobile ? 15 : 5;
  const scale = !isMobile ? 0.6 : 0.8;

  const variants = {
    initial: (d: 1 | -1) => ({
      opacity: 0,
      scale: scale,
      x: d * xOffset + "%",
      y: d * yOffset + "%",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: (d: 1 | -1) => ({
      opacity: 0,
      scale: scale,
      x: d * -xOffset + "%",
      y: d * -yOffset + "%",
    }),
  };

  return (
    <div
      className={cn(
        "bg-background page-container py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-16",
        className,
      )}
    >
      <section className="h-fit w-full space-y-12 md:space-y-10">
        <div className="relative max-w-5xl space-y-4">
          <h3 className="text-left">{heading}</h3>
          <p className="body-lg text-left">{subheading}</p>
        </div>
        <div className="relative min-h-[70vh] w-full overflow-hidden rounded-3xl bg-white px-6 py-6 md:min-h-[70vh] md:px-8 md:py-8 lg:py-20">
          <FeaturesDesktop
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            handleFeatureClick={handleFeatureClick}
            isPreviousDisabled={activeIndex === 0}
            isNextDisabled={activeIndex === features.length - 1}
          />
          <FeaturesMobile
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            direction={direction}
            isPreviousDisabled={activeIndex === 0}
            isNextDisabled={activeIndex === features.length - 1}
          />

          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.img
                key={`feature-image-${activeIndex}`}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Feature270 };

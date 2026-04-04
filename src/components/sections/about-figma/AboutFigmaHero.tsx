"use client";

import { Container } from "@/components/layout/Container";
import { H1 } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { aboutFigmaData } from "./aboutFigma.data";
import { cx } from "@/utils/cx";

export function AboutFigmaHero() {
  const { ref, isVisible } = useInView(0.15);

  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up pt-[8rem] pb-[4rem]",
        isVisible && "visible"
      )}
      aria-labelledby="about-figma-hero-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-6">
          <H1
            id="about-figma-hero-heading"
            className="h-fit max-w-4xl text-4xl leading-tight tracking-[-0.03em] text-text-primary sm:text-5xl lg:text-6xl"
          >
            {aboutFigmaData.hero.title}
          </H1>
          <img
            src={aboutFigmaData.hero.image}
            alt="Team collaborating around a planning board"
            loading="lazy"
            className="h-56 w-full rounded-2xl object-cover sm:h-72 lg:h-[520px]"
          />
        </div>
      </Container>
    </section>
  );
}

"use client";

import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import ShinyText from "@/components/ui/ShinyText";
import { H2 } from "@/components/ui/Typography";

const CULTURE_IMAGES = [
  { src: "/images/invest/about-us-1.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-2.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-3.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-4.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-5.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-6.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-7.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-8.webp", alt: "Mahaana culture" },
  { src: "/images/invest/about-us-9.webp", alt: "Mahaana culture" },
];

export function AboutCultureSection() {
  return (
    <div
      className="w-full bg-surface-bg"
      aria-labelledby="about-culture-heading"
    >
      <div className="relative w-full min-h-[70vh] overflow-hidden">
        <InfiniteGallery
          images={CULTURE_IMAGES}
          speed={1.2}
          visibleCount={9}
          falloff={{ near: 0.8, far: 14 }}
          className="h-[70vh] w-full sm:h-[80vh] lg:h-screen"
        />

        {/* Overlay: heading only — pointer-events-none so wheel/scroll drives gallery */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
          <H2
            id="about-culture-heading"
            className="max-w-xl font-serif italic text-3xl sm:text-4xl lg:text-5xl text-center"
          >
            <ShinyText
              text="Inside"
              speed={2}
              delay={0}
              color="#9333ea"
              shineColor="#e9d5ff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
            <br />
            <ShinyText
              text="Mahaanaverse"
              speed={2}
              delay={0}
              color="#9333ea"
              shineColor="#e9d5ff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
          </H2>
        </div>
      </div>
    </div>
  );
}

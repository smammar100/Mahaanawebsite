"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { DirectionAwareHover } from "@/components/aceternity/direction-aware-hover";

const images = [
  {
    id: 1,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random5.jpeg",
    title: "Summer Collection",
    code: "#0031",
    imgClass: "h-[280px] w-full rounded-3xl md:h-[280px] md:w-full",
  },
  {
    id: 2,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    title: "The Music Festival",
    code: "#0030",
    imgClass: "h-[280px] w-full rounded-3xl md:h-[280px] md:w-full lg:col-span-2",
  },
  {
    id: 3,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random13.jpeg",
    title: "Winter Special",
    code: "#0032",
    imgClass:
      "h-[280px] col-span-1 w-full rounded-3xl md:h-[280px] md:w-full lg:row-span-2 lg:h-full",
  },
  {
    id: 4,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    title: "Spring Edition",
    code: "#0033",
    imgClass: "h-[280px] w-full rounded-3xl md:h-[280px] md:w-full",
  },
  {
    id: 5,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    title: "Spring Edition",
    code: "#0033",
    imgClass: "h-[280px] w-full rounded-3xl md:h-[280px] md:w-full lg:col-span-2",
  },
];

interface Hero233Props {
  className?: string;
}

const Hero233 = ({ className }: Hero233Props) => {
  return (
    <section
      className={cn(
        "relative w-full bg-background py-8 md:py-12 lg:py-16",
        className,
      )}
    >
      <div className="page-container overflow-hidden">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col items-start text-left">
            <h2 className="font-heading w-full">
              For each moment,
              <br />
              a different Mahaana
            </h2>
            <p className="body-lg mt-4 max-w-[75ch] font-normal text-muted-foreground">
              Your investments should effortlessly adapt to your changing life
              stages. We provide smart, Shariah-compliant tools that simplify
              everyday wealth management. Grow your savings with complete peace
              of mind to reach your unique goals.
            </p>
          </div>
          <div className="relative mx-auto mt-4 mb-4 grid w-full max-w-full grid-cols-2 justify-center gap-[10px] lg:grid-cols-4">
            {images.map((item) => (
              <DirectionAwareHover
                key={item.id}
                className={item.imgClass}
                imageUrl={item.src}
                childrenClassName="text-white"
              >
                <p className="body-lg font-semibold">{item.title}</p>
              </DirectionAwareHover>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero233 };

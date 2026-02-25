"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Button } from "@/components/ui/button";

interface Feature254Props {
  className?: string;
}

const circle1Images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person5.jpeg",
];

const circle2Images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
];

const circle3Images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person1.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person2.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person3.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person5.jpeg",
];

const Feature254 = ({ className }: Feature254Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="page-container relative flex w-full justify-center">
        {/* Orbiting circles container – explicit size so it doesn’t collapse when all children are absolute */}
        <div className="relative w-full max-w-[90vw] aspect-square overflow-hidden md:max-w-[38.75rem]">
            <OrbitingCircles iconSize={40} radius={130} speed={2} path={true}>
              {circle1Images.map((src, index) => (
                <div
                  key={index}
                  className="size-10 overflow-hidden rounded-full border border-border bg-muted"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} className="size-full object-cover" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={200} reverse speed={2} path={true}>
              {circle2Images.map((src, index) => (
                <div
                  key={index}
                  className="size-10 overflow-hidden rounded-full border border-border bg-muted"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} className="size-full object-cover" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={280} speed={1} path={true}>
              {circle3Images.map((src, index) => (
                <div
                  key={index}
                  className="size-10 overflow-hidden rounded-full border border-border bg-muted"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} className="size-full object-cover" alt="" />
                </div>
              ))}
            </OrbitingCircles>
        </div>

        {/* Central content overlay – positioned over the orbit container so orbs show behind */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/3 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-background/80 blur-2xl" />
          <h2 className="relative z-10 font-heading text-center">
            Powered by people.
            <br />
            Secured by Mahaana.
          </h2>
          <p className="body-lg relative z-10 max-w-2xl text-center text-muted-foreground">
            Over 25,000 Pakistanis are already growing their savings with purpose. Wealth building isn&apos;t a secret club anymore. Join the movement. Secure your tomorrow.
          </p>
          <div className="relative z-10 pointer-events-auto">
            <Button
              variant="default"
              className="group w-fit rounded-full px-10 tracking-tighter shadow-none"
            >
              Open your account.
              <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature254 };

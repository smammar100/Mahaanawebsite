"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const images = [
  {
    id: 1,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random5.jpeg",
    title: "Summer Collection",
    code: "#0031",
  },
  {
    id: 2,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    title: "The Music Festival",
    code: "#0030",
  },
  {
    id: 3,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random13.jpeg",
    title: "Winter Special",
    code: "#0032",
  },
  {
    id: 4,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    title: "Spring Edition",
    code: "#0033",
  },
  {
    id: 5,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    title: "Spring Edition",
    code: "#0033",
  },
];

interface Hero233Props {
  className?: string;
}

const Hero233 = ({ className }: Hero233Props) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <section
      className={cn(
        "relative w-full bg-background py-6 sm:py-8 md:py-16 lg:py-12 xl:py-16 2xl:py-16",
        className,
      )}
    >
      <div className="page-container overflow-hidden">
        <div className="relative flex w-full flex-col items-start justify-start gap-12 p-6 py-12 md:flex-row md:px-0 md:py-0">
          <div className="flex min-h-[20rem] shrink-0 flex-col justify-center md:max-w-xl">
            <h2 className="font-heading h-fit max-w-lg">
              For each moment, a different Mahaana
            </h2>
            <p className="body-lg mt-4 max-w-md font-normal text-muted-foreground">
              Your investments should effortlessly adapt to your changing life
              stages. We provide smart, Shariah-compliant tools that simplify
              everyday wealth management. Grow your savings with complete peace
              of mind to reach your unique goals.
            </p>
            <Button
              variant="default"
              className="group mt-10 flex w-fit items-center justify-center gap-2 rounded-full tracking-tight"
            >
              Contact Us
              <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:rotate-0" />
            </Button>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1">
            <div className="w-full min-w-[20rem]">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border"
                  initial={{ height: "2.5rem", width: "100%" }}
                  animate={{
                    height: activeImage === index ? "24rem" : "2.5rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => setActiveImage(index)}
                  onHoverStart={() => setActiveImage(index)}
                >
                <AnimatePresence>
                  {activeImage === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute h-full w-full bg-gradient-to-t from-black/80 to-transparent"
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {activeImage === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute flex h-full w-full flex-col items-end justify-end px-4 pb-5"
                    >
                      <h3 className="body-lg font-semibold text-white">
                        {image.title.split(" ")[0]}
                        <span className="body-lg font-semibold italic">
                          {" "}
                          {image.title.split(" ")[1]}{" "}
                        </span>
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
                <img
                  src={image.src}
                  className="size-full object-cover"
                  alt={image.title}
                />
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero233 };

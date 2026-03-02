"use client";

import Image from "next/image";
import { cx } from "@/utils/cx";

interface PhoneMockupProps {
  src: string;
  className?: string;
  screenClassName?: string;
}

export function PhoneMockup({ src, className, screenClassName }: PhoneMockupProps) {
  return (
    <div
      className={cx(
        "relative flex overflow-hidden rounded-[2.5rem] bg-gray-900 p-2 ring-1 ring-surface-stroke",
        className
      )}
    >
      <div
        className={cx(
          "relative flex-1 overflow-hidden rounded-[1.75rem]",
          screenClassName
        )}
      >
        <Image
          src={src}
          alt="App screenshot"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 384px"
        />
      </div>
    </div>
  );
}

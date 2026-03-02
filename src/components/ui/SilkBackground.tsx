"use client";

import Silk, { type SilkProps } from "./Silk";

interface SilkBackgroundProps extends SilkProps {
  className?: string;
}

export function SilkBackground({
  className,
  ...silkProps
}: SilkBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Silk
        {...silkProps}
        className={className ?? "absolute inset-0 h-full w-full"}
      />
    </div>
  );
}

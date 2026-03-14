"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1.520833333, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        aspectRatio: String(ratio),
        ...style,
      }}
      {...props}
    />
  )
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };

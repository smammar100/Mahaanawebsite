"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cx } from "@/utils/cx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(
          "flex h-10 w-full rounded-lg border border-surface-stroke bg-surface-bg px-3 py-2 text-text-primary placeholder:text-text-tertiary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

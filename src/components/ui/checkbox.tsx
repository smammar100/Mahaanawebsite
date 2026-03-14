"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange"> {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const isIndeterminate = checked === "indeterminate";
    const isChecked = checked === true;

    return (
      <input
        type="checkbox"
        ref={ref}
        checked={isChecked}
        data-state={isIndeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked"}
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        className={cn(
          "size-4 shrink-0 rounded border border-surface-stroke bg-surface-bg transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-2",
          "accent-system-brand cursor-pointer",
          className
        )}
        onChange={(e) => {
          const next = e.target.checked;
          onCheckedChange?.(next);
        }}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };

"use client";

import type { HTMLAttributes, LabelHTMLAttributes } from "react";
import { cx } from "@/utils/cx";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  "data-invalid"?: boolean;
}

export function Field({ className, children, ...props }: FieldProps) {
  return (
    <div className={cx("space-y-2", className)} data-field {...props}>
      {children}
    </div>
  );
}

interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      className={cx("text-sm font-medium text-text-primary", className)}
      {...props}
    />
  );
}

interface FieldErrorProps {
  errors?: Array<{ message?: string } | undefined>;
  className?: string;
}

export function FieldError({ errors, className }: FieldErrorProps) {
  const message = errors?.find((e) => e?.message)?.message;
  if (!message) return null;
  return (
    <span
      className={cx("text-small text-system-error", className)}
      role="alert"
    >
      {message}
    </span>
  );
}

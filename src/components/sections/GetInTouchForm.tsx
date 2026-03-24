"use client";

import { Button } from "@/components/base/buttons/button";
import { H3 } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";

export function GetInTouchForm() {
  return (
    <div className="rounded-2xl border border-surface-stroke bg-surface-card p-6 shadow-sm md:p-8">
      <H3 className="flex items-center gap-2 text-text-primary">
        <span aria-hidden>
          <svg
            className="size-5 text-system-brand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
        {cleanCopy("Get in Touch")}
      </H3>
      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label htmlFor="contact-name" className="sr-only">
            {cleanCopy("Name")}
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder={cleanCopy("Name")}
            className="w-full rounded-lg border border-surface-stroke bg-surface-bg px-4 py-2.5 text-body text-text-primary placeholder:text-text-tertiary focus:border-system-brand focus:outline-none focus:ring-2 focus:ring-system-brand/20"
          />
          <label htmlFor="contact-email" className="sr-only">
            {cleanCopy("Email")}
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder={cleanCopy("Email")}
            className="w-full rounded-lg border border-surface-stroke bg-surface-bg px-4 py-2.5 text-body text-text-primary placeholder:text-text-tertiary focus:border-system-brand focus:outline-none focus:ring-2 focus:ring-system-brand/20"
          />
        </div>
        <label htmlFor="contact-message" className="sr-only">
          {cleanCopy("Message")}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder={cleanCopy("Message")}
          className="w-full rounded-lg border border-surface-stroke bg-surface-bg px-4 py-2.5 text-body text-text-primary placeholder:text-text-tertiary focus:border-system-brand focus:outline-none focus:ring-2 focus:ring-system-brand/20"
        />
        <div className="flex items-center gap-2">
          <input
            id="contact-save-name"
            type="checkbox"
            className="size-4 rounded border-surface-stroke text-system-brand focus:ring-system-brand"
          />
          <label htmlFor="contact-save-name" className="text-body-sm text-text-secondary">
            {cleanCopy("Save my name for next time")}
          </label>
        </div>
        <Button type="submit" color="primary" size="md">
          {cleanCopy("Send message")}
        </Button>
      </form>
    </div>
  );
}

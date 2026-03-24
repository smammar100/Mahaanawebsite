"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/base/buttons/button";
import { H3, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";

export function InsightsNewsletterCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      setSubscribed(true);
      setEmail("");
    },
    [email]
  );

  return (
    <section
      className="rounded-2xl bg-gradient-to-r from-[var(--color-success-400)] via-[var(--color-success-300)] to-[var(--color-success-200)] px-6 py-10 text-white sm:px-8 sm:py-12 md:px-10 md:py-14"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-12">
        <div className="max-w-md">
          <H3
            id="newsletter-heading"
            className="text-xl font-semibold text-white sm:text-2xl"
          >
            {cleanCopy("The Weekly Conversation")}
          </H3>
          <TextRegular className="mt-2 text-white/95">
            {cleanCopy(
              "We curate what matters most to you – get weekly market updates, perspectives, and alerts to our events."
            )}
          </TextRegular>
        </div>
        <div className="w-full max-w-md shrink-0">
          {subscribed ? (
            <p
              className="rounded-lg bg-white/20 px-4 py-3 text-sm font-medium text-white"
              role="status"
              aria-live="polite"
            >
              {cleanCopy("Thank you! Your submission has been received.")}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="insights-newsletter-email" className="sr-only">
                {cleanCopy("Email address")}
              </label>
              <input
                id="insights-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={cleanCopy("Enter your email")}
                className="min-w-0 flex-1 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
                autoComplete="email"
              />
              <Button
                type="submit"
                color="primary"
                size="md"
                className="shrink-0 border-0 bg-white font-semibold text-[var(--color-success-400)] hover:bg-white/95"
              >
                {cleanCopy("Subscribe")}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

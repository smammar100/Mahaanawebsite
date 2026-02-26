"use client";

import { cn } from "@/lib/utils";

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/7KpSVR5JjfM";

interface Feature128Props {
  className?: string;
}

const Feature128 = ({ className }: Feature128Props) => {
  return (
    <section className={cn("w-full py-8 md:py-16 lg:py-16", className)}>
      <div className="page-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
                <span className="body-xs font-medium text-brand-700">
                  What&apos;s Mahaana
                </span>
              </div>
              <h3 className="max-w-[50ch] font-heading font-semibold text-foreground">
                Get to know Mahaana
              </h3>
            </div>
            <p className="body-md max-w-[65ch] font-body text-muted-foreground">
              Skip the paperwork and start building your portfolio in minutes.
              Mahaana is designed to make Shariah-compliant investing accessible
              to everyone, right from your phone.
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src={YOUTUBE_EMBED_URL}
                title="Mahaana - Shariah Compliant Investment"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature128 };

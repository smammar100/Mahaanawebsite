"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: "testimonial-1",
    text: "I opened my Mahaana account in under 10 minutes. The Save+ returns are better than any bank FD I've seen. Finally, a way to grow my savings without the usual hassle.",
    name: "Ahmed Raza",
    company: "Karachi",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-2",
    text: "Shariah-compliant and SECP-regulated. Exactly what I was looking for.",
    name: "Fatima Khan",
    company: "Lahore",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-3",
    text: "The tax credit on my retirement contributions is a game-changer. Mahaana made it so simple to start planning for the future.",
    name: "Usman Malik",
    company: "Islamabad",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-4",
    text: "Clean app, clear returns, no hidden fees. Highly recommend.",
    name: "Sana Ali",
    company: "Rawalpindi",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-5",
    text: "Finally an app that lets me invest as little as PKR 5,000. Perfect for someone starting out.",
    name: "Hassan Shah",
    company: "Faisalabad",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-6",
    text: "I've been using Save+ for six months. Liquidity when I need it, solid returns when I don't. Mahaana has made saving effortless.",
    name: "Zainab Ahmed",
    company: "Multan",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-7",
    text: "2FA and bank-grade security give me peace of mind. My money feels safe with Mahaana.",
    name: "Omar Farooq",
    company: "Peshawar",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-8",
    text: "The retirement plan is personalised to my risk level. Great UX and real transparency on where my money goes.",
    name: "Ayesha Siddiqui",
    company: "Karachi",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-9",
    text: "Best investment app in Pakistan. Simple, secure, and actually delivers.",
    name: "Bilal Haider",
    company: "Lahore",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
];

interface Testimonial11Props {
  className?: string;
}

function Testimonial11({ className }: Testimonial11Props) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={cn("w-full py-8 md:py-12 lg:py-16", className)}
    >
      <div className="page-container flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12 lg:gap-20">
          <div className="flex flex-1 flex-col gap-4">
            <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
              <span className="body-xs font-medium text-brand-700">
                Reviews
              </span>
            </div>
            <h3
              id="testimonials-heading"
              className="max-w-[50ch] font-heading font-semibold text-foreground"
            >
              What our investors say
            </h3>
            <p className="body-md max-w-[65ch] font-body text-muted-foreground">
              Thousands of Pakistanis trust Mahaana to grow their savings. Here
              is what they have to say about their experience.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-6 sm:flex-row lg:gap-12">
            <div className="flex flex-col gap-2">
              <img
                src="/images/apple logo.svg"
                alt=""
                className="h-6 w-auto object-contain"
              />
              <div className="flex items-center gap-2">
                <span className="body-sm font-semibold text-foreground">
                  4.75 / 5
                </span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="size-5 fill-brand-500 stroke-brand-500"
                      aria-hidden
                    />
                  ))}
                  <span
                    className="relative block size-5 shrink-0 overflow-hidden"
                    style={{ width: "0.9375rem" }}
                    aria-hidden
                  >
                    <Star className="absolute left-0 top-0 size-5 fill-brand-500 stroke-brand-500" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="inline-block w-full rounded-lg border border-border bg-background p-4 md:p-6"
            >
              <div className="flex flex-col gap-4">
                <p className="body-md font-body text-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-2 md:gap-3">
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className="size-8 shrink-0 rounded-full object-cover md:size-10"
                  />
                  <div>
                    <p className="body-md font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="body-md text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Testimonial11 };

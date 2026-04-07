"use client";

import { Zap } from "@untitledui/icons";

import { Container } from "@/components/layout/Container";
import { H3, TextMedium, TextRegular, TextSmall } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cleanCopy } from "@/lib/copy-utils";
import {
  TESTIMONIAL_AVATAR_IMAGES,
  TESTIMONIAL_COMPANY_LOGOS,
} from "@/lib/testimonial-avatars";
import { cx } from "@/utils/cx";

interface AboutTestimonialsSectionProps {
  className?: string;
}

const testimonialEntries = [
  {
    name: "Mattias Martinsson",
    role: "Co-founder of Tundra Fonder, Sweden",
    content:
      "Through stimulating private savings now, Pakistan can make sure that the state is not overwhelmed 30 years from now when the youth of today retire.",
  },
  {
    name: "David Nangle",
    role: "CEO, VEF",
    content:
      "Mahaana is addressing one of the most important long-term financial issues that exist in Pakistan today. We are proud to back the CEO, Shamoon and his team in this scale venture and I am confident that Mahaana's success will be a positive for both the users of its platform and Pakistan as a whole.",
  },
  {
    name: "Tahir Masaud",
    role: "CEO, IGI Holdings",
    content:
      "IGI is more than a key investor and is a strategic local partner of Mahaana. There are clear synergies between IGI Insurance, IGI Securities and a digital wealth management company like Mahaana, which has a team with a proven track record of fund management in global markets.",
  },
] as const;

const testimonials = testimonialEntries.map((entry, index) => {
  const avatarSlot = index === 0 ? 1 : index === 1 ? 0 : index;
  const companyLogoSlot = index === 0 ? 1 : index === 1 ? 2 : 0;

  return {
    ...entry,
    avatar: TESTIMONIAL_AVATAR_IMAGES[avatarSlot],
    companyLogo: TESTIMONIAL_COMPANY_LOGOS[companyLogoSlot],
  };
});

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: (typeof testimonials)[number];
  className?: string;
}) {
  return (
    <article
      className={cx(
        "flex h-full flex-col justify-between rounded-2xl border border-surface-stroke bg-surface-card p-6 sm:p-8",
        className
      )}
    >
      <blockquote className="mb-6 font-body text-regular leading-7 text-text-tertiary">
        &ldquo;{cleanCopy(testimonial.content)}&rdquo;
      </blockquote>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={`Photo of ${testimonial.name}, ${testimonial.role}`}
            loading="lazy"
            className="size-10 shrink-0 rounded-full border border-surface-stroke object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <TextMedium weight="medium" className="text-text-primary">
              {testimonial.name}
            </TextMedium>
            <TextSmall className="text-text-tertiary">{testimonial.role}</TextSmall>
          </div>
        </div>
        <img
          src={testimonial.companyLogo}
          alt=""
          loading="lazy"
          className="h-7 w-auto max-h-9 max-w-[108px] shrink-0 object-contain object-right"
          aria-hidden
        />
      </div>
    </article>
  );
}

export function AboutTestimonialsSection({ className }: AboutTestimonialsSectionProps) {
  const { ref, isVisible } = useInView(0.15);
  const featured = testimonials[0];

  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up bg-surface-bg section-y",
        isVisible && "visible",
        className
      )}
      aria-labelledby="about-testimonials-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              <Zap className="size-5 shrink-0 fill-primary-200 text-primary-200" aria-hidden />
              <p className="text-label text-system-brand">
                {cleanCopy("Rated 4.5 stars by 20K+ Pakistanis")}
              </p>
            </div>
            <H3 id="about-testimonials-heading" className="max-w-3xl text-text-primary">
              Meet our happy investors
            </H3>
            <TextRegular className="max-w-2xl text-text-tertiary">
              Join a growing community of smart savers, professionals, and everyday Pakistanis
              who trust Mahaana to secure their financial future.
            </TextRegular>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-6">
              <img
                src="/images/invest/partners-igi-vitality.png"
                alt="Mahaana strategic partners"
                loading="lazy"
                className="h-64 w-full rounded-2xl border border-surface-stroke bg-surface-card object-cover sm:h-80 lg:h-full"
              />
              <article className="flex h-full flex-col justify-between rounded-2xl border border-surface-stroke bg-surface-card p-6 sm:p-8 lg:col-span-2">
                <blockquote className="font-body text-large leading-relaxed text-text-primary sm:text-xl lg:text-2xl">
                  &ldquo;{cleanCopy(featured.content)}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={featured.avatar}
                      alt={`Photo of ${featured.name}, ${featured.role}`}
                      loading="lazy"
                      className="size-12 shrink-0 rounded-full border border-surface-stroke object-cover"
                    />
                    <div className="flex min-w-0 flex-col">
                      <TextMedium weight="medium" className="text-text-primary">
                        {featured.name}
                      </TextMedium>
                      <TextSmall className="text-text-tertiary">{featured.role}</TextSmall>
                    </div>
                  </div>
                  <img
                    src={featured.companyLogo}
                    alt=""
                    loading="lazy"
                    className="h-8 w-auto max-h-10 max-w-[120px] shrink-0 object-contain object-right"
                    aria-hidden
                  />
                </div>
              </article>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

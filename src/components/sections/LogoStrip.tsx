import { Container } from "@/components/layout/Container";

const LOGOS = [
  { src: "/images/invest/VEF%20logo.webp", alt: "VEF" },
  { src: "/images/invest/y-combinator-seeklogo.webp", alt: "Y Combinator" },
  { src: "/images/invest/Sparklabs%20logo.webp", alt: "SparkLabs" },
  { src: "/images/invest/IGI%20Life%20Logo.webp", alt: "IGI Life and Vitality" },
];

export function LogoStrip() {
  return (
    <section
      className="flex min-h-[120px] flex-col items-center justify-center bg-surface-bg py-8 sm:py-0"
      aria-label="Backed by leading investors and partners"
    >
      <Container className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full max-w-full grid-cols-2 place-items-center gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-0">
          {LOGOS.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex max-h-16 min-h-[48px] w-full max-w-[180px] items-center justify-center py-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={64}
                className="h-8 w-auto max-h-16 max-w-[180px] object-contain object-center opacity-90 sm:h-10 lg:h-12"
                loading="lazy"
                fetchPriority="low"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

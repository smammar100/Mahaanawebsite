import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const LOGOS = [
  { src: "/images/invest/VEF%20logo.webp", alt: "VEF" },
  { src: "/images/invest/y-combinator-seeklogo.webp", alt: "Y Combinator" },
  { src: "/images/invest/Sparklabs%20logo.webp", alt: "SparkLabs" },
  { src: "/images/invest/IGI%20Life%20Logo.webp", alt: "IGI Life and Vitality" },
];

type LogoStripProps = {
  /** When true, no top padding — use when the section above already ends with the same gap (e.g. About hero). */
  compactTop?: boolean;
};

export function LogoStrip({ compactTop = false }: LogoStripProps) {
  return (
    <section
      className={cn(
        "flex min-h-[120px] flex-col items-center justify-center bg-surface-bg sm:min-h-[100px]",
        compactTop
          ? "pt-0 pb-8 sm:pb-10 md:pb-12"
          : "py-8 sm:py-10 md:py-12"
      )}
      aria-label="Investor and partner logos"
    >
      <Container className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full max-w-full grid-cols-2 place-items-center gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-0">
          {LOGOS.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex max-h-16 min-h-[48px] w-full max-w-[180px] items-center justify-center py-1"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={64}
                sizes="(max-width: 800px) 50vw, 25vw"
                className="h-8 w-auto max-h-16 max-w-[180px] object-contain object-center opacity-90 sm:h-10 lg:h-12"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const PARTNER_LOGOS = [
  { src: "/images/YC logo.png", alt: "YC" },
  { src: "/images/Spark labs logo.png", alt: "Spark Labs" },
  { src: "/images/IGI logo.png", alt: "IGI" },
  { src: "/images/VEF logo.png", alt: "VEF" },
] as const;

export default function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="w-full h-fit flex items-center border-b border-border bg-background overflow-x-auto py-8 md:py-12 lg:py-16"
    >
      <div className="page-container min-w-0 flex flex-row items-center justify-center">
        <div
          className="grid w-full max-w-full min-w-0 grid-cols-2 grid-rows-1 items-center justify-start gap-4 sm:grid-cols-5 sm:gap-x-6 sm:gap-y-0 md:gap-x-8 lg:gap-x-10"
          role="list"
          aria-label="Partner logos"
        >
          <p
            id="trusted-by-heading"
            className="body-lg shrink-0 text-foreground"
          >
            Trusted by the best
          </p>
          {PARTNER_LOGOS.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-10 w-auto max-w-40 object-contain opacity-90 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              width={150}
              height={40}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

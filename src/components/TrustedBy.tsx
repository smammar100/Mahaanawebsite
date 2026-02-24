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
      className="w-full h-fit flex items-center border-b border-zinc-200 bg-background dark:border-zinc-800 overflow-x-auto pt-6 pb-6"
    >
      <div className="page-container min-w-0 flex flex-row items-center justify-center">
        <div
          className="grid w-full max-w-full min-w-0 grid-cols-5 grid-rows-1 items-center justify-start gap-x-6 gap-y-0 sm:gap-x-8 md:gap-x-10"
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
              className="h-10 w-auto max-w-[10rem] object-contain opacity-90 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              width={150}
              height={40}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

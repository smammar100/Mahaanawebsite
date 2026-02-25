const stepsData = [
  {
    id: 1,
    title: "Sign up & answer a few questions",
    description:
      "Complete your profile in under 10 minutes and start investing with us.",
    imageSrc: "/images/Step 1.png",
    imageAlt: "Sign up and answer questions",
  },
  {
    id: 2,
    title: "Fund your account",
    description:
      "Open your Mahaana account with as little as PKR 5,000.",
    imageSrc: "/images/Step 2.png",
    imageAlt: "Fund your Mahaana account",
  },
  {
    id: 3,
    title: "Voilà! Watch your savings grow",
    description:
      "Our investors earned 20.48% per annum in May 2024*. Track your growth in the app.",
    imageSrc: "/images/Step 3.png",
    imageAlt: "Track your savings growth",
  },
] as const;

export default function TestimonialSection() {
  return (
    <section
      aria-labelledby="open-account-heading"
      className="w-full bg-background py-8 md:py-12 lg:py-16"
    >
      <div className="page-container flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
              <span className="body-xs font-medium text-brand-700">
                Investment account shouldn&apos;t take days to open
              </span>
            </div>
            <h2
              id="open-account-heading"
              className="font-heading font-semibold text-foreground"
            >
              Open your Mahaana account in just less than 10 mins
            </h2>
          </div>
          <a
            className="mx-auto w-fit rounded-xl border-2 border-transparent bg-brand-500 px-6 py-4 text-white transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            href="#"
          >
            <span className="body-lg font-semibold">
              Open your Mahaana account
            </span>
          </a>
        </div>

        <div className="flex w-full flex-nowrap flex-col items-stretch justify-start gap-8 text-center">
          <div className="grid w-full grid-cols-1 place-items-center gap-6 md:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={`body-sm rounded-md px-4 py-1.5 text-center ${
                  step === 3
                    ? "bg-muted font-medium text-foreground"
                    : "border border-border text-foreground"
                }`}
              >
                Step {step}
              </span>
            ))}
          </div>
          <div className="relative w-full">
            <div
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border"
              aria-hidden
            />
            <div className="relative z-10 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex justify-center">
                <div className="size-3 shrink-0 rounded-full border border-border bg-background" />
              </div>
              <div className="flex justify-center">
                <div className="size-3 shrink-0 rounded-full border border-border bg-background" />
              </div>
              <div className="flex justify-center">
                <div className="size-3 shrink-0 rounded-full bg-border" />
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {stepsData.map((step) => (
              <div
                key={step.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-4"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="body-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="body-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <img
                  alt={step.imageAlt}
                  className="aspect-video w-full rounded-xl object-cover"
                  src={step.imageSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

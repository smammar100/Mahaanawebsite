import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "save-plus",
    title: "Save+",
    description:
      "Move forward together with a platform where your savings are invested with clarity and care. Build wealth with Shariah-compliant returns.",
    image: "/images/Save+.png",
    href: "/services#save-plus",
  },
  {
    id: "retirement",
    title: "Retirement",
    description:
      "Build a foundation for your goals. Our retirement solutions help you save with purpose and grow your capital with integrity.",
    image: "/images/retirement.png",
    href: "/services#retirement",
  },
] as const;

export default function ProductSection() {
  return (
    <section
      aria-labelledby="products-heading"
      className="w-full bg-background py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="page-container">
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2
            id="products-heading"
            className="font-heading mb-4 text-foreground"
          >
            Products that fit your life
          </h2>
          <p className="body-lg max-w-[75ch] text-muted-foreground">
            Whether you&apos;re saving for tomorrow or planning for retirement,
            Mahaana offers Shariah-compliant options designed for every stage of
            your journey.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-md transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt=""
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="h4 font-heading mb-3 text-foreground">
                  {product.title}
                </h3>
                <p className="body-md mb-4 flex-1 text-muted-foreground">
                  {product.description}
                </p>
                <span className="body-md inline-flex items-center gap-2 font-medium text-brand-600 group-hover:underline">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

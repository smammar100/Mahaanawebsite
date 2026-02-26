import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

interface DataItem {
  id: string;
  title: string;
  summary: string;
  href: string;
  image: string;
  date: string;
  tag: string;
}

const DATA: DataItem[] = [
  {
    id: "item-1",
    title: "Discover the essential features of our notes app",
    summary:
      "Advanced AI algorithms that understand and process human language, enabling seamless communication between users and machines through text and speech.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    date: "July 10, 2024",
    tag: "AI",
  },
  {
    id: "item-2",
    title: "Computer Vision Technology, a game changer",
    summary:
      "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    date: "July 11, 2024",
    tag: "Development",
  },
  {
    id: "item-3",
    title: "Machine Learning Automation, the future is now",
    summary:
      "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    date: "July 12, 2024",
    tag: "Open Source",
  },
  {
    id: "item-4",
    title: "Predictive Analytics, the key to success",
    summary:
      "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    date: "July 13, 2024",
    tag: "Feature",
  },
  {
    id: "item-5",
    title: "Neural Network Architecture, the future is now",
    summary:
      "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
    href: "https://www.shadcnblocks.com",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
    date: "July 14, 2024",
    tag: "Guide",
  },
];

interface Blog21Props {
  className?: string;
}

function Blog21({ className }: Blog21Props) {
  return (
    <section
      aria-labelledby="blog-heading"
      className={cn("w-full py-8 md:py-12 lg:py-16", className)}
    >
      <div className="page-container flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12 lg:gap-20">
          <div className="flex flex-1 flex-col gap-4">
            <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
              <span className="body-xs font-medium text-brand-700">News and insights</span>
            </div>
            <h3
              id="blog-heading"
              className="max-w-[50ch] font-heading font-semibold text-foreground"
            >
              Latest Blog Posts
            </h3>
            <p className="body-md max-w-[65ch] font-body text-muted-foreground">
              Stay updated with our latest articles and insights
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-primary-cta shrink-0"
          >
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {DATA.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md",
                index >= 2 && "hidden md:block",
                index >= 3 && "md:hidden lg:block"
              )}
            >
              <Link href={item.href} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <span
                    className="absolute right-4 top-4 z-10 rounded-2xl bg-brand-50 px-2 py-0.5 body-xs font-medium text-brand-700"
                    aria-hidden
                  >
                    {item.tag}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h4 className="body-lg mb-2 line-clamp-2 font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="body-md line-clamp-2 text-muted-foreground">
                      {item.summary}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 body-xs text-muted-foreground">
                      <Calendar className="size-3.5 shrink-0" aria-hidden />
                      {item.date}
                    </span>
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-border transition-colors group-hover:border-brand-500 group-hover:bg-brand-50">
                      <ArrowRight className="size-4 text-foreground" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Blog21 };

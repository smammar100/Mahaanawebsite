import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <section className="mb-16">
        <h1 className="mb-4">Welcome to Mahaana</h1>
        <p className="body-lg mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Placeholder tagline. Design and engineering excellence for your next project.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded bg-foreground px-5 py-2.5 body-md font-semibold text-background transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Get in touch
        </Link>
      </section>
      <section aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="mb-6">
          Highlights
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          <li>
            <h3 className="h4 mb-2">Quality</h3>
            <p className="body-md text-zinc-600 dark:text-zinc-400">
              We deliver high-quality design and engineering solutions.
            </p>
          </li>
          <li>
            <h3 className="h4 mb-2">Expertise</h3>
            <p className="body-md text-zinc-600 dark:text-zinc-400">
              Our team brings deep expertise across disciplines.
            </p>
          </li>
        </ul>
        <Link
          href="/services"
          className="body-md mt-6 inline-block font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          View our services →
        </Link>
      </section>
    </div>
  );
}

"use client";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="mb-8">Contact Us</h1>
      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="sr-only">
          Contact form
        </h2>
        <form
          className="max-w-md space-y-4"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <div>
            <label htmlFor="contact-email" className="body-md mb-1 block font-medium">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              aria-required="true"
              className="w-full rounded border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-2 body-md text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="body-md mb-1 block font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              aria-required="true"
              className="w-full rounded border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-2 body-md text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-foreground px-4 py-2 body-md font-semibold text-background transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Send message
          </button>
        </form>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  const services = [
    { title: "Service One", description: "Placeholder description for the first service offering." },
    { title: "Service Two", description: "Placeholder description for the second service offering." },
    { title: "Service Three", description: "Placeholder description for the third service offering." },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 xl:px-16 xl:py-16">
      <h1 className="mb-8">Our Services</h1>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-label="Services list">
        {services.map((service, index) => (
          <article key={index} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="h4 mb-3">{service.title}</h2>
            <p className="body-md text-zinc-600 dark:text-zinc-400">{service.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

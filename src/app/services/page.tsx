export default function ServicesPage() {
  const services = [
    { title: "Service One", description: "Placeholder description for the first service offering." },
    { title: "Service Two", description: "Placeholder description for the second service offering." },
    { title: "Service Three", description: "Placeholder description for the third service offering." },
  ];

  return (
    <div className="page-container py-6 sm:py-8 md:py-10 lg:py-12">
      <h1 className="mb-8">Our Services</h1>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-label="Services list">
        {services.map((service, index) => (
          <article key={index} className="rounded-lg border border-border p-6">
            <h3 className="h4 mb-3">{service.title}</h3>
            <p className="body-md text-muted-foreground">{service.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

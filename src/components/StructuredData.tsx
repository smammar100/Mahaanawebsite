export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Mahaana",
    description:
      "Pakistan's leading SECP-licensed, Shariah-compliant investment platform.",
    url: "https://mahaana.netlify.app/",
    logo: "https://mahaana.netlify.app/images/invest/Logo.svg",
    areaServed: { "@type": "Country", name: "Pakistan" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "20000",
      bestRating: "5",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import { SITE_URL } from "@/lib/metadata";

export default function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Mahaana",
    legalName: "Mahaana Wealth Limited",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/invest/Logo.svg`,
    },
    description:
      "Pakistan's first licensed digital only asset management company offering SECP-regulated, Shariah compliant investment products.",
    foundingDate: "2021",
    areaServed: { "@type": "Country", name: "Pakistan" },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressLocality: "Karachi",
    },
    sameAs: [
      "https://www.facebook.com/mahaanawealth",
      "https://www.instagram.com/mahaanawealth",
      "https://www.linkedin.com/company/mahaana/",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "20000",
      bestRating: "5",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Mahaana",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/investor-education?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const financialService = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#financialservice`,
    name: "Mahaana",
    description:
      "SECP-licensed, Shariah compliant digital investment platform offering mutual funds, ETFs, and retirement products in Pakistan.",
    url: SITE_URL,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Pakistan" },
    serviceType: [
      "Digital Wealth Management",
      "Mutual Funds",
      "ETF",
      "Retirement Planning",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Investment Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "Save+",
            description:
              "Low risk Shariah compliant money market fund with daily returns",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "Retirement",
            description:
              "Automated Shariah compliant retirement planning with 20% tax credit",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "MICF",
            description:
              "Mahaana Islamic Cash Fund — low risk money market mutual fund",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "MIIETF",
            description:
              "Mahaana Islamic Index ETF — Pakistan's first broader index Islamic ETF",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "MIIRF",
            description: "Mahaana Islamic Income & Return Fund",
          },
        },
      ],
    },
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Mahaana",
    operatingSystem: "Android, iOS",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "20000",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
      />
    </>
  );
}

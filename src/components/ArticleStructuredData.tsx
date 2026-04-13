import { SITE_URL } from "@/lib/metadata";

interface Props {
  title: string;
  description: string;
  slug: string;
  author?: string | null;
  publishedAt?: string | null;
  /** Sanity `_updatedAt` — improves Article rich result eligibility when present */
  modifiedAt?: string | null;
  imageUrl?: string | null;
  /** Drives schema.org @type: News uses NewsArticle; others use Article */
  category?: "Video" | "Article" | "News" | null;
}

export function ArticleStructuredData({
  title,
  description,
  slug,
  author,
  publishedAt,
  modifiedAt,
  imageUrl,
  category,
}: Props) {
  const pageUrl = `${SITE_URL}/investor-education/${slug}`;
  const schemaType =
    category === "News" ? "NewsArticle" : "Article";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    description,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Mahaana",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/invest/Logo.svg`,
      },
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  if (author) {
    jsonLd.author = { "@type": "Person", name: author };
  }
  if (publishedAt) {
    jsonLd.datePublished = publishedAt;
  }
  if (modifiedAt) {
    jsonLd.dateModified = modifiedAt;
  } else if (publishedAt) {
    jsonLd.dateModified = publishedAt;
  }
  if (imageUrl) {
    jsonLd.image = [imageUrl];
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

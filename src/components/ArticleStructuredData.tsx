import { SITE_URL } from "@/lib/metadata";

interface Props {
  title: string;
  description: string;
  slug: string;
  author?: string | null;
  publishedAt?: string | null;
  imageUrl?: string | null;
}

export function ArticleStructuredData({
  title,
  description,
  slug,
  author,
  publishedAt,
  imageUrl,
}: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/investor-education/${slug}`,
    ...(author && { author: { "@type": "Person", name: author } }),
    ...(publishedAt && { datePublished: publishedAt }),
    ...(imageUrl && { image: imageUrl }),
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

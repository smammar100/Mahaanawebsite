/** Investor Education: all three types, latest added first (_createdAt). List view (no bodyHtml). */
export const investorEducationsQuery = `
  *[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"]] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    publishedAt,
    excerpt,
    thumbnail,
    "thumbnailUrl": thumbnail.asset->url,
    externalLink,
    author,
    readingTime,
    categoryLabel
  }
`;

/** Investor Education by document type (for tab filter). Latest added first. */
export const investorEducationsByTypeQuery = `
  *[_type == $type] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    publishedAt,
    excerpt,
    thumbnail,
    "thumbnailUrl": thumbnail.asset->url,
    externalLink,
    author,
    readingTime,
    categoryLabel
  }
`;

/** Single Investor Education by slug (any of the three types). */
export const investorEducationBySlugQuery = `
  *[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"] && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    publishedAt,
    excerpt,
    thumbnail,
    "thumbnailUrl": thumbnail.asset->url,
    externalLink,
    author,
    readingTime,
    categoryLabel,
    bodyHtml[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          "slug": reference->slug.current
        }
      }
    }
  }
`;

/** All Investor Education slugs for generateStaticParams. */
export const investorEducationSlugsQuery = `
  *[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"] && defined(slug.current)].slug.current
`;

/** Investor Education slug + _updatedAt for sitemap lastmod. */
export const investorEducationSitemapQuery = `
  *[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"] && defined(slug.current)] {
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
`;

/** Latest 3 Investor Education items (most recent first, any type). */
export const latestInvestorEducationsQuery = `
  *[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"]] | order(publishedAt desc, _updatedAt desc)[0...3] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    thumbnail,
    "thumbnailUrl": thumbnail.asset->url,
    readingTime,
    author,
    publishedAt,
    categoryLabel
  }
`;

/** Fund documents by fund (micf | miietf | miirf), ordered by publishDate desc. */
export const fundDocumentsQuery = `
  *[_type == "fundDocument" && fund == $fund] | order(publishDate desc) {
    _id,
    title,
    "fileUrl": file.asset->url,
    fund,
    category,
    publishDate
  }
`;

/** Help Center FAQs: all faq documents, ordered by category then created. */
export const faqsQuery = `
  *[_type == "faq"] | order(category asc, _createdAt asc) {
    _id,
    question,
    answer,
    category
  }
`;

/** Legal documents: all legalDocument items with title and PDF URL, ordered by creation. */
export const legalDocumentsQuery = `
  *[_type == "legalDocument"] | order(_createdAt asc) {
    _id,
    title,
    "fileUrl": pdf.asset->url
  }
`;

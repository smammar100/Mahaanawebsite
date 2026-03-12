/** Investor Education: all three types, most recent first. List view (no bodyHtml). */
export const investorEducationsQuery = `
  *[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"]] | order(publishedAt desc, _updatedAt desc) {
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
    readingTime
  }
`;

/** Investor Education by document type (for tab filter). */
export const investorEducationsByTypeQuery = `
  *[_type == $type] | order(publishedAt desc, _updatedAt desc) {
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
    readingTime
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
    bodyHtml
  }
`;

/** All Investor Education slugs for generateStaticParams. */
export const investorEducationSlugsQuery = `
  *[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"] && defined(slug.current)].slug.current
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
    publishedAt
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

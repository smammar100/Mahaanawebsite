/** Investor Education: all docs ordered by priority desc (higher first). */
export const investorEducationsQuery = `
  *[_type == "investorEducation"] | order(priority desc) {
    _id,
    title,
    slug,
    priority,
    category,
    thumbnailImage,
    thumbnailImageUrl,
    tldr,
    cta,
    link,
    blogBodyText,
    readingTime,
    authorName
  }
`;

/** Investor Education by category (Video | Article | News). */
export const investorEducationsByCategoryQuery = `
  *[_type == "investorEducation" && category == $category] | order(priority desc) {
    _id,
    title,
    slug,
    priority,
    category,
    thumbnailImage,
    thumbnailImageUrl,
    tldr,
    cta,
    link,
    readingTime,
    authorName
  }
`;

/** Single Investor Education by slug. */
export const investorEducationBySlugQuery = `
  *[_type == "investorEducation" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    priority,
    category,
    thumbnailImage,
    thumbnailImageUrl,
    tldr,
    cta,
    link,
    blogBodyText,
    readingTime,
    authorName
  }
`;

/** All Investor Education slugs for generateStaticParams. */
export const investorEducationSlugsQuery = `
  *[_type == "investorEducation" && defined(slug.current)].slug.current
`;

/** Latest 3 Investor Education items for home blog section. */
export const latestInvestorEducationsQuery = `
  *[_type == "investorEducation"] | order(priority desc)[0...3] {
    _id,
    title,
    slug,
    category,
    thumbnailImage,
    thumbnailImageUrl,
    tldr,
    readingTime,
    authorName
  }
`;

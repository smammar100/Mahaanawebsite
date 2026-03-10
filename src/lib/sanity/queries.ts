/** Posts (blogs, news, videos) — filter by type in params */
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    excerpt,
    mainImage,
    body,
    videoUrl,
    author->{ name, image },
    readTime,
    publishedAt,
    categories[]->{ _id, title }
  }
`;

/** Posts by type (blog | news | video) */
export const postsByTypeQuery = `
  *[_type == "post" && type == $type] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    excerpt,
    mainImage,
    body,
    videoUrl,
    author->{ name, image },
    readTime,
    publishedAt
  }
`;

/** Single post by slug */
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    excerpt,
    mainImage,
    body,
    videoUrl,
    author->{ name, image, role },
    readTime,
    publishedAt,
    categories[]->{ _id, title }
  }
`;

/** All post slugs for generateStaticParams */
export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)].slug.current
`;

/** Home page: latest 3 blog posts */
export const latestBlogPostsQuery = `
  *[_type == "post" && type == "blog"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{ name, image },
    readTime,
    publishedAt
  }
`;

/** Reviews */
export const reviewsQuery = `
  *[_type == "review" && published == true] | order(order asc) {
    _id,
    quote,
    authorName,
    authorImage,
    rating,
    source,
    order
  }
`;

/** FAQs by product (micf | miietf | miirf | save-plus | retirement) */
export const faqByProductQuery = `
  *[_type == "faqItem" && product == $product] | order(order asc) {
    _id,
    question,
    answer,
    product,
    order
  }
`;

/** Fund documents by fund and optional category */
export const fundDocumentsQuery = `
  *[_type == "fundDocument" && fund == $fund] | order(order asc) {
    _id,
    title,
    "fileUrl": file.asset->url,
    category,
    fund,
    order
  }
`;

/** Fund documents by fund and category */
export const fundDocumentsByCategoryQuery = `
  *[_type == "fundDocument" && fund == $fund && category == $category] | order(order asc) {
    _id,
    title,
    "fileUrl": file.asset->url,
    category,
    fund,
    order
  }
`;

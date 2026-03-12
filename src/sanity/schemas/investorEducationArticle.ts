import { defineField, defineType } from "sanity";

export const investorEducationArticleType = defineType({
  name: "investorEducationArticle",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary or TL;DR of the content",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Cover image for the content",
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Optional link to source (e.g. read more)",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of the author",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "string",
      description: "Estimated reading time (e.g. 5 Min Read)",
    }),
    defineField({
      name: "bodyHtml",
      title: "Body Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text content (Portable Text)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      publishedAt: "publishedAt",
      thumbnail: "thumbnail",
    },
    prepare({ title, author, publishedAt, thumbnail }) {
      const sub = [author, publishedAt ? new Date(publishedAt).toLocaleDateString() : null]
        .filter(Boolean)
        .join(" · ");
      return {
        title: title ?? "Untitled",
        subtitle: sub || undefined,
        media: thumbnail,
      };
    },
  },
});

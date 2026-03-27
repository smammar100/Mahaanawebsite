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
      name: "categoryLabel",
      title: "Category label",
      type: "string",
      description:
        "Display category for website tabs and filtering. Leave empty to use the default for this content type.",
      options: {
        list: [
          { title: "Investing", value: "Investing" },
          { title: "Personal Finance", value: "Personal Finance" },
          { title: "Market Views", value: "Market Views" },
          { title: "Solutions", value: "Solutions" },
          { title: "Private Wealth", value: "Private Wealth" },
        ],
        layout: "dropdown",
      },
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
      type: "blockContent",
      description:
        "Rich text: sections, grids, media, CTAs, accordions. For block quote or headings, use the block type control on the far left of the toolbar (it shows “Normal” when the current block is a paragraph)—open it and choose Blockquote or Pullquote. If that menu does not open, exit fullscreen/expanded editor and try again.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      publishedAt: "publishedAt",
      thumbnail: "thumbnail",
      categoryLabel: "categoryLabel",
    },
    prepare({ title, author, publishedAt, thumbnail, categoryLabel }) {
      const sub = [
        categoryLabel,
        author,
        publishedAt ? new Date(publishedAt).toLocaleDateString() : null,
      ]
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

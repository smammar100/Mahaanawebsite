import { defineField, defineType } from "sanity";

export const investorEducationNewsType = defineType({
  name: "investorEducationNews",
  title: "News",
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
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Cover image for the news",
    }),
    defineField({
      name: "externalLink",
      title: "URL link",
      type: "url",
      description: "Link to news source or full article",
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
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      thumbnail: "thumbnail",
      categoryLabel: "categoryLabel",
    },
    prepare({ title, publishedAt, thumbnail, categoryLabel }) {
      const sub = [categoryLabel, publishedAt ? new Date(publishedAt).toLocaleDateString() : null]
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

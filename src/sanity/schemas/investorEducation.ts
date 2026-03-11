import { defineField, defineType } from "sanity";

export const investorEducationType = defineType({
  name: "investorEducation",
  title: "Investor Education",
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
      name: "priority",
      title: "Priority",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { value: "Video", title: "Video" },
          { value: "Article", title: "Article" },
          { value: "News", title: "News" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "thumbnailImageUrl",
      title: "Thumbnail Image URL",
      type: "string",
      description: "Fallback URL when no image asset is uploaded (e.g. from CSV import).",
      hidden: ({ parent }) => !!parent?.thumbnailImage,
    }),
    defineField({
      name: "tldr",
      title: "TLDR",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blogBodyText",
      title: "Blog Body Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "string",
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "thumbnailImage",
    },
    prepare({ title, category, media }) {
      return {
        title: title ?? "Untitled",
        subtitle: category ?? undefined,
        media,
      };
    },
  },
});

import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      type: "number",
      validation: (rule) => rule.min(1).max(5).integer(),
      description: "1–5",
    }),
    defineField({
      name: "source",
      type: "string",
      description: "e.g. Google Play",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Manual sort order",
    }),
    defineField({
      name: "published",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "quote", media: "authorImage" },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Review",
        subtitle: subtitle ? String(subtitle).slice(0, 50) + "…" : undefined,
        media,
      };
    },
  },
});

import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatarUrl",
      title: "Avatar URL",
      type: "url",
      validation: (rule) => rule.required().uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "reviewDate",
      title: "Review date",
      type: "datetime",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "Google Play",
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "quote",
      rating: "rating",
    },
    prepare({ title, subtitle, rating }) {
      const excerpt =
        typeof subtitle === "string"
          ? subtitle.length > 80
            ? `${subtitle.slice(0, 80)}…`
            : subtitle
          : undefined;
      return {
        title: title ?? "Untitled",
        subtitle: [rating != null ? `${rating}/5` : null, excerpt].filter(Boolean).join(" — "),
      };
    },
  },
});

import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "role",
      type: "string",
      description: "Optional role or title",
    }),
    defineField({
      name: "bio",
      type: "text",
      description: "Short bio",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
    prepare({ title, media }) {
      return { title: title ?? "Author", media };
    },
  },
});

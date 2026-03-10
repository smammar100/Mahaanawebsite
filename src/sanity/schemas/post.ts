import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { value: "blog", title: "Blog" },
          { value: "news", title: "News" },
          { value: "video", title: "Video" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ parent }) => parent?.type === "video",
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      description: "For type: video — embed URL",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "readTime",
      type: "string",
      description: "e.g. 5 Min Read",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
  ],
  preview: {
    select: { title: "title", type: "type", media: "mainImage" },
    prepare({ title, type, media }) {
      return {
        title: title ?? "Untitled",
        subtitle: type,
        media,
      };
    },
  },
});

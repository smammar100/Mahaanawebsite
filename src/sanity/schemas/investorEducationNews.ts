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
    },
    prepare({ title, publishedAt, thumbnail }) {
      const sub = publishedAt ? new Date(publishedAt).toLocaleDateString() : undefined;
      return {
        title: title ?? "Untitled",
        subtitle: sub,
        media: thumbnail,
      };
    },
  },
});

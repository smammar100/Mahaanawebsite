import { defineField, defineType } from "sanity";

export const investorEducationVideoPodcastType = defineType({
  name: "investorEducationVideoPodcast",
  title: "Videos & Podcasts",
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
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Cover image",
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Link to video or podcast (YouTube, Vimeo, etc.)",
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

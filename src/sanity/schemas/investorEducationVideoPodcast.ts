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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary or description",
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
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of the author or host (optional)",
    }),
    defineField({
      name: "bodyHtml",
      title: "Body Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Additional rich text (optional)",
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

import { defineField, defineType } from "sanity";

export const videoPodcastType = defineType({
  name: "videoPodcast",
  title: "Video & Podcast",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoLink",
      title: "Video link",
      type: "url",
      description: "YouTube or other video URL",
    }),
    defineField({
      name: "playlistCategory",
      title: "Playlist category",
      type: "reference",
      to: [{ type: "playlistCategory" }],
    }),
    defineField({
      name: "sitemapIndexing",
      title: "Sitemap Indexing",
      type: "boolean",
      initialValue: true,
      description:
        "Controls whether search engines can return this page in search results.",
    }),
    defineField({
      name: "externalId",
      title: "Legacy Item ID",
      type: "string",
      description: "Legacy Webflow Item ID (for migration).",
    }),
  ],
  preview: {
    select: {
      name: "name",
      playlistCategory: "playlistCategory.title",
      media: "thumbnail",
    },
    prepare({ name, playlistCategory, media }) {
      return {
        title: name ?? "Untitled",
        subtitle: playlistCategory ?? undefined,
        media,
      };
    },
  },
});

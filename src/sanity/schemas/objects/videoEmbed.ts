import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      title: "Video URL",
      type: "url",
      validation: (rule) => rule.required(),
      description:
        "Paste a YouTube, Vimeo, or direct video file URL.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Optional accessible title used for assistive technology and embeds.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption displayed below the video.",
    }),
    defineField({
      name: "startTime",
      title: "Start time (seconds)",
      type: "number",
      validation: (rule) => rule.min(0),
      description:
        "Optional start offset in seconds. Leave empty to start from the beginning.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
    },
    prepare({ title, url }) {
      const subtitle =
        typeof url === "string" && url.length > 60
          ? `${url.slice(0, 57)}...`
          : url;
      return {
        title: title || "Video",
        subtitle,
        media: PlayIcon,
      };
    },
  },
});

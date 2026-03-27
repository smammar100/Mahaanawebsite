import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const inlineImage = defineType({
  name: "inlineImage",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required().max(180),
      description: "Describe the image for accessibility and search indexing.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption shown with the image.",
    }),
    defineField({
      name: "display",
      title: "Display",
      type: "string",
      options: {
        list: [
          { title: "Inline", value: "inline" },
          { title: "Wide", value: "wide" },
          { title: "Full", value: "full" },
        ],
      },
      initialValue: "inline",
      validation: (rule) => rule.required(),
      description:
        "Size hint only. Select content intent while frontend controls exact layout behavior.",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "alt",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Image",
        subtitle: subtitle || undefined,
        media,
      };
    },
  },
});

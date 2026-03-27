import { ComponentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const iconFeatureCard = defineType({
  name: "iconFeatureCard",
  title: "Icon feature card",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 5,
      description: "Short paragraph below the heading (body normal size on the site).",
    }),
    defineField({
      name: "items",
      title: "Feature lines",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "iconFeatureItem",
          title: "Line",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (rule) => rule.required().max(400),
            }),
            defineField({
              name: "iconImage",
              title: "Custom icon",
              type: "image",
              options: { hotspot: true },
              description:
                "Optional. Upload a square PNG or SVG. If empty, the icon preset below is used.",
            }),
            defineField({
              name: "iconPreset",
              title: "Icon preset (fallback)",
              type: "string",
              initialValue: "checkCircle",
              options: {
                list: [
                  { title: "Check circle", value: "checkCircle" },
                  { title: "Shield check", value: "shieldTick" },
                  { title: "Bell", value: "bell" },
                  { title: "Mail", value: "mail" },
                  { title: "Zap", value: "zap" },
                ],
                layout: "dropdown",
              },
            }),
          ],
          preview: {
            select: { title: "text", media: "iconImage" },
            prepare({ title, media }) {
              return {
                title: title?.slice(0, 80) || "Line",
                media,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: "backgroundPreset",
      title: "Card background",
      type: "string",
      initialValue: "darkNavy",
      options: {
        list: [
          { title: "Dark navy", value: "darkNavy" },
          { title: "Surface (light gray)", value: "surface" },
          { title: "Brand tint (light purple)", value: "brandTint" },
          { title: "Custom hex color", value: "custom" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "customBackgroundColor",
      title: "Custom background (hex)",
      type: "string",
      placeholder: "#0a1120",
      description: "Used when “Custom hex color” is selected.",
      hidden: ({ parent }) => parent?.backgroundPreset !== "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { backgroundPreset?: string };
          if (parent?.backgroundPreset !== "custom") return true;
          if (!value?.trim()) return "Enter a hex color";
          if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim())) return true;
          return "Use a valid hex color, e.g. #0a1120";
        }),
    }),
    defineField({
      name: "textColor",
      title: "Text on card",
      type: "string",
      initialValue: "light",
      description:
        "Light text for dark backgrounds; Dark text for light cards (surface / brand tint).",
      options: {
        list: [
          { title: "Light (white / soft white)", value: "light" },
          { title: "Dark (primary body colors)", value: "dark" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare({ title, items }) {
      const n = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Icon feature card",
        subtitle: `${n} line${n === 1 ? "" : "s"}`,
      };
    },
  },
});

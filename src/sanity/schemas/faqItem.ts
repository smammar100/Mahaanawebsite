import { defineField, defineType } from "sanity";

const PRODUCT_OPTIONS = [
  { value: "micf", title: "MICF" },
  { value: "miietf", title: "MIIETF" },
  { value: "miirf", title: "MIIRF" },
  { value: "save-plus", title: "Save+" },
  { value: "retirement", title: "Retirement" },
] as const;

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "product",
      type: "string",
      options: {
        list: [...PRODUCT_OPTIONS],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Display order",
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "product" },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "FAQ",
        subtitle,
      };
    },
  },
});

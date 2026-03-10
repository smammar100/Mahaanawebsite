import { defineField, defineType } from "sanity";

const CATEGORY_OPTIONS = [
  { value: "general", title: "General" },
  { value: "fund-manager-reports", title: "Fund manager reports" },
  { value: "shariah-compliance", title: "Shariah compliance" },
  { value: "financial-statements", title: "Financial statements" },
] as const;

const FUND_OPTIONS = [
  { value: "micf", title: "MICF" },
  { value: "miietf", title: "MIIETF" },
  { value: "miirf", title: "MIIRF" },
] as const;

export const fundDocumentType = defineType({
  name: "fundDocument",
  title: "Fund Document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [...CATEGORY_OPTIONS],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fund",
      type: "string",
      options: {
        list: [...FUND_OPTIONS],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Display order within category",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "fund" },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Document",
        subtitle,
      };
    },
  },
});

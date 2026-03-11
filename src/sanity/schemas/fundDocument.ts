import { defineField, defineType } from "sanity";

export const fundDocumentType = defineType({
  name: "fundDocument",
  title: "Fund Document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
    }),
    defineField({
      name: "fund",
      title: "Fund",
      type: "string",
      options: {
        list: [
          { value: "micf", title: "MICF" },
          { value: "miietf", title: "MIIETF" },
          { value: "miirf", title: "MIIRF" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { value: "general", title: "General" },
          { value: "fund-manager-reports", title: "Fund manager reports" },
          { value: "shariah-compliance", title: "Shariah compliance" },
          { value: "financial-statements", title: "Financial statements" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      fund: "fund",
    },
    prepare({ title, category, fund }) {
      return {
        title: title ?? "Untitled",
        subtitle: [category, fund].filter(Boolean).join(" · ") || undefined,
      };
    },
  },
});

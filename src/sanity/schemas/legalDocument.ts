import { defineField, defineType } from "sanity";

export const legalDocumentType = defineType({
  name: "legalDocument",
  title: "Legal Document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",
      options: {
        accept: "application/pdf",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title ?? "Untitled",
        subtitle: "Legal Document",
      };
    },
  },
});

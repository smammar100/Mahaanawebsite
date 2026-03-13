import { defineField, defineType } from "sanity";

const CATEGORIES = [
  { value: "Getting Started & Account Setup", title: "Getting Started & Account Setup" },
  { value: "Mahaana Save+", title: "Mahaana Save+" },
  { value: "Mahaana ETF (MIIETF)", title: "Mahaana ETF (MIIETF)" },
  { value: "Mahaana Retirement", title: "Mahaana Retirement" },
  { value: "Returns & Performance", title: "Returns & Performance" },
  { value: "Withdrawals & Deposits", title: "Withdrawals & Deposits" },
  { value: "Taxes, Zakat & Shariah", title: "Taxes, Zakat & Shariah" },
  { value: "Fees & Charges", title: "Fees & Charges" },
  { value: "Security & Technology", title: "Security & Technology" },
  { value: "Support", title: "Support" },
  { value: "Account", title: "Account" },
  { value: "Features", title: "Features" },
  { value: "Security", title: "Security" },
  { value: "Other", title: "Other" },
] as const;

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [...CATEGORIES],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "question",
      category: "category",
    },
    prepare({ title, category }) {
      return {
        title: title ?? "Untitled",
        subtitle: category ?? undefined,
      };
    },
  },
});

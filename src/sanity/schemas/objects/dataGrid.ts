import { BarChartIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const dataGrid = defineType({
  name: "dataGrid",
  title: "Data Grid",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional heading for this grouped data block.",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
      description: "Optional context line (for example source or date context).",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "dataGridItem",
          title: "Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "Optional value text such as a number, metric, or short result.",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description: "Optional supporting explanation for this item.",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Optional emoji or icon keyword for semantic emphasis.",
            }),
          ],
          preview: {
            select: {
              label: "label",
              value: "value",
              description: "description",
            },
            prepare({ label, value, description }) {
              const fallback =
                typeof description === "string" ? description.slice(0, 60) : "";
              return {
                title: label || "Untitled item",
                subtitle: value || fallback || undefined,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(12),
      description: "Structured items that power metrics, cards, features, or compact data pairs.",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Metrics", value: "metrics" },
          { title: "Cards", value: "cards" },
          { title: "Features", value: "features" },
          { title: "Compact", value: "compact" },
        ],
      },
      initialValue: "cards",
      validation: (rule) => rule.required(),
      description:
        "Semantic hint only. Pick the data intent; frontend decides visual layout and styling.",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      variant: "variant",
      items: "items",
    },
    prepare({ heading, variant, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: heading || "Data Grid",
        subtitle: `${count} items · ${variant || "cards"}`,
      };
    },
  },
});

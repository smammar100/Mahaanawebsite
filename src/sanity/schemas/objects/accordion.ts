import {
  BlockquoteIcon,
  CommentIcon,
  MenuIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  BlockquoteStylePreview,
  PullquoteStylePreview,
} from "./portableTextBlockStylePreviews";

const nestedBodyOf = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      {
        title: "Blockquote",
        value: "blockquote",
        icon: BlockquoteIcon,
        component: BlockquoteStylePreview,
      },
      {
        title: "Pullquote",
        value: "pullquote",
        icon: CommentIcon,
        component: PullquoteStylePreview,
      },
      { title: "Heading 3", value: "h3" },
      { title: "Heading 4", value: "h4" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
        { title: "Underline", value: "underline" },
        { title: "Code", value: "code" },
      ],
      annotations: [
        defineArrayMember({
          name: "link",
          title: "External Link",
          type: "object",
          fields: [
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "openInNewTab",
              title: "Open in new tab",
              type: "boolean",
              initialValue: true,
            }),
          ],
        }),
      ],
    },
  }),
  defineArrayMember({ type: "contentTable" }),
];

export const accordion = defineType({
  name: "accordion",
  title: "Accordion / FAQ",
  type: "object",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional heading shown above the accordion group.",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "accordionItem",
          title: "Item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: nestedBodyOf,
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
      description: "One or more collapsible entries.",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Accordion", value: "accordion" },
          { title: "FAQ", value: "faq" },
          { title: "Tabs", value: "tabs" },
        ],
      },
      initialValue: "accordion",
      validation: (rule) => rule.required(),
      description:
        "Interaction hint only. Select content intent while frontend controls interaction pattern.",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      items: "items",
      variant: "variant",
    },
    prepare({ heading, items, variant }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: heading || "Accordion",
        subtitle: `${count} items · ${variant || "accordion"}`,
      };
    },
  },
});

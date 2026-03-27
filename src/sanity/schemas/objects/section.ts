import {
  BlockquoteIcon,
  CommentIcon,
  ComponentIcon,
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
];

export const section = defineType({
  name: "section",
  title: "Section",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional heading shown above this grouped content block.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: nestedBodyOf,
      description: "Section copy using nested rich text. Keep this content scoped to the section.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Highlight", value: "highlight" },
          { title: "Aside", value: "aside" },
        ],
        layout: "radio",
      },
      initialValue: "default",
      description:
        "Semantic hint only. Choose the intent of this section; frontend controls visual treatment.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      variant: "variant",
    },
    prepare({ heading, variant }) {
      return {
        title: heading || "Section",
        subtitle: `Section · ${variant || "default"}`,
      };
    },
  },
});

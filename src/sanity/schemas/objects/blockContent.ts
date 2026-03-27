import React from "react";
import {
  BlockquoteIcon,
  CommentIcon,
  HighlightIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  BlockquoteStylePreview,
  PullquoteStylePreview,
} from "./portableTextBlockStylePreviews";

function HighlightPreview(props: { children: React.ReactNode }) {
  return React.createElement(
    "span",
    {
      style: {
        background: "#fef08a",
        borderRadius: "0.25rem",
        paddingInline: "0.15rem",
      },
    },
    props.children
  );
}

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
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
        { title: "Heading 2", value: "h2" },
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
          { title: "Strike", value: "strikethrough" },
          { title: "Code", value: "code" },
          {
            title: "Highlight",
            value: "highlight",
            icon: HighlightIcon,
            component: HighlightPreview,
          },
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
          defineArrayMember({
            name: "internalLink",
            title: "Internal Article Link",
            type: "object",
            fields: [
              defineField({
                name: "reference",
                title: "Article",
                type: "reference",
                to: [{ type: "investorEducationArticle" }],
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "inlineImage" }),
    defineArrayMember({ type: "videoEmbed" }),
    defineArrayMember({ type: "section" }),
    defineArrayMember({ type: "dataGrid" }),
    defineArrayMember({ type: "contentTable" }),
    defineArrayMember({ type: "callToAction" }),
    defineArrayMember({ type: "accordion" }),
    defineArrayMember({ type: "iconFeatureCard" }),
    defineArrayMember({ type: "highcharts" }),
  ],
});

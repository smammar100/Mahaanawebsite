import { LaunchIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to Action",
  type: "object",
  icon: LaunchIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required().max(140),
      description: "Primary call-to-action headline.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
      description: "Optional supporting copy for this action prompt.",
    }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "ctaAction",
          title: "Action",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(60),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Secondary", value: "secondary" },
                  { title: "Link", value: "link" },
                ],
                layout: "radio",
              },
              initialValue: "primary",
              validation: (rule) => rule.required(),
              description:
                "Semantic intent only. Primary is dominant, secondary is alternative, link is subtle.",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(3),
      description: "One to three actions readers can take from this CTA.",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Prominent", value: "prominent" },
        ],
      },
      initialValue: "default",
      validation: (rule) => rule.required(),
      description:
        "Semantic hint only. Use prominent for major conversion intent; frontend controls styling.",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      firstAction: "actions.0.label",
    },
    prepare({ title, firstAction }) {
      return {
        title: title || "Call to Action",
        subtitle: firstAction || undefined,
      };
    },
  },
});

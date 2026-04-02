import { defineField, defineType } from "sanity";

const DEPARTMENT_OPTIONS = [
  { title: "Engineering", value: "Engineering" },
  { title: "Product", value: "Product" },
  { title: "Design", value: "Design" },
  { title: "Data", value: "Data" },
  { title: "Technology & Operations", value: "Technology & Operations" },
  { title: "Sales", value: "Sales" },
  { title: "Marketing", value: "Marketing" },
  { title: "Operations", value: "Operations" },
  { title: "People", value: "People" },
  { title: "Other", value: "Other" },
];

export const jobType = defineType({
  name: "job",
  title: "Jobs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: DEPARTMENT_OPTIONS,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Remote, Hybrid, On-site, or city",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Full-Time", value: "Full-Time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Contract", value: "Contract" },
          { title: "Internship", value: "Internship" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "isOpen",
      title: "Open role",
      type: "boolean",
      description: "When off, the job is hidden from the public listing (detail URL may still work if linked).",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
    }),
    defineField({
      name: "aboutMahaana",
      title: "About Mahaana",
      type: "text",
      rows: 5,
      description: "Company intro shown before the role overview on the job page.",
    }),
    defineField({
      name: "roleOverview",
      title: "Role overview",
      type: "text",
      rows: 6,
      description: "Overview of the role (formerly labelled “About the role”).",
    }),
    defineField({
      name: "keyResponsibilities",
      title: "Key responsibilities",
      type: "blockContent",
      description:
        "Rich text: use Heading 3 for each category and bullet lists for sub-points. The page adds the main “Key responsibilities” heading.",
    }),
    defineField({
      name: "requirements",
      title: "Required qualifications",
      type: "blockContent",
      description:
        "Rich text: use bullet or numbered lists, headings, and links as needed. The page adds the main section heading.",
    }),
    defineField({
      name: "preferredQualifications",
      title: "Good to have",
      type: "blockContent",
      description:
        "Rich text: use bullet or numbered lists, headings, and links as needed. The page adds the main section heading.",
    }),
    defineField({
      name: "benefits",
      title: "What we offer",
      type: "blockContent",
      description:
        "Rich text: use bullet or numbered lists, headings, and links as needed. The page adds the main section heading.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      department: "department",
      location: "location",
      isOpen: "isOpen",
    },
    prepare({ title, department, location, isOpen }) {
      const status = isOpen === false ? "Closed" : "Open";
      const sub = [department, location, status].filter(Boolean).join(" · ");
      return {
        title: title ?? "Untitled",
        subtitle: sub || undefined,
      };
    },
  },
});

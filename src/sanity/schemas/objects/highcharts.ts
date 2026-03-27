import { BarChartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Portable Text embed for Highcharts (JSON options).
 * Inspired by https://code.on.nilsnh.no/nilsnh/sanity-plugin-highcharts-editor — we use a
 * schema-only approach compatible with Sanity v5; paste JSON from the Highcharts editor or demos.
 */
export const highcharts = defineType({
  name: "highcharts",
  title: "Chart (Highcharts)",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "title",
      title: "Chart label",
      type: "string",
      description: "Optional. Shown to editors and used for accessibility on the site.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "jsonStr",
      title: "Highcharts options (JSON)",
      type: "text",
      rows: 14,
      description:
        "Paste valid Highcharts options JSON. Build charts at https://www.highcharts.com/demo — open a demo → hamburger menu → “Edit in JSFiddle” / copy options, or use the Highcharts Editor and export JSON.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (typeof value !== "string" || !value.trim()) return "Required";
          try {
            JSON.parse(value);
            return true;
          } catch {
            return "Must be valid JSON";
          }
        }),
    }),
    defineField({
      name: "svgStr",
      title: "SVG snapshot (optional)",
      type: "text",
      rows: 4,
      description:
        "Optional static SVG from the editor for archival; the site renders from JSON above.",
    }),
  ],
  preview: {
    select: { title: "title", jsonStr: "jsonStr" },
    prepare({ title, jsonStr }) {
      const snippet =
        typeof jsonStr === "string" && jsonStr.length > 0
          ? `${jsonStr.slice(0, 72)}${jsonStr.length > 72 ? "…" : ""}`
          : "No JSON";
      return {
        title: title || "Highcharts",
        subtitle: snippet,
      };
    },
  },
});

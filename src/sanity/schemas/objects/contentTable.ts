import { ThListIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const contentTable = defineType({
  name: "contentTable",
  title: "Table",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional table caption (shown above the table, for accessibility).",
    }),
    defineField({
      name: "firstRowIsHeader",
      title: "First row is header",
      type: "boolean",
      initialValue: true,
      description: "When on, the first row renders as column headers.",
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          title: "Row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }) {
              const c = Array.isArray(cells) ? cells : [];
              const preview = c.slice(0, 4).join(" · ");
              return {
                title: c[0] || "Row",
                subtitle: c.length > 1 ? preview : undefined,
              };
            },
          },
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(50)
          .custom((rows) => {
            if (!Array.isArray(rows) || rows.length === 0) return true;
            const lengths = rows.map((r) =>
              r &&
              typeof r === "object" &&
              "cells" in r &&
              Array.isArray((r as { cells?: string[] }).cells)
                ? (r as { cells: string[] }).cells.length
                : 0
            );
            const max = Math.max(...lengths);
            const min = Math.min(...lengths);
            if (max === 0) return "Add at least one cell to each row.";
            if (max !== min) {
              return "Each row must have the same number of cells. Pad short rows with empty cells.";
            }
            return true;
          }),
      description:
        "Add rows; in each row, add cells until all rows have the same column count.",
    }),
  ],
  preview: {
    select: {
      caption: "caption",
      rows: "rows",
    },
    prepare({ caption, rows }) {
      const n = Array.isArray(rows) ? rows.length : 0;
      const cols =
        n > 0 && Array.isArray(rows[0]?.cells) ? rows[0].cells.length : 0;
      return {
        title: caption || "Table",
        subtitle: `${n}×${cols || "?"} grid`,
      };
    },
  },
});

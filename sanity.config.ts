import { defineConfig } from "sanity";
import type { StructureBuilder } from "sanity/structure";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

/** Defaults match `.env.example` so Studio/CLI load without a local `.env` (override via env in deploy). */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ctfatnb0";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const fundDocumentFolders: {
  title: string;
  fund: "micf" | "miietf" | "miirf";
  templateId: string;
}[] = [
  { title: "MICF", fund: "micf", templateId: "fund-document-micf" },
  { title: "MIIETF", fund: "miietf", templateId: "fund-document-miietf" },
  { title: "MIIRF", fund: "miirf", templateId: "fund-document-miirf" },
];

function fundDocumentListItem(
  S: StructureBuilder,
  spec: (typeof fundDocumentFolders)[number]
) {
  const filter = `_type == "fundDocument" && fund == "${spec.fund}"`;
  return S.listItem()
    .title(spec.title)
    .child(
      S.documentList()
        .title(spec.title)
        .schemaType("fundDocument")
        .filter(filter)
        .defaultOrdering([{ field: "publishDate", direction: "desc" }])
        .initialValueTemplates([S.initialValueTemplateItem(spec.templateId)])
    );
}

export default defineConfig({
  name: "default",
  title: "Mahaana",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Investor Education")
              .child(
                S.list()
                  .title("Investor Education")
                  .items([
                    S.documentTypeListItem("investorEducationArticle").title(
                      "Articles"
                    ),
                    S.documentTypeListItem("investorEducationNews").title(
                      "News"
                    ),
                    S.documentTypeListItem(
                      "investorEducationVideoPodcast"
                    ).title("Videos & Podcasts"),
                  ])
              ),
            S.listItem()
              .title("Fund Documents")
              .child(
                S.list()
                  .title("Fund Documents")
                  .items(fundDocumentFolders.map((spec) =>
                    fundDocumentListItem(S, spec)
                  ))
              ),
            S.documentTypeListItem("legalDocument").title("Legal Documents"),
            S.documentTypeListItem("job").title("Jobs"),
            S.documentTypeListItem("faq").title("Help Center FAQs"),
            S.documentTypeListItem("review").title("Reviews"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: "fund-document-micf",
        title: "MICF",
        schemaType: "fundDocument",
        value: () => ({ fund: "micf" as const }),
      },
      {
        id: "fund-document-miietf",
        title: "MIIETF",
        schemaType: "fundDocument",
        value: () => ({ fund: "miietf" as const }),
      },
      {
        id: "fund-document-miirf",
        title: "MIIRF",
        schemaType: "fundDocument",
        value: () => ({ fund: "miirf" as const }),
      },
    ],
  },
});

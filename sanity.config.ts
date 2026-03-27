import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

/** Defaults match `.env.example` so Studio/CLI load without a local `.env` (override via env in deploy). */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ctfatnb0";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

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
            S.documentTypeListItem("fundDocument").title("Fund Documents"),
            S.documentTypeListItem("legalDocument").title("Legal Documents"),
            S.documentTypeListItem("faq").title("Help Center FAQs"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});

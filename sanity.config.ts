import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
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
              .title("Videos & Podcasts")
              .id("videos-podcasts")
              .child(
                S.list()
                  .title("Videos & Podcasts")
                  .id("videos-podcasts-list")
                  .items([
                    S.listItem()
                      .title("Videos & Podcasts")
                      .id("videoPodcast")
                      .child(S.documentTypeList("videoPodcast")),
                    S.listItem()
                      .title("Playlist Categories")
                      .id("playlistCategory")
                      .child(S.documentTypeList("playlistCategory")),
                  ])
              ),
            ...S.documentTypeListItems().filter(
              (item) =>
                !["videoPodcast", "playlistCategory"].includes(
                  item.getId() ?? ""
                )
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});

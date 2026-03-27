import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "mahaana",
  deployment: {
    appId: "dci3txr35qcgkxlcse29w4uv",
    autoUpdates: true,
  },
});

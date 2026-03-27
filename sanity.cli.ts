import { defineCliConfig } from "sanity/cli";

/** Defaults match `.env.example` so CLI commands work when env is not loaded (CI/local). */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ctfatnb0";
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

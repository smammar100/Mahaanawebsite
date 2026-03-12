# Sanity Studio and schema deployment

The site embeds Sanity Studio at `/studio`. Schema and manifest files are generated and optionally deployed so Dashboard, Canvas, and other Sanity apps can use the content model.

## Schema extract and deploy

- **Extract** (writes schema to `public/studio/static/schema.json`; run before deploy to refresh the schema file):
  ```bash
  npm run schema:extract
  ```
- **Deploy** (pushes schema to the dataset; requires login or a deploy token):
  ```bash
  npm run schema:deploy
  ```

For CI/CD, use a **deploy token** from [Sanity Manage](https://www.sanity.io/manage) and set it as a secret (e.g. `SANITY_AUTH_TOKEN`). Do not commit the token. Example:

```bash
SANITY_AUTH_TOKEN=<deploy_token> npm run schema:deploy
```

In pipelines, ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set so `sanity.cli.ts` and the extract step use the correct project.

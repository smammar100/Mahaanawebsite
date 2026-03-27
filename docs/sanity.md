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

## Collaborators: hosted Studio + schema

Collaborators edit content in **Sanity Studio**. This repo supports:

1. **Hosted Studio on sanity.io** (configured in [`sanity.cli.ts`](../sanity.cli.ts) with `studioHost: "mahaana"` and `deployment.appId`) — URL shape: `https://mahaana.sanity.studio` (or as shown after deploy).
2. **Embedded Studio** on the Next site at `/studio` (same schema; useful for local dev and preview).

### One-time setup (project owner)

1. Copy [`.env.example`](../.env.example) to `.env.local` (do not commit).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_AUTH_TOKEN` (deploy token from [Sanity Manage](https://www.sanity.io/manage) → your project → **API** → **Tokens**).
3. Verify env: `npm run sanity:verify-env`
4. **Deploy token permissions:** the API token used as `SANITY_AUTH_TOKEN` must be allowed to deploy schema and hosted Studio. If `npm run schema:deploy` returns `deployStudio` / `Unauthorized`, or `npm run sanity:studio-deploy` returns `sanity.project.read` / `Forbidden`, create a new token in [Sanity Manage](https://www.sanity.io/manage) → project **ctfatnb0** → **API** → **Tokens** with **Editor** access (or the permissions your org assigns for deploy), not a read-only token.
5. Push schema + manifest and deploy hosted Studio in one go:
   ```bash
   npm run sanity:deploy-all
   ```
   Or step by step:
   ```bash
   npm run sanity:generate
   npm run schema:deploy
   npm run sanity:studio-deploy
   ```

### Troubleshooting (local CLI)

- **`CLI config cannot be loaded` / Vite `client.mjs`:** this repo pins `vite@6.3.5` (see `package.json` `overrides`) because Sanity CLI is not compatible with Vite 7’s layout. Run `npm install` after pulling.
- **`Failed to resolve entry` for `@sanity/ui`, `framer-motion`, or `motion-dom`:** reinstall deps (`npm ci` or delete `node_modules` and `npm install`). Those packages must include built `dist/` files.
- **Schema/manifest only (no API deploy):** `npm run sanity:generate` still writes `public/studio/static/` and is enough to refresh local Studio assets before commit.

### Invite collaborators

1. Open [Sanity Manage](https://www.sanity.io/manage) → select project **`ctfatnb0`** (or the ID in `.env.local`) → **Team** / **Members** (wording varies by plan).
2. Invite by email. Use **Editor** or **Contributor** for authors; **Administrator** only when someone must manage tokens, CORS, or members.
3. Ask each person to accept the invite and sign in at the hosted Studio URL (`https://mahaana.sanity.studio` after a successful `npm run sanity:studio-deploy`) or at `/studio` on the deployed Next site (e.g. production URL + `/studio`).

### CORS and studio URL

- In Sanity Manage → **API** → **CORS origins**, add origins your team uses (e.g. production site, `http://localhost:3000`, and the hosted Studio origin if required by your setup).
- Align `NEXT_PUBLIC_SANITY_STUDIO_URL` in `.env.local` with the canonical Studio URL (see [`.env.example`](../.env.example)) so Dashboard and tooling stay consistent.

### Validation checklist (after deploy)

- [ ] `npm run sanity:verify-env` passes on a machine with `.env.local`.
- [ ] Hosted Studio opens and login works for an invited user.
- [ ] User can create a draft document of an expected type and publish (if their role allows).

## Cache revalidation (publish → live site)

When someone **publishes** in Studio, the Next.js route [`src/app/api/revalidate/route.ts`](../src/app/api/revalidate/route.ts) can refresh cached pages. Configure **one** shared secret and **one** webhook so every collaborator’s publish triggers the same flow.

### 1. Netlify

1. **Site** → **Site configuration** → **Environment variables** → add variable:
   - **Key:** `REVALIDATION_SECRET`
   - **Value:** a long random string (same string you will use in the Sanity webhook header below).
   - Enable **Contains secret values** if offered.
2. **Trigger a new deploy** after saving (Deploys → Trigger deploy). Without redeploy, the API route returns **501** in production.

### 2. Sanity webhook

In [Sanity Manage](https://www.sanity.io/manage) → your project → **API** → **Webhooks** → **Create**:

- **URL:** `https://<your-live-site>/api/revalidate` (public HTTPS origin only; no `localhost`).
- **Dataset:** usually `production` (match `NEXT_PUBLIC_SANITY_DATASET`).
- **Trigger on:** **Create**, **Update**, and **Delete** (publishing an existing doc is an **Update**).
- **HTTP method:** `POST`.
- **HTTP headers:** `Authorization` = `Bearer <same value as REVALIDATION_SECRET>` (one space after `Bearer`).
- Leave **Filter** / **Projection** empty unless you need to narrow document types; the handler reads `_type` and `slug` from the document payload.
- Keep **Trigger on draft changes** off unless you want webhooks on every autosave.

### 3. Local development

Copy `REVALIDATION_SECRET` into [`.env.local`](../.env.example) so it matches production if you test `/api/revalidate` locally. Run:

```bash
npm run revalidate:verify-env
```

### 4. Verify

- In Sanity, open the webhook’s **delivery logs**; expect **HTTP 200** from your site (**401** = wrong Bearer token; **501** = Netlify missing secret or not redeployed).
- Publish a small content change and confirm the Investor Education hub updates (within seconds; ISR also uses `revalidate` on those routes as a backup).

## HTML to Portable Text import pipeline

Use the HTML importer to convert long-form blog HTML into the `investorEducationArticle.bodyHtml` `blockContent` schema.

- Preview conversion output (no write):
  ```bash
  npm run import:html:preview -- "E:/path/to/post.html"
  ```
- Create a draft article in Sanity:
  ```bash
  npm run import:html -- "E:/path/to/post.html"
  ```

### Conversion behavior

- Uses official Portable Text conversion libraries (`@portabletext/html` + `@portabletext/block-tools`) for baseline HTML->Portable Text conversion.
- Runs schema-aware normalization:
  - ensures `_key`, `children`, `markDefs` and valid block styles
  - sanitizes annotations to the project model (`link`, `internalLink`)
  - removes empty blocks before write
- Applies profile mappings where feasible:
  - section-like content to `section`
  - table/list metrics to `dataGrid`
  - CTA links to `callToAction`
  - `<details>` groups to `accordion`
  - YouTube/Vimeo embeds to `videoEmbed`
- Falls back to standard Portable Text blocks when a source pattern cannot be safely mapped to a custom object.

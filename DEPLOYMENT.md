# Deployment — GitHub Actions → GitHub Pages → fly.ingsparks.de

The site builds to static HTML and deploys via GitHub Actions to GitHub Pages,
served at the existing custom domain **https://fly.ingsparks.de/**.

## What's already in the repo

- `.github/workflows/deploy.yml` — builds with the official `withastro/action` and
  publishes to Pages on every push to `main` (and manual dispatch).
- `public/CNAME` → `fly.ingsparks.de` (tells Pages the custom domain).
- `astro.config.mjs` → `site: 'https://fly.ingsparks.de'`, **no `base`** (correct for
  a custom domain), `trailingSlash: 'always'`, `build.format: 'directory'`.

## One-time setup (owner actions — outside this repo)

1. **Push** this repo to `github.com/tordans/flyingsparks` (branch `main`).
2. On GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. **DNS** at the `ingsparks.de` provider — add a record for the `fly` subdomain:
   - `CNAME  fly  →  tordans.github.io.`
     (Apex domains would instead use GitHub's A/AAAA records; this is a subdomain, so CNAME.)
4. Back in **Settings → Pages**, set the **Custom domain** to `fly.ingsparks.de` and,
   once DNS validates, tick **Enforce HTTPS**.
5. Push a commit → the Action builds and deploys automatically.

## Cutover notes (zero-downtime-ish)

- Because the new site reuses the **exact same domain and permalinks**
  (`/YYYY-MM-DD/slug/`), switching DNS/Pages is the cutover. Old links keep working.
- The current WordPress server can stay up until DNS is switched; afterwards it can
  be decommissioned — see `DECOMMISSION.md`.
- The old `.htaccess` had `/category/* → /tag/*` and `/suche/* , /search/*` redirects.
  The blog was tag-driven (1 category), so this is low impact; add explicit
  `redirects` in `astro.config.mjs` if any old `/category/` links are found in logs.

## Build locally

```bash
npm install
npm run build      # → dist/
npm run preview    # serve dist/ locally
```

## Re-running the import (if WordPress data changes)

```bash
node _migration/scripts/import-wxr.mjs   # regenerates src/content + comments
node _migration/scripts/copy-media.mjs   # copies referenced media into public/
```

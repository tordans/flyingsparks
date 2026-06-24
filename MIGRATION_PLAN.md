# flyingsparks: WordPress → Astro migration plan

Status legend: ✅ done · 🔄 in progress · ⏳ waiting on input · ⬜ todo

This plan supersedes the earlier draft in `flyingsparks-blog/MIGRATION_PLAN.md`.
It is grounded in the official Astro "Migrating from WordPress" guide and the
**actual** content of the June 24 2026 backups.

---

## 1. Source inventory (measured from the backups)

From `db-backups-2026-06-24/flyingsparks.WordPress.2026-06-24.xml` (WXR, UTF-8):

| Item | Count | Notes |
|---|---|---|
| Posts | 515 | 512 published · 5 draft · 2 private (incl. pages below) |
| Pages | 4 | `Über`, `Themen-Liste`, `Vorwort` (public) + `Melatengürtel` (private) |
| Comments | 784 | **753 approved/public** · 31 trash/admin-only |
| Tags | 536 | tag-driven blog; only 1 real category |
| Attachments | 83 | URLs only — binaries come from the FTP backup |
| Span | 2005 → 2010-ish | ~20 years of archive |

- **Live site:** still up, WordPress 6.2.9 on nginx, custom theme **`flyingspark`**.
- **Permalinks:** `https://fly.ingsparks.de/YYYY-MM-DD/post-name/` (date-prefixed).
  Attachment pages: `…/YYYY-MM-DD/post-name/attachment-slug/`.
- **Encoding gotcha:** the live HTML is served as **Latin-1**; the **WXR export is
  UTF-8** and is the authoritative content source. The crawled HTML/CSS is layout
  reference only (saved in `_migration/layout-reference/`).

### Two things the DB/XML do NOT contain (sourced separately)
1. **Media binaries** — `wp-content/uploads/` (+ ~50 images on the old host
   `flyingsparks.wwwfiles.de`, plus some external/Flickr). → from the FTP backup.
2. **Theme/layout** — CSS/templates of `flyingspark`. → from FTP + the live crawl.

---

## 2. Decisions (confirmed with owner)

- **Assets:** FTP-download the full web root **and** crawl the live site. The FTP
  dump contains **non-WordPress files** for other projects in root and subfolders —
  **these must be preserved and NOT migrated.** Identify the WP install
  (`wp-config.php`, `wp-content/`, `wp-includes/`) and treat everything else as
  out-of-scope to keep.
- **Comments:** render **currently-public (approved) comments read-only** under each
  post (threading preserved, **no submit form**). **Archive** the non-public ones
  (trash/admin-only) to a non-published archive format.
- **Flash:** **modernize** `.swf` embeds where the provider still works
  (Vimeo, TED, SlideShare…); for dead ones, a **styled placeholder** linking to the
  original URL + an archive.org lookup.
- **Non-published content:** preserve drafts + private as `draft: true` (excluded
  from the production build) — kept in the repo, not published.
- **Hosting:** GitHub Actions → GitHub Pages, custom domain `https://fly.ingsparks.de`.
- **Follow-up (not now):** add Keystatic CMS — content model is kept Keystatic-friendly.

---

## 3. Target architecture (Astro)

Scaffolded from the official **blog** starter (Astro 7 + MDX + RSS + sitemap +
content collections + `sharp` image optimization). `astro.config.mjs` already set:
`site: https://fly.ingsparks.de`, `trailingSlash: 'always'`, `build.format: 'directory'`.

```
src/
  content/
    posts/    # 515 posts as Markdown/MDX, inline HTML preserved
    pages/    # 4 standalone pages
  data/
    comments/        <slug>.json        # approved, rendered
  components/        # Header(#kopf), Sidebar, PostMeta, Comments, FlashEmbed…
  layouts/           # recreate flyingspark layout closely
  pages/
    [...permalink].astro   # builds /YYYY-MM-DD/slug/ for URL parity
public/
  wp-content/uploads/...   # media kept at original paths → 1:1 URL parity
_migration/
  layout-reference/        # crawled original HTML + theme CSS (reference)
  archive/comments-nonpublic.ndjson   # preserved, not built
  scripts/import-wxr.mjs   # the importer
```

**Content model (frontmatter):** `title`, `date`, `updatedDate?`, `wpSlug`,
`wpPostId`, `permalink` (full `/YYYY-MM-DD/slug/`), `draft`, `visibility`
(`public|private`), `tags[]`, `excerpt?`. Body = post HTML lightly cleaned to MDX.

**Content fidelity:** preserve original post HTML rather than lossy Markdown
conversion (per Astro guide), so layout-of-content matches the original.

---

## 4. URL parity (cool URLs don't change)

- Posts/pages emitted at their exact WP permalink via `[...permalink].astro`.
- Feeds: keep `/feed/` (RSS) and `/comments/feed/` if feasible (RSS plugin).
- Attachment pages → redirect to the post (or the file). Decide during import.
- Any unavoidable changes → explicit entries in `redirects` in `astro.config.mjs`.

---

## 5. Flash modernization map (step 4)

| Provider in `.swf` | Modern handling |
|---|---|
| Vimeo moogaloop | `https://player.vimeo.com/video/<id>` iframe |
| TED EmbedPlayer | TED `/talks/<slug>` embed |
| SlideShare ssplayer | SlideShare oEmbed / link |
| Scribd Viewer | link to doc (+ archive.org) |
| Google Video / VideoEgg / Golem / Picasa / deviantART / WWF | placeholder + original link + archive.org |

A reusable `<FlashEmbed>`/`<LegacyEmbed>` component renders either the modern
iframe or the placeholder.

---

## 6. Comments (step 9)

- Approved (753): `src/data/comments/<post-slug>.json` — author (no email),
  date, content (sanitized), parent id (threading). Rendered read-only.
- Non-public (31 + any admin-only): `_migration/archive/comments-nonpublic.ndjson`
  — preserved, never built into the site.

---

## 7. Deployment (step 8) + decommission (step 7)

- GitHub Actions workflow building Astro → Pages; `public/CNAME` = `fly.ingsparks.de`;
  `.nojekyll`. **DNS change is the owner's action** (point domain at GitHub Pages).
- Decommission only **after** verified parity + go-live: checklist to remove the WP
  DB and FTP/hosting. Destructive server actions are performed by the owner.

---

## 8. Phases & checkpoints

- **P0 Inventory** ✅ — counts, permalinks, flash, layout captured.
- **P1 Scaffold + CI** 🔄 — Astro project builds; add Actions next.
- **P2 Importer + sample** ⬜ — write `import-wxr.mjs`, import ~10 representative
  posts (old/new, media, comments, flash, draft). **Checkpoint: review fidelity.**
- **P3 Full import** ⬜ — all 515 posts + 4 pages + comments + drafts.
- **P4 Media** ⬜ — copy uploads, rewrite URLs, report missing.
- **P5 Theme** ⬜ — recreate `flyingspark` layout closely.
- **P6 URLs/redirects** ⬜ — parity check + redirects.
- **P7 QA + deploy** ⬜ — link/image check, build, go-live.
- **P8 Decommission** ⬜ — after sign-off.

---

## 9. Open items / risks

- Confirm whether the SQL dump is needed (WXR already carries comment approval
  status + threading; SQL is a precision fallback, esp. for the legacy
  `wp_mygallery`/`wp_mypictures` gallery plugin if galleries are used in posts).
- Old-host images (`flyingsparks.wwwfiles.de`) may be gone — will report and fall
  back to archive.org where possible.
- Large media tree (~hundreds of MB) — keep in-repo for now; consider pruning/LFS
  if it gets unwieldy.

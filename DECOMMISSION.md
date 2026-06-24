# Decommissioning the old WordPress + FTP (step 7)

Do this **only after** the Astro site is live on `fly.ingsparks.de` via GitHub Pages
and verified. These are **owner actions on your hosting** — they permanently remove
data, so keep the backups first.

## Pre-conditions (verify before removing anything)
- [ ] GitHub Pages is serving `https://fly.ingsparks.de/` (HTTPS enforced).
- [ ] Spot-check a dozen old URLs resolve 1:1 (home, several `/YYYY-MM-DD/slug/`,
      `/ueber/`, `/themen-liste/`, a few `/tag/<x>/`, `/feed/`/`rss.xml`).
- [ ] Images load (`/wp-content/uploads/...`).
- [ ] Comments appear on posts that had them.

## Keep these backups (do not delete)
- [ ] `db-backups-2026-06-24/` — WXR export + SQL dump.
- [ ] `full-backup-ftp-2026-06-24/` — full web root (WordPress + your other projects).
- [ ] The repo itself (now the source of truth for content + media).
- Recommended: store both backup folders somewhere durable (external drive / cloud).

## Preserve your non-WordPress projects FIRST
The FTP web root also contains **non-WordPress** folders that are NOT part of this
migration and must be relocated/kept, not deleted with WordPress:
- [ ] `_db-fh-prototyp/` (Flash prototype project)
- [ ] `funken-xml/`
- [ ] `_redirect_flyingsparks.wwwfiles.de/`, `_redirect_www.flyingsparks.wwwfiles.de/`
- [ ] Decide a new home for these (own repo / static host) before wiping the server.

## Remove WordPress (after the above)
- [ ] Export/keep a final DB dump (already have 2026-06-24).
- [ ] Drop the WordPress MySQL database (or delete the DB user/schema in Plesk).
- [ ] Delete the WordPress files from the web root: `wp-admin/`, `wp-includes/`,
      `wp-content/`, all `wp-*.php`, `xmlrpc.php`, `index.php`, the WP `.htaccess`.
- [ ] Remove the FTP account / hosting plan if no longer needed for other projects.
- [ ] Cancel any WordPress-related cron jobs, backup-plugin schedules, mail rules.

## After cutover
- [ ] Update any external references / bookmarks if needed (URLs are unchanged).
- [ ] Keep DNS pointed at GitHub Pages.

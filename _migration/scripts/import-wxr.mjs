// WordPress WXR → Astro content importer for flyingsparks.
//
// Reads the WordPress eXtended RSS export and emits:
//   - src/content/posts/<date>-<slug>.md   (posts; drafts/private => draft:true)
//   - src/content/pages/<slug>.md          (pages)
//   - src/data/comments/<postId>.json      (approved/public comments, no emails)
//   - _migration/archive/comments-nonpublic.ndjson  (preserved, not published)
//   - _migration/media-manifest.json       (every referenced media URL + local match)
//   - _migration/import-report.json        (counts for review)
//
// Body handling: WordPress stores content without <p> tags (wpautop adds them at
// render); Markdown reproduces the same paragraph behaviour, so we keep the body as
// HTML-in-Markdown for maximum fidelity. Media URLs are rewritten to local
// /wp-content/... paths, and legacy Flash embeds are modernized or replaced with a
// placeholder.
//
// Usage:
//   node _migration/scripts/import-wxr.mjs            # full import
//   node _migration/scripts/import-wxr.mjs --limit 8  # sample (first N posts)
//   node _migration/scripts/import-wxr.mjs --dry      # parse + report, write nothing

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { XMLParser } from 'fast-xml-parser'
import he from 'he'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = join(__dirname, '..', '..')
const WORKSPACE = join(REPO, '..')

const WXR = join(WORKSPACE, 'db-backups-2026-06-24', 'flyingsparks.WordPress.2026-06-24.xml')
const FTP_ROOT = join(WORKSPACE, 'full-backup-ftp-2026-06-24', 'fly.ingsparks.de')

const POSTS_DIR = join(REPO, 'src', 'content', 'posts')
const PAGES_DIR = join(REPO, 'src', 'content', 'pages')
const COMMENTS_DIR = join(REPO, 'src', 'data', 'comments')
const ARCHIVE = join(REPO, '_migration', 'archive', 'comments-nonpublic.ndjson')
const MEDIA_MANIFEST = join(REPO, '_migration', 'media-manifest.json')
const REPORT = join(REPO, '_migration', 'import-report.json')

const args = process.argv.slice(2)
const LIMIT = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity
const DRY = args.includes('--dry')

// ---------- helpers ----------
const arr = (x) => (Array.isArray(x) ? x : x == null ? [] : [x])
const text = (v) => (v && typeof v === 'object' ? (v['#text'] ?? '') : (v ?? '')).toString()

// Decode HTML entities for PLAIN-TEXT fields only (title/description/author).
// The post body stays HTML, so its entities are left intact.
const stripTags = (s) =>
  he
    .decode(text(s).replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim()
const yaml = (v) => JSON.stringify(v ?? '') // JSON string == valid YAML double-quoted scalar

function toISO(gmt, local) {
  for (const raw of [gmt, local]) {
    const s = text(raw).trim()
    if (!s || s.startsWith('0000')) continue
    const d = new Date(s.replace(' ', 'T') + (raw === gmt ? 'Z' : ''))
    if (!isNaN(d)) return d.toISOString()
  }
  return null
}

function permalinkPath(link) {
  try {
    const u = new URL(text(link))
    let p = u.pathname
    if (!p.endsWith('/')) p += '/'
    return p
  } catch {
    return null
  }
}

// ---------- media ----------
const mediaSeen = new Map() // url -> {localPath, exists}
const HOSTS = [
  'https://fly.ingsparks.de',
  'http://fly.ingsparks.de',
  'https://flyingsparks.wwwfiles.de',
  'http://flyingsparks.wwwfiles.de',
  'https://www.flyingsparks.wwwfiles.de',
  'http://www.flyingsparks.wwwfiles.de',
]
function localForWpContent(path) {
  // path begins with /wp-content/...
  const rel = path.replace(/^\//, '')
  return join(FTP_ROOT, rel)
}
function noteMedia(url) {
  const u = text(url)
  let path = null
  for (const h of HOSTS)
    if (u.startsWith(h + '/wp-content/')) {
      path = u.slice(h.length)
      break
    }
  if (!path && u.startsWith('/wp-content/')) path = u
  if (!path) {
    mediaSeen.set(u, { localPath: null, exists: false, external: true })
    return u
  }
  path = decodeURIComponent(path.split('?')[0].split('#')[0])
  const local = localForWpContent(path)
  if (!mediaSeen.has(u))
    mediaSeen.set(u, { localPath: local, exists: existsSync(local), external: false })
  return path // rewritten to local-root-relative
}
function rewriteMedia(html) {
  // rewrite src/href to wp-content on either host
  return html.replace(/((?:src|href)\s*=\s*")([^"]+)"/gi, (m, pre, url) => {
    const isWp =
      HOSTS.some((h) => url.startsWith(h + '/wp-content/')) || url.startsWith('/wp-content/')
    if (!isWp) {
      if (/^https?:\/\//.test(url)) noteMedia(url)
      return m
    }
    return pre + noteMedia(url) + '"'
  })
}

// ---------- legacy flash ----------
const flashHits = []
function modernizeFlash(html, postTitle) {
  // Replace <object ...>...</object> and standalone <embed ... shockwave-flash ...>
  const replaceOne = (block) => {
    const src = (block.match(/(?:data|src|value)\s*=\s*"([^"]*\.swf[^"]*)"/i) || [])[1] || ''
    flashHits.push({ post: postTitle, src })
    // Vimeo (old moogaloop): clip_id=NNN
    let m
    if ((m = src.match(/vimeo\.com\/moogaloop\.swf.*?clip_id=(\d+)/i)))
      return `<iframe src="https://player.vimeo.com/video/${m[1]}" width="400" height="300" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="Vimeo video"></iframe>`
    // YouTube (rare via flash)
    if ((m = src.match(/youtube\.com\/v\/([A-Za-z0-9_-]+)/i)))
      return `<iframe src="https://www.youtube-nocookie.com/embed/${m[1]}" width="425" height="350" frameborder="0" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy" title="YouTube video"></iframe>`
    // Everything else (Google Video, TED, SlideShare, Scribd, Picasa, VideoEgg, Golem, WWF, deviantART…) → placeholder
    const label = src ? src.replace(/^https?:\/\//, '').split('/')[0] : 'unbekannt'
    const orig = src || ''
    const wb = orig ? `https://web.archive.org/web/2010/${orig}` : 'https://web.archive.org/'
    return (
      `<div class="legacy-embed" role="note">` +
      `<p><strong>Eingebetteter Flash-Inhalt</strong> (${label}) — dieser Player existiert nicht mehr.</p>` +
      (orig
        ? `<p>Original: <a href="${orig}" rel="nofollow noopener">${orig}</a> · ` +
          `<a href="${wb}" rel="nofollow noopener">archive.org</a></p>`
        : '') +
      `</div>`
    )
  }
  html = html.replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, (b) =>
    /shockwave-flash|\.swf/i.test(b) ? replaceOne(b) : b,
  )
  html = html.replace(/<embed\b[^>]*shockwave-flash[^>]*>(?:<\/embed>)?/gi, (b) => replaceOne(b))
  html = html.replace(/<embed\b[^>]*\.swf[^>]*>(?:<\/embed>)?/gi, (b) => replaceOne(b))
  return html
}

// ---------- shortcodes ----------
function convertShortcodes(html) {
  // [caption id="" align="" width=""]<img ..>Caption text[/caption] -> <figure>
  html = html.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, (_, inner) => {
    const img = (inner.match(/<img[\s\S]*?>/i) || [''])[0]
    const cap = inner.replace(/<img[\s\S]*?>/i, '').trim()
    return `<figure>${img}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`
  })
  // [gallery ...] (1 occurrence) -> leave a visible marker for manual handling
  html = html.replace(
    /\[gallery[^\]]*\]/gi,
    '<!-- TODO[gallery]: original WP gallery shortcode -->',
  )
  return html
}

function cleanBody(html, title) {
  let h = text(html)
  h = convertShortcodes(h)
  h = modernizeFlash(h, title)
  h = rewriteMedia(h)
  return h.trim()
}

// ---------- main ----------
const xml = readFileSync(WXR, 'utf-8')
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  parseTagValue: false,
  parseAttributeValue: false,
  trimValues: false,
  processEntities: false,
})
const doc = parser.parse(xml)
const channel = doc.rss.channel
const items = arr(channel.item)

if (!DRY) {
  for (const d of [POSTS_DIR, PAGES_DIR, COMMENTS_DIR]) {
    rmSync(d, { recursive: true, force: true })
    mkdirSync(d, { recursive: true })
  }
  mkdirSync(dirname(ARCHIVE), { recursive: true })
}

const report = {
  posts: 0,
  pages: 0,
  drafts: 0,
  private: 0,
  published: 0,
  attachments: 0,
  skipped: 0,
  commentsPublic: 0,
  commentsArchived: 0,
  pingbacks: 0,
}
const archiveLines = []
const commentsByPost = new Map()
let postCount = 0

function collectComments(item, postId) {
  for (const c of arr(item['wp:comment'])) {
    const approved = text(c['wp:comment_approved']).trim()
    const type = text(c['wp:comment_type']).trim() // '', 'pingback', 'trackback'
    const rec = {
      id: text(c['wp:comment_id']),
      author: stripTags(c['wp:comment_author']),
      authorUrl: text(c['wp:comment_author_url']).trim() || null,
      date: toISO(c['wp:comment_date_gmt'], c['wp:comment_date']),
      content: text(c['wp:comment_content']).trim(),
      parent: text(c['wp:comment_parent']).trim() || '0',
      type: type || 'comment',
    }
    if (approved === '1') {
      if (!commentsByPost.has(postId)) commentsByPost.set(postId, [])
      commentsByPost.get(postId).push(rec)
      report.commentsPublic++
      if (type) report.pingbacks++
    } else {
      archiveLines.push(JSON.stringify({ postId, approved, ...rec, email: undefined }))
      report.commentsArchived++
    }
  }
}

for (const item of items) {
  const type = text(item['wp:post_type'])
  const status = text(item['wp:status'])
  const postId = text(item['wp:post_id'])
  const title = stripTags(item.title) || '(ohne Titel)'
  const slug = text(item['wp:post_name']) || `id-${postId}`
  const link = item.link

  if (type === 'attachment') {
    report.attachments++
    continue
  }
  if (type !== 'post' && type !== 'page') {
    report.skipped++
    continue
  }
  if (type === 'post') {
    if (postCount >= LIMIT) {
      continue
    }
    postCount++
  }

  collectComments(item, postId)

  const date = toISO(item['wp:post_date_gmt'], item['wp:post_date'])
  const mod = toISO(item['wp:post_modified_gmt'], item['wp:post_modified'])
  const isDraft = status === 'draft' || status === 'pending' || status === 'auto-draft'
  const isPrivate = status === 'private'
  const visibility = isPrivate ? 'private' : isDraft ? 'draft' : 'public'
  if (isDraft) report.drafts++
  else if (isPrivate) report.private++
  else report.published++

  const tags = arr(item.category)
    .filter((c) => c['@_domain'] === 'post_tag')
    .map((c) => stripTags(c))
    .filter(Boolean)

  const permalink = permalinkPath(link)
  const excerpt = stripTags(item['excerpt:encoded'])
  const body = cleanBody(item['content:encoded'], title)

  const fm = [
    '---',
    `title: ${yaml(title)}`,
    date ? `pubDate: ${yaml(date)}` : `pubDate: ${yaml('2005-01-01T00:00:00.000Z')}`,
    mod && mod !== date ? `updatedDate: ${yaml(mod)}` : null,
    `slug: ${yaml(slug)}`,
    `wpPostId: ${yaml(postId)}`,
    permalink ? `permalink: ${yaml(permalink)}` : null,
    `visibility: ${yaml(visibility)}`,
    `draft: ${isDraft || isPrivate}`,
    excerpt ? `description: ${yaml(excerpt.slice(0, 300))}` : null,
    `tags: [${tags.map(yaml).join(', ')}]`,
    '---',
    '',
  ]
    .filter((l) => l !== null)
    .join('\n')

  const out = fm + body + '\n'

  if (!DRY) {
    if (type === 'page') {
      writeFileSync(join(PAGES_DIR, `${slug}.md`), out)
      report.pages++
    } else {
      const datePrefix = (date || '2005-01-01').slice(0, 10)
      writeFileSync(join(POSTS_DIR, `${datePrefix}-${slug}.md`), out)
      report.posts++
    }
  } else {
    report[type === 'page' ? 'pages' : 'posts']++
  }
}

if (!DRY) {
  for (const [postId, list] of commentsByPost) {
    list.sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    writeFileSync(join(COMMENTS_DIR, `${postId}.json`), JSON.stringify(list, null, '\t'))
  }
  writeFileSync(ARCHIVE, archiveLines.join('\n') + (archiveLines.length ? '\n' : ''))
  const media = [...mediaSeen.entries()].map(([url, v]) => ({ url, ...v }))
  writeFileSync(MEDIA_MANIFEST, JSON.stringify(media, null, '\t'))
  writeFileSync(
    REPORT,
    JSON.stringify(
      {
        ...report,
        mediaRefs: media.length,
        mediaMissing: media.filter((m) => !m.external && !m.exists).length,
        flashEmbeds: flashHits.length,
      },
      null,
      '\t',
    ),
  )
}

console.log(
  'Import report:',
  JSON.stringify({ ...report, mediaRefs: mediaSeen.size, flashEmbeds: flashHits.length }, null, 2),
)
const missing = [...mediaSeen.values()].filter((m) => !m.external && !m.exists).length
console.log(
  `Media: ${mediaSeen.size} refs, ${missing} local-but-missing, ${[...mediaSeen.values()].filter((m) => m.external).length} external`,
)

// Build-time data for the sidebar's "aktuelle Funken" (latest comments) and
// "andere Feuer" (latest trackbacks/pingbacks), mirroring the old
// get-recent-comments plugin (5 items each, newest first, approved items on
// published posts only).
import { getPublishedPosts, type Post } from './archive'
import { getComments, type WpComment } from './wpComments'

const LIMIT = 5
// Old plugin: title "%post_title, %post_date" with date_format 'Y-m-d'.
const TZ = 'Europe/Berlin'
const ymd = new Intl.DateTimeFormat('en-CA', {
  timeZone: TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export interface RecentComment {
  href: string // post permalink + "#comment-<id>", the anchor of Comment.astro
  linkTitle: string // "Post title, 2006-06-07"
  author: string
  text: string
}

export interface RecentTrackback {
  href: string
  linkTitle: string // 'Trackback to "Post title": excerpt'
  author: string
  text: string
}

const NAMED: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  laquo: '«',
  raquo: '»',
  ndash: '–',
  mdash: '—',
  hellip: '…',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
}

function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, e: string) => {
    if (e[0] === '#') {
      const code =
        e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return code <= 0x10ffff ? String.fromCodePoint(code) : match
    }
    return NAMED[e.toLowerCase()] ?? match
  })
}

/** Plain text of a comment: tags out, entities decoded, whitespace collapsed. */
function plainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

/** Old plugin: words longer than 30 characters are split so they cannot break the layout. */
function splitLongWords(text: string): string {
  return text
    .replace(/\S{30}/g, (word) => `${word} `)
    .replace(/\s+/g, ' ')
    .trim()
}

/** Old plugin kjgrc_excerpt(): cut at the last space within the budget and add "...". */
function excerpt(text: string, budget: number): string {
  if (text.length <= budget) return text
  let cut = text.slice(0, Math.max(0, budget))
  const space = cut.lastIndexOf(' ')
  if (space > 0) cut = cut.slice(0, space)
  if (cut.length - cut.lastIndexOf(' ') > 28) cut = cut.slice(0, -3)
  return `${cut}...`
}

/** Old plugin: the excerpt budget is 120 characters minus the author and separator. */
function budgetFor(author: string): number {
  return Math.max(0, 116 - author.length)
}

/** Old plugin kjgrc_parse_pingback(): pingback author strings carry the post title. */
function parsePingbackAuthor(raw: string): { author: string; title: string } {
  const s = raw.trim()
  const raquo = s.indexOf('»')
  if (raquo !== -1) {
    // "Author » Category » Title" or "Author » Title"
    const parts = s
      .split('»')
      .map((p) => p.trim())
      .filter(Boolean)
    return { author: parts[0] ?? s, title: parts.length > 1 ? parts[parts.length - 1] : '' }
  }
  for (const delimiter of [
    ' at ',
    '«',
    ' - ',
    ' auf ',
    ' by ',
    ' // ',
    ' | ',
    ' : ',
    ' @ ',
    ' / ',
  ]) {
    const at = s.indexOf(delimiter)
    if (at !== -1) {
      return {
        author: s.slice(at + delimiter.length).trim(),
        title: s.slice(0, at).trim(),
      }
    }
  }
  return { author: s, title: '' }
}

interface Entry {
  comment: WpComment
  post: Post
  time: number
}

function collect(post: Post, types: (type: string) => boolean): Entry[] {
  const postId = post.data.wpPostId
  if (!postId) return []
  return getComments(postId)
    .filter((c) => types(c.type))
    .map((comment) => ({
      comment,
      post,
      time: comment.date ? Date.parse(comment.date) || 0 : 0,
    }))
}

async function latest(types: (type: string) => boolean): Promise<Entry[]> {
  const posts = await getPublishedPosts()
  return posts
    .flatMap((post) => (post.data.permalink ? collect(post, types) : []))
    .sort((a, b) => b.time - a.time)
    .slice(0, LIMIT)
}

export async function getRecentComments(): Promise<RecentComment[]> {
  const entries = await latest((type) => type === 'comment')
  return entries.map(({ comment, post }) => {
    const author = decodeEntities(comment.author).trim() || 'Anonymous'
    const text = excerpt(splitLongWords(plainText(comment.content)), budgetFor(author))
    return {
      href: `${post.data.permalink}#comment-${comment.id}`,
      linkTitle: `${decodeEntities(post.data.title.replace(/<[^>]*>/g, ''))}, ${ymd.format(post.data.pubDate)}`,
      author,
      text,
    }
  })
}

export async function getRecentTrackbacks(): Promise<RecentTrackback[]> {
  const entries = await latest((type) => type !== 'comment')
  return entries.map(({ comment, post }) => {
    let author: string
    let title = ''
    let body = comment.content
    if (comment.type === 'pingback') {
      const parsed = parsePingbackAuthor(decodeEntities(comment.author))
      author = parsed.author
      title = parsed.title
      // Pingback excerpts often start and end with "[…]" markers.
      body = body
        .replace(/^\s*\[(?:&#8230;|…|\.\.\.)\]/, '')
        .replace(/\[(?:&#8230;|…|\.\.\.)\]\s*$/, '')
    } else {
      author = decodeEntities(comment.author).trim()
      const strong = /^\s*<strong>([\s\S]*?)<\/strong>/i.exec(body)
      if (strong) {
        title = plainText(strong[1])
        body = body.slice(strong[0].length)
      }
    }
    author = author || 'Anonymous'
    const text = excerpt(splitLongWords(plainText(body)), budgetFor(author))
    const shown = title ? excerpt(splitLongWords(title), budgetFor(author)) : text
    return {
      href: `${post.data.permalink}#comment-${comment.id}`,
      linkTitle: `Trackback to "${decodeEntities(post.data.title.replace(/<[^>]*>/g, ''))}": ${text}`,
      author,
      text: shown,
    }
  })
}

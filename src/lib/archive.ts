// Shared helpers for the list pages (home, tag, year and day archives).
import { getCollection, type CollectionEntry } from 'astro:content'
import { POSTS_PER_PAGE, pageCount } from './pagination'
import { tagSlug } from './slug'

export type Post = CollectionEntry<'posts'>
/** Posts and pages: tag lists contain tagged pages as well (like the old blog). */
export type Entry = Post | CollectionEntry<'pages'>

const TZ = 'Etc/GMT-1' // fixed UTC+1, like the old blog (see wpDate.ts)
const ymd = new Intl.DateTimeFormat('en-CA', {
  timeZone: TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/**
 * "2006-04-24": the day WordPress archives a post under. The permalink carries the
 * original post date; the time-zone conversion is only a fallback.
 */
function dayKey(post: Post): string {
  return (
    post.data.permalink?.match(/^\/(\d{4}-\d{2}-\d{2})\//)?.[1] ?? ymd.format(post.data.pubDate)
  )
}

/** Published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

/** Published posts and tagged pages, newest first (for the tag lists). */
export async function getTaggedEntries(): Promise<Entry[]> {
  const pages = await getCollection('pages', ({ data }) => !data.draft && data.tags.length > 0)
  return [...(await getPublishedPosts()), ...pages].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}

/** One page of a list, in the shape the list templates expect. */
export type ListPageProps = {
  posts: Entry[]
  paged: number
  maxPage: number
}

/** getStaticPaths helper: one entry per page of `posts`; `first` selects page 1 or pages 2..n. */
export function listPages<P extends Record<string, string>>(
  posts: Entry[],
  params: P,
  pages: 'first' | 'rest',
) {
  const maxPage = pageCount(posts.length)
  const numbers = pages === 'first' ? [1] : Array.from({ length: maxPage - 1 }, (_, i) => i + 2)
  return numbers.map((paged) => ({
    params: pages === 'first' ? params : { ...params, page: String(paged) },
    props: {
      posts: posts.slice((paged - 1) * POSTS_PER_PAGE, paged * POSTS_PER_PAGE),
      paged,
      maxPage,
    } satisfies ListPageProps,
  }))
}

export interface TagGroup {
  slug: string
  name: string
  posts: Entry[]
}

export function groupByTag(posts: Entry[]): TagGroup[] {
  const byTag = new Map<string, TagGroup>()
  for (const p of posts) {
    for (const t of p.data.tags) {
      const slug = tagSlug(t)
      if (!byTag.has(slug)) byTag.set(slug, { slug, name: t, posts: [] })
      byTag.get(slug)!.posts.push(p)
    }
  }
  return [...byTag.values()]
}

/** { "2006": posts, "2006-04-24": posts } for year and day archives. */
export function groupByPeriod(posts: Post[]): Map<string, Post[]> {
  const groups = new Map<string, Post[]>()
  for (const p of posts) {
    const day = dayKey(p)
    for (const key of [day.slice(0, 4), day]) {
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(p)
    }
  }
  return groups
}

const weekday = new Intl.DateTimeFormat('de-DE', { timeZone: TZ, weekday: 'long' })
/** "Montag, den 24.04.2006" for the day-archive heading */
export function dayHeading(key: string): string {
  const [y, m, d] = key.split('-')
  const date = new Date(`${key}T12:00:00Z`)
  return `${weekday.format(date)}, den ${d}.${m}.${y}`
}

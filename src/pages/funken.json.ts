// Data feed for the "Funken" timeline hero — the modern equivalent of the original
// /funken-xml/ endpoint that fed the Flash header. One spark per published post.
import { getCollection } from 'astro:content'
import { titleText } from '../lib/title'

export async function GET() {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .filter((p) => p.data.permalink)
    .map((p) => ({ t: titleText(p.data.title), u: p.data.permalink, d: p.data.pubDate.getTime() }))
    .sort((a, b) => a.d - b.d)
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  })
}

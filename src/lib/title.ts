// Titles of posts and pages as the old theme printed them: the_title() ran
// wptexturize (see texturize.ts) and WordPress titles may contain inline HTML
// (<del>/<ins> in "Bit<del>s</del>chen Bolzplatz", links in the "Über" title).
import { texturizeTitle } from './texturize'

const NAMED: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00A0',
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

const INLINE_TAGS = new Set(['del', 'ins', 'em', 'strong'])

const escapeText = (s: string) =>
  s
    .replace(/&(?!#?\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
const escapeAttr = (s: string) => escapeText(s).replace(/"/g, '&quot;')

function attribute(tag: string, name: string): string | undefined {
  const match = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag)
  return match ? (match[1] ?? match[2]) : undefined
}

function renderTag(tag: string, links: boolean): string {
  const match = /^<(\/?)([a-z][a-z0-9]*)\b[^>]*>$/i.exec(tag)
  // Not a tag at all ("< Pop >"): it is text.
  if (!match) return escapeText(tag)
  const closing = match[1] === '/'
  const name = match[2].toLowerCase()
  if (INLINE_TAGS.has(name)) return closing ? `</${name}>` : `<${name}>`
  if (name === 'a' && links) {
    if (closing) return '</a>'
    const href = attribute(tag, 'href')
    if (!href || !/^(https?:\/\/|\/)/i.test(href)) return '<a>'
    const title = attribute(tag, 'title')
    return `<a href="${escapeAttr(href)}"${title ? ` title="${escapeAttr(title)}"` : ''}>`
  }
  // Anything else is dropped; its text stays.
  return ''
}

/**
 * Title as HTML for headings and lists: texturized, text escaped, only
 * del/ins/em/strong kept (plus links when `links` is set, for headings that are
 * not inside a link themselves).
 */
export function titleHtml(title: string, { links = false }: { links?: boolean } = {}): string {
  return texturizeTitle(title)
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<') && part.endsWith('>') ? renderTag(part, links) : escapeText(part),
    )
    .join('')
}

/** Title as plain text for <title>, link titles, feeds: texturized, no tags, entities decoded. */
export function titleText(title: string): string {
  return decodeEntities(texturizeTitle(title).replace(/<[^>]*>/g, ''))
}

// Build-time sanitizer + light formatter for archived comment content.
// Comments come from the site's own (approved) WordPress data, but we still strip
// active content and dangerous attributes before baking them into static HTML.
export function sanitizeComment(input = ''): string {
  let html = input.trim()
  // WordPress applied wpautop on display; reproduce for plain-text comments.
  const hasBlock = /<(p|div|blockquote|ul|ol|pre|figure)\b/i.test(html)
  if (!hasBlock) {
    html = '<p>' + html.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>'
  }
  html = autolink(html)
  return (
    html
      .replace(/<\/?(script|style|iframe|object|embed|form|input|link|meta)\b[^>]*>/gi, '')
      // An on* attribute follows whitespace, or a quote or slash ending the previous one.
      .replace(/(?:\s|(?<=["'/]))on[a-z]+\s*=\s*"[^"]*"/gi, '')
      .replace(/(?:\s|(?<=["'/]))on[a-z]+\s*=\s*'[^']*'/gi, '')
      .replace(/(?:\s|(?<=["'/]))on[a-z]+\s*=\s*[^\s>"']+/gi, '')
      .replace(
        /(href|src)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|javascript:[^\s>]*)/gi,
        '$1="#"',
      )
  )
}

// make_clickable(): turn bare URLs in text (outside tags and existing links) into
// links. Like WordPress, "http://..." may follow "(" but "www." URLs only follow
// whitespace; the link text of a "www." URL is the full http:// URL.
const URL_RE = /(^|[\s>(])((?:https?|ftp):\/\/[^\s<>"]+)|(^|[\s>])(www\.[^\s<>"]+\.[^\s<>"]+)/gi

function linkify(text: string): string {
  return text.replace(URL_RE, (_m, pre1?: string, url1?: string, pre2?: string, url2?: string) => {
    const pre = pre1 ?? pre2 ?? ''
    const url = url1 ?? url2 ?? ''
    const trail = url.match(/[.,;:!?)]+$/)?.[0] ?? ''
    const bare = trail ? url.slice(0, -trail.length) : url
    const href = bare.startsWith('www.') ? `http://${bare}` : bare
    return `${pre}<a href="${href}" rel="nofollow ugc">${href}</a>${trail}`
  })
}

function autolink(html: string): string {
  let inLink = 0
  return html
    .split(/(<[^>]*>)/)
    .map((part) => {
      if (part.startsWith('<')) {
        if (/^<a\b/i.test(part)) inLink++
        else if (/^<\/a\s*>/i.test(part)) inLink = Math.max(0, inLink - 1)
        return part
      }
      return inLink ? part : linkify(part)
    })
    .join('')
}

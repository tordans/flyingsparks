// Port of WordPress' wpautop() (WP 6.2, formatting.php). WordPress stores post
// bodies without <p> and <br>: wpautop() turned blank lines into paragraphs and
// single newlines into <br /> when a post was displayed. The archived bodies are
// still the raw WordPress content, so the same function has to run on them
// (Markdown would merge lines, eat `*` and `1.`, and autolink text).

// PCRE's \s is ASCII whitespace only; JS' \s also matches NBSP and friends.
const S = '[ \\t\\n\\r\\f\\v]'

const ALL_BLOCKS =
  '(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)'

// get_html_split_regex(): a comment, a CDATA section or an element.
const COMMENT = '!(?:-(?!->)[^\\-]*)*(?:-->)?'
const CDATA = '!\\[CDATA\\[[^\\]]*(?:\\](?!\\]>)[^\\]]*)*(?:\\]\\]>)?'
const HTML_SPLIT = new RegExp(
  `(<(?:(?=!--|!\\[CDATA\\[)(?:(?=!-)${COMMENT}|(?!!-)${CDATA})|(?!!--|!\\[CDATA\\[)[^>]*>?))`,
)

/** wp_replace_in_html_tags() for a single needle: replace only inside tags and comments. */
function replaceInHtmlTags(haystack: string, needle: string, replacement: string): string {
  const parts = haystack.split(HTML_SPLIT)
  for (let i = 1; i < parts.length; i += 2) {
    if (parts[i].includes(needle)) parts[i] = parts[i].split(needle).join(replacement)
  }
  return parts.join('')
}

const trimNewlines = (s: string) => s.replace(/^\n+|\n+$/g, '')

export function wpautop(input: string, br = true): string {
  if (/^[ \t\n\r\v]*$/.test(input.replaceAll('\u0000', ''))) return ''
  let text = `${input}\n`

  // Pre tags shouldn't be touched by autop: swap them for placeholders.
  const preTags = new Map<string, string>()
  if (text.includes('<pre')) {
    const textParts = text.split('</pre>')
    const lastPart = textParts.pop() as string
    text = ''
    let i = 0
    for (const textPart of textParts) {
      const start = textPart.indexOf('<pre')
      if (start === -1) {
        text += textPart
        continue
      }
      const name = `<pre wp-pre-tag-${i}></pre>`
      preTags.set(name, `${textPart.slice(start)}</pre>`)
      text += textPart.slice(0, start) + name
      i++
    }
    text += lastPart
  }

  // Change multiple <br>s into two line breaks, which will turn into paragraphs.
  text = text.replace(new RegExp(`<br${S}*/?>${S}*<br${S}*/?>`, 'g'), '\n\n')

  // Block-level opening tags get a double line break above, closing tags below.
  text = text.replace(new RegExp(`(<${ALL_BLOCKS}[ \\t\\n\\r\\f\\v/>])`, 'g'), '\n\n$1')
  text = text.replace(new RegExp(`(</${ALL_BLOCKS}>)`, 'g'), '$1\n\n')
  text = text.replace(new RegExp(`(<hr${S}*?/?>)`, 'g'), '$1\n\n')

  text = text.replace(/\r\n|\r/g, '\n')

  // Find newlines in all elements and add placeholders.
  text = replaceInHtmlTags(text, '\n', ' <!-- wpnl --> ')

  // Collapse line breaks before and after <option> elements.
  if (text.includes('<option')) {
    text = text.replace(new RegExp(`${S}*<option`, 'g'), '<option')
    text = text.replace(new RegExp(`</option>${S}*`, 'g'), '</option>')
  }
  // Collapse line breaks inside <object> elements, before <param> and <embed>.
  if (text.includes('</object>')) {
    text = text.replace(new RegExp(`(<object[^>]*>)${S}*`, 'g'), '$1')
    text = text.replace(new RegExp(`${S}*</object>`, 'g'), '</object>')
    text = text.replace(new RegExp(`${S}*(</?(?:param|embed)[^>]*>)${S}*`, 'g'), '$1')
  }
  // Collapse line breaks inside <audio> and <video>, around <source> and <track>.
  if (text.includes('<source') || text.includes('<track')) {
    text = text.replace(new RegExp(`([<\\[](?:audio|video)[^>\\]]*[>\\]])${S}*`, 'g'), '$1')
    text = text.replace(new RegExp(`${S}*([<\\[]/(?:audio|video)[>\\]])`, 'g'), '$1')
    text = text.replace(new RegExp(`${S}*(<(?:source|track)[^>]*>)${S}*`, 'g'), '$1')
  }
  // Collapse line breaks before and after <figcaption>.
  if (text.includes('<figcaption')) {
    text = text.replace(new RegExp(`${S}*(<figcaption[^>]*>)`, 'g'), '$1')
    text = text.replace(new RegExp(`</figcaption>${S}*`, 'g'), '</figcaption>')
  }

  // Normalize multiple line breaks, then split into paragraphs.
  text = text.replace(/\n\n+/g, '\n\n')
  const paragraphs = text.split(new RegExp(`\\n${S}*\\n`)).filter((p) => p !== '')
  text = ''
  for (const paragraph of paragraphs) text += `<p>${trimNewlines(paragraph)}</p>\n`

  // Remove empty paragraphs, then <p> around block-level tags.
  text = text.replace(new RegExp(`<p>${S}*</p>`, 'g'), '')
  text = text.replace(/<p>([^<]+)<\/(div|address|form)>/g, '<p>$1</p></$2>')
  text = text.replace(new RegExp(`<p>${S}*(</?${ALL_BLOCKS}[^>]*>)${S}*</p>`, 'g'), '$1')
  text = text.replace(/<p>(<li.+?)<\/p>/g, '$1')
  text = text.replace(/<p><blockquote([^>]*)>/gi, '<blockquote$1><p>')
  text = text.split('</blockquote></p>').join('</p></blockquote>')
  text = text.replace(new RegExp(`<p>${S}*(</?${ALL_BLOCKS}[^>]*>)`, 'g'), '$1')
  text = text.replace(new RegExp(`(</?${ALL_BLOCKS}[^>]*>)${S}*</p>`, 'g'), '$1')

  if (br) {
    // Newlines inside script/style/svg/math stay as they are.
    text = text.replace(/<(script|style|svg|math)[\s\S]*?<\/\1>/g, (m) =>
      m.split('\n').join('<WPPreserveNewline />'),
    )
    text = text.split('<br>').join('<br />').split('<br/>').join('<br />')
    text = text.replace(new RegExp(`(?<!<br />)${S}*\\n`, 'g'), '<br />\n')
    text = text.split('<WPPreserveNewline />').join('\n')
  }

  text = text.replace(new RegExp(`(</?${ALL_BLOCKS}[^>]*>)${S}*<br />`, 'g'), '$1')
  text = text.replace(
    new RegExp(`<br />(${S}*</?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)`, 'g'),
    '$1',
  )
  text = text.replace(/\n<\/p>(?=\n?$)/, '</p>')

  for (const [name, original] of preTags) text = text.split(name).join(original)
  if (text.includes('<!-- wpnl -->')) {
    text = text.split(' <!-- wpnl --> ').join('\n').split('<!-- wpnl -->').join('\n')
  }
  return text
}

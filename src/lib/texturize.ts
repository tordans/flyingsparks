// Port of WordPress' wptexturize() (WP 6.2, formatting.php) plus the two things
// the old blog stacked on top of it:
//
//   - capital_P_dangit(): "Wordpress" -> "WordPress"
//   - the "Unfancy Quote" plugin (runs after wptexturize): every curly quote
//     that is not an *opening* quote becomes a plain ASCII quote. Result in the
//     German locale: „opening“ quotes stay (U+201E „, U+201A ‚), closing quotes,
//     apostrophes and primes are plain " and '.
//
// The old theme ran this on post/page titles, post bodies and comment text.
// `texturizeHtml` mirrors that: it takes an HTML string, leaves tags, comments
// and the content of pre/code/kbd/style/script/tt alone and texturizes the text
// in between. Entities already in the text (&quot;, &amp;, &nbsp;) are left as
// they are, exactly like WordPress does.
//
// The German translation (de_DE) matters: opening quote „, closing “, opening
// single ‚, closing single ‘ and a cockney list of just 'n and 's.

// The de_DE values, spelled as numeric entities like PHP does. They stay
// entities until the very end so that text which already contains the literal
// characters (“ ’ ...) is not confused with what this function produced.
const OPENING_QUOTE = '&#8222;'
const CLOSING_QUOTE = '&#8220;'
const APOS = '&#8217;'
const PRIME = '&#8242;'
const DOUBLE_PRIME = '&#8243;'
const OPENING_SINGLE = '&#8218;'
const CLOSING_SINGLE = '&#8216;'
const EN_DASH = '&#8211;'
const EM_DASH = '&#8212;'

const OPEN_Q_FLAG = '<!--oq-->'
const OPEN_SQ_FLAG = '<!--osq-->'
const APOS_FLAG = '<!--apos-->'
const PRIME_OR_QUOTE_FLAG = '<!--wp-prime-or-quote-->'

// wp_spaces_regexp()
const SPACES = '[\\r\\n\\t \\u00A0]|&nbsp;'
// PCRE \A, \Z (end or before the final newline)
const START = '(?<![\\s\\S])'
const END = '(?=\\n?(?![\\s\\S]))'

const NO_TEXTURIZE_TAGS = ['pre', 'code', 'kbd', 'style', 'script', 'tt']

const STATIC_CHARACTERS: Array<[string, string]> = [
  ['...', '&#8230;'],
  ['``', OPENING_QUOTE],
  ["''", CLOSING_QUOTE],
  [' (tm)', ' &#8482;'],
  // de_DE cockney list
  ["'n", `${APOS}n`],
  ["'s", `${APOS}s`],
]

const APOS_PATTERNS: Array<[RegExp, string]> = [
  // '99' and '99" are ambiguous among other patterns; assume an abbreviated year at the end of a quotation.
  [
    new RegExp(`'(\\d\\d)'(?=${END}|[.,:;!?)}\\-\\]]|&gt;|${SPACES})`, 'g'),
    `${APOS_FLAG}$1${CLOSING_SINGLE}`,
  ],
  [
    new RegExp(`'(\\d\\d)"(?=${END}|[.,:;!?)}\\-\\]]|&gt;|${SPACES})`, 'g'),
    `${APOS_FLAG}$1${CLOSING_QUOTE}`,
  ],
  // '99 '99s '99's (apostrophe)  But never '9 or '99% or '999 or '99.0.
  [new RegExp(`'(?=\\d\\d(?:${END}|(?![%\\d]|[.,]\\d)))`, 'g'), APOS_FLAG],
  // Quoted numbers like '0.42'.
  [new RegExp(`(?<=${START}|${SPACES})'(\\d[.,\\d]*)'`, 'g'), `${OPEN_SQ_FLAG}$1${CLOSING_SINGLE}`],
  // Single quote at start, or preceded by (, {, <, [, ", -, or spaces.
  [new RegExp(`(?<=${START}|[(\\[{"\\-]|&lt;|${SPACES})'`, 'g'), OPEN_SQ_FLAG],
  // Apostrophe in a word. No spaces, double apostrophes, or other punctuation.
  [new RegExp(`(?<!${SPACES})'(?!${END}|[.,:;!?"'(){}[\\]\\-]|&[lg]t;|${SPACES})`, 'g'), APOS_FLAG],
]

const QUOTE_PATTERNS: Array<[RegExp, string]> = [
  // Quoted numbers like "42".
  [new RegExp(`(?<=${START}|${SPACES})"(\\d[.,\\d]*)"`, 'g'), `${OPEN_Q_FLAG}$1${CLOSING_QUOTE}`],
  // Double quote at start, or preceded by (, {, <, [, -, or spaces, and not followed by spaces.
  [new RegExp(`(?<=${START}|[(\\[{\\-]|&lt;|${SPACES})"(?!${SPACES})`, 'g'), OPEN_Q_FLAG],
]

const DASH_PATTERNS: Array<[RegExp, string]> = [
  [/---/g, EM_DASH],
  [new RegExp(`(?<=^|${SPACES})--(?=$|${SPACES})`, 'g'), EM_DASH],
  [/(?<!xn)--/g, EN_DASH],
  [new RegExp(`(?<=^|${SPACES})-(?=$|${SPACES})`, 'g'), EN_DASH],
]

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\/-]/g, '\\$&')
const countOf = (s: string, needle: string) => s.split(needle).length - 1

/** Replace all matches and report how many there were (preg_replace's $count). */
function replaceCounting(
  s: string,
  re: RegExp,
  replacement: string,
): { result: string; count: number } {
  let count = 0
  const result = s.replace(re, (...args) => {
    count++
    const groups = args.slice(1, -2) as string[]
    return replacement.replace(/\$(\d)/g, (_, n: string) => groups[Number(n) - 1] ?? '')
  })
  return { result, count }
}

function texturizePrimes(
  haystack: string,
  needle: string,
  prime: string,
  openQuote: string,
  closeQuote: string,
): string {
  const quotePattern = new RegExp(
    `${escapeRegExp(needle)}(?=${END}|[.,:;!?)}\\-\\]]|&gt;|${SPACES})`,
    'g',
  )
  const primePattern = new RegExp(`(?<=\\d)${escapeRegExp(needle)}`, 'g')
  const flag = escapeRegExp(PRIME_OR_QUOTE_FLAG)
  const flagAfterDigit = new RegExp(`(?<=\\d)${flag}`, 'g')
  const flagNoDigit = new RegExp(`(?<!\\d)${flag}`, 'g')

  const sentences = haystack.split(openQuote)
  for (let key = 0; key < sentences.length; key++) {
    let sentence = sentences[key]
    if (!sentence.includes(needle)) continue
    if (key !== 0 && countOf(sentence, closeQuote) === 0) {
      const first = replaceCounting(sentence, quotePattern, PRIME_OR_QUOTE_FLAG)
      sentence = first.result
      if (first.count > 1) {
        // Several closing-quote candidates. Attempt Vulcan logic.
        const second = replaceCounting(sentence, flagNoDigit, closeQuote)
        sentence = second.result
        if (second.count === 0) {
          // Try looking for a quote followed by a period; else the rightmost candidate.
          const withPeriod = `${PRIME_OR_QUOTE_FLAG}.`
          const pos =
            countOf(sentence, withPeriod) > 0
              ? sentence.lastIndexOf(withPeriod)
              : sentence.lastIndexOf(PRIME_OR_QUOTE_FLAG)
          sentence =
            sentence.slice(0, pos) + closeQuote + sentence.slice(pos + PRIME_OR_QUOTE_FLAG.length)
        }
        // Conventional replacement on any remaining primes and quotes.
        sentence = sentence.replace(primePattern, prime)
        sentence = sentence.replace(flagAfterDigit, prime)
        sentence = sentence.split(PRIME_OR_QUOTE_FLAG).join(closeQuote)
      } else if (first.count === 1) {
        // Only one closing-quote candidate: it takes priority over primes.
        sentence = sentence.split(PRIME_OR_QUOTE_FLAG).join(closeQuote)
        sentence = sentence.replace(primePattern, prime)
      } else {
        sentence = sentence.replace(primePattern, prime)
      }
    } else {
      sentence = sentence.replace(primePattern, prime)
      sentence = sentence.replace(quotePattern, closeQuote)
    }
    if (needle === '"' && sentence.includes('"')) {
      sentence = sentence.split('"').join(closeQuote)
    }
    sentences[key] = sentence
  }
  return sentences.join(openQuote)
}

function applyAll(s: string, patterns: Array<[RegExp, string]>): string {
  for (const [re, replacement] of patterns) s = s.replace(re, replacement)
  return s
}

/** wptexturize() of one run of text (no tags in it). */
function texturizeText(text: string): string {
  for (const [from, to] of STATIC_CHARACTERS) text = text.split(from).join(to)

  if (text.includes("'")) {
    text = applyAll(text, APOS_PATTERNS)
    text = texturizePrimes(text, "'", PRIME, OPEN_SQ_FLAG, CLOSING_SINGLE)
    text = text.split(APOS_FLAG).join(APOS)
    text = text.split(OPEN_SQ_FLAG).join(OPENING_SINGLE)
  }
  if (text.includes('"')) {
    text = applyAll(text, QUOTE_PATTERNS)
    text = texturizePrimes(text, '"', DOUBLE_PRIME, OPEN_Q_FLAG, CLOSING_QUOTE)
    text = text.split(OPEN_Q_FLAG).join(OPENING_QUOTE)
  }
  if (text.includes('-')) {
    text = applyAll(text, DASH_PATTERNS)
  }
  // 9x9 (times), but never 0x9999.
  if (/(?<=\d)x\d/.test(text)) {
    text = text.replace(/\b(\d(?:(?<=0)[\d.,]+|(?<!0)[\d.,]*))x(\d[\d.,]*)\b/g, '$1&#215;$2')
  }
  return text
}

// _get_wptexturize_split_regex(): an HTML comment or an element (up to the next
// ">"; if there is none, up to the end of the input).
const HTML_SPLIT = /(<(?:(?=!--)!(?:-(?!->)[^-]*)*(?:-->)?|(?!!--)[^>]*>?))/

/** PHP substr($s, $offset, $length) for a negative $length. */
const phpSubstr = (s: string, offset: number, length: number) =>
  length < 0 ? s.slice(offset, s.length + length) : s.slice(offset, offset + length)

/** _wptexturize_pushpop_element() */
function pushPopElement(element: string, stack: string[]) {
  let nameOffset: number
  if (element.length > 1 && element[1] !== '/') {
    nameOffset = 1
  } else if (stack.length === 0) {
    return
  } else {
    nameOffset = 2
  }
  const space = element.indexOf(' ')
  const tag = phpSubstr(element, nameOffset, space === -1 ? -1 : space - nameOffset)
  if (!NO_TEXTURIZE_TAGS.includes(tag)) return
  if (nameOffset === 1) stack.push(tag)
  else if (stack[stack.length - 1] === tag) stack.pop()
}

/** capital_P_dangit() in its "content" flavour (also fine for titles, see below). */
function capitalPDangit(text: string): string {
  return text
    .split(' Wordpress')
    .join(' WordPress')
    .split('&#8216;Wordpress')
    .join('&#8216;WordPress')
    .split(`${OPENING_QUOTE}Wordpress`)
    .join(`${OPENING_QUOTE}WordPress`)
    .split('>Wordpress')
    .join('>WordPress')
    .split('(Wordpress')
    .join('(WordPress')
}

// The "Unfancy Quote" plugin: &#8216; &#8217; &#8242; -> ', &#8220; &#8221; &#8243; -> ".
function unfancyQuotes(text: string): string {
  return text.replace(/&#8216;|&#8217;|&#8242;/g, "'").replace(/&#8220;|&#8221;|&#8243;/g, '"')
}

const FINAL_ENTITIES: Record<string, string> = {
  '&#8222;': '„',
  '&#8218;': '‚',
  '&#8211;': '–',
  '&#8212;': '—',
  '&#8230;': '…',
  '&#8482;': '™',
  '&#215;': '×',
}

function finish(text: string): string {
  return unfancyQuotes(text).replace(
    /&#(?:8222|8218|8211|8212|8230|8482|215);/g,
    (m) => FINAL_ENTITIES[m],
  )
}

/**
 * wptexturize() + capital_P_dangit() + Unfancy Quote for an HTML fragment (a
 * post body, a comment, a title). Tags, comments and the content of
 * pre/code/kbd/style/script/tt are left alone.
 */
export function texturizeHtml(html: string): string {
  if (!html) return html
  const stack: string[] = []
  const parts = html.split(HTML_SPLIT).map((part) => {
    if (part === '') return part
    if (part[0] === '<') {
      if (!part.startsWith('<!--')) pushPopElement(part, stack)
      return part
    }
    if (part.trim() === '' || stack.length > 0) return part
    return texturizeText(part)
  })
  // capital_P_dangit() sees the whole string. The Unfancy Quote filters only touch
  // text: an entity inside an attribute (title="&#8220;") must stay an entity.
  return capitalPDangit(parts.join(''))
    .split(HTML_SPLIT)
    .map((part) => (part.startsWith('<') ? part : finish(part)))
    .join('')
}

/**
 * The part of this for titles: the_title() ran wptexturize, capital_P_dangit
 * (plain replace of "Wordpress") and the Unfancy Quote plugin. Titles may
 * contain inline tags (<del>, <ins>, links), which are left alone.
 */
export function texturizeTitle(title: string): string {
  return texturizeHtml(title).replace(/Wordpress/g, 'WordPress')
}

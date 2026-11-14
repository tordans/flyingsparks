import { describe, expect, it } from 'vitest'
import { texturizeHtml, texturizeTitle } from './texturize'

// Expected values were produced by the real WordPress 6.2 (de_DE, with the
// "Unfancy Quote" plugin) of the old blog: wptexturize() + capital_P_dangit() +
// strip_fancy_quotes() on the input.
const golden: Array<[string, string]> = [
  [
    'Man setzt "www.de.meinedomain.de" und "www.en.meinedomain.de".',
    'Man setzt „www.de.meinedomain.de" und „www.en.meinedomain.de".',
  ],
  [
    '<p>"Quote after tag" and <em>"inside"</em></p>',
    '<p>„Quote after tag" and <em>„inside"</em></p>',
  ],
  ['<a href="x">"q"</a> "after"', '<a href="x">„q"</a> „after"'],
  ["don't, it's, Bunny's, rock 'n' roll", "don't, it's, Bunny's, rock 'n' roll"],
  ["the '80s and '99 and the 5' 6\" man", "the '80s and '99 and the 5' 6\" man"],
  ["'single' and 'x' and ('paren')", "'single' and ‚x' and (‚paren')"],
  [
    'see http://example.com/a--b -- and a --- b ... fin',
    'see http://example.com/a–b — and a — b … fin',
  ],
  ['Template -- alles, 2x3, 0x5, 10x20 und 3 x 4', 'Template — alles, 2×3, 0x5, 10×20 und 3 x 4'],
  [
    '- Lang-Switch<br />\n- zweite Zeile - mit Gedankenstrich',
    '– Lang-Switch<br />\n– zweite Zeile – mit Gedankenstrich',
  ],
  [
    '<code>"no" -- \'texturize\' ...</code> but "yes" -- here',
    '<code>"no" -- \'texturize\' ...</code> but „yes" — here',
  ],
  ['<pre class="c">"a" -- b</pre>"outside"', '<pre class="c">"a" -- b</pre>„outside"'],
  [
    '<a href="http://x.de/?a=\\"b\\"" title="it\'s">it\'s</a>',
    '<a href="http://x.de/?a=\\"b\\"" title="it\'s">it\'s</a>',
  ],
  [
    'Wordpress, (Wordpress), "Wordpress" und >Wordpress',
    'Wordpress, (WordPress), „WordPress" und >WordPress',
  ],
  ['nested "outer \'inner\' quote" end', 'nested „outer ‚inner\' quote" end'],
  ["\"42\" und '0.5' und 'tis the season", '„42" und ‚0.5\' und ‚tis the season'],
  ["Preis: 5\" Display, 12' Länge, 'foo", 'Preis: 5" Display, 12\' Länge, ‚foo'],
  ["``backticks'' und (tm) (tm)", '„backticks" und ™ ™'],
  ['x --> y <!-- "no" --> "yes"', 'x –> y <!-- "no" --> „yes"'],
  ['&quot;entity&quot; und &amp; und &#8217;', "&quot;entity&quot; und &amp; und '"],
  ['Zitat: "Satz eins." Und "Satz zwei".', 'Zitat: „Satz eins." Und „Satz zwei".'],
  ['<ins>"a"</ins>"b"<del>\'c\'</del>', '<ins>„a"</ins>„b"<del>‚c\'</del>'],
  ['a "b" " c"', 'a „b" " c"'],
  ['Hallo "Welt', 'Hallo „Welt'],
  ['3 < 4 and "x" > 2', '3 < 4 and "x" > 2'],
  ["1990's, 2000's, 'Tag's' und 9'er", "1990's, 2000's, ‚Tag's' und 9'er"],
]

describe('texturizeHtml against WordPress output', () => {
  it.each(golden)('%j', (input, expected) => {
    expect(texturizeHtml(input)).toBe(expected)
  })
})

describe('texturizeHtml details', () => {
  it('opens German quotes after a tag and after a space, closes with a plain quote', () => {
    expect(texturizeHtml('<p>"a" <b>"b"</b></p>')).toBe('<p>\u201Ea" <b>\u201Eb"</b></p>')
  })
  it('keeps apostrophes plain', () => {
    expect(texturizeHtml("don't, it's, the '80s")).toBe("don't, it's, the '80s")
  })
  it('leaves URLs in attributes alone and texturizes link text', () => {
    expect(texturizeHtml('<a href="http://x.de/a--b" title="it\'s">a--b</a>')).toBe(
      '<a href="http://x.de/a--b" title="it\'s">a\u2013b</a>',
    )
  })
  it('handles --, --- and ...', () => {
    expect(texturizeHtml('a -- b --- c ... d')).toBe('a \u2014 b \u2014 c \u2026 d')
  })
  it('turns digit x digit into a multiplication sign, but not 0x5', () => {
    expect(texturizeHtml('2x3 0x5')).toBe('2\u00D73 0x5')
  })
  it('skips the content of pre, code, kbd, script, style and tt', () => {
    for (const tag of ['pre', 'code', 'kbd', 'script', 'style', 'tt']) {
      const html = `<${tag}>"a" -- b...</${tag}> "c"`
      expect(texturizeHtml(html)).toBe(`<${tag}>"a" -- b...</${tag}> \u201Ec"`)
    }
  })
  it('does not touch entities or comments', () => {
    expect(texturizeHtml('&quot;x&quot; <!-- "y" -->')).toBe('&quot;x&quot; <!-- "y" -->')
  })
  it('leaves entity quotes inside tags alone, so they cannot close an attribute', () => {
    const tags = [
      '<a title="&#8220;" href=javascript:alert(1)//&#8220;>x</a>',
      '<img alt="&#8220;/onerror=alert(1)//&#8220;" src="x">',
      '<a title="&#8243;" href="/x">y</a>',
    ]
    for (const html of tags) expect(texturizeHtml(html)).toBe(html)
  })
  it('still turns entity quotes in text into plain quotes', () => {
    expect(texturizeHtml('<a title="&#8220;">&#8220;x&#8221;</a>')).toBe(
      '<a title="&#8220;">"x"</a>',
    )
  })
  it('is a no-op for empty input and plain words', () => {
    expect(texturizeHtml('')).toBe('')
    expect(texturizeHtml('Hallo Welt')).toBe('Hallo Welt')
  })
})

describe('texturizeTitle', () => {
  it('texturizes quotes and fixes Wordpress', () => {
    expect(texturizeTitle('"Simplicity is dead"')).toBe('\u201ESimplicity is dead"')
    expect(texturizeTitle('Wordpress mehrsprachig')).toBe('WordPress mehrsprachig')
  })
  it('keeps inline tags', () => {
    expect(texturizeTitle('Tampondruck<del>?</del><ins>!</ins>')).toBe(
      'Tampondruck<del>?</del><ins>!</ins>',
    )
  })
})

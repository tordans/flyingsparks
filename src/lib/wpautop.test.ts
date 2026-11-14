import { describe, expect, it } from 'vitest'
import { wpautop } from './wpautop'

// Expected values were produced by wpautop() of the WordPress 6.2 of the old blog.
const golden: Array<[string, string]> = [
  [
    'Erste Zeile\nzweite Zeile\n\nNeuer Absatz',
    '<p>Erste Zeile<br />\nzweite Zeile</p>\n<p>Neuer Absatz</p>\n',
  ],
  [
    '<div style="float: right;"><a href="x"><img src="a.jpg" alt="" /></a>\n\n<span>Bildunterschrift</span>\n</div>\nText danach\n\nMehr',
    '<div style="float: right;"><a href="x"><img src="a.jpg" alt="" /></a></p>\n<p><span>Bildunterschrift</span>\n</div>\n<p>Text danach</p>\n<p>Mehr</p>\n',
  ],
  [
    '<p>Schon ein Absatz</p>\n<p>Noch einer<br />\nmit Umbruch</p>',
    '<p>Schon ein Absatz</p>\n<p>Noch einer<br />\nmit Umbruch</p>\n',
  ],
  [
    'Vorher\n<blockquote>\nZitat Zeile 1\nZeile 2\n</blockquote>\nNachher',
    '<p>Vorher</p>\n<blockquote><p>\nZitat Zeile 1<br />\nZeile 2\n</p></blockquote>\n<p>Nachher</p>\n',
  ],
  [
    '<ul>\n<li>Eins</li>\n<li>Zwei</li>\n</ul>\n\nText',
    '<ul>\n<li>Eins</li>\n<li>Zwei</li>\n</ul>\n<p>Text</p>\n',
  ],
  [
    'Code:\n<pre>\nzeile 1\n\nzeile 3\n</pre>\nEnde',
    '<p>Code:</p>\n<pre>\nzeile 1\n\nzeile 3\n</pre>\n<p>Ende</p>\n',
  ],
  [
    '- Punkt eins\n- Punkt zwei\n1. nummeriert\n* stern',
    '<p>- Punkt eins<br />\n- Punkt zwei<br />\n1. nummeriert<br />\n* stern</p>\n',
  ],
  [
    '<h3>Titel</h3>\nText unter dem Titel\n<hr />\nnach hr',
    '<h3>Titel</h3>\n<p>Text unter dem Titel</p>\n<hr />\n<p>nach hr</p>\n',
  ],
  ['Zeile<br><br>Absatz nach doppeltem br', '<p>Zeile</p>\n<p>Absatz nach doppeltem br</p>\n'],
  [
    '<script>\nvar a = 1;\n\nvar b = 2;\n</script>\nText',
    '<p><script>\nvar a = 1;</p>\n<p>var b = 2;\n</script><br />\nText</p>\n',
  ],
  [
    '<a href="http://x.de/\n?a=b">link</a> text\nnoch Text',
    '<p><a href="http://x.de/\n?a=b">link</a> text<br />\nnoch Text</p>\n',
  ],
  ['', ''],
  ['   \n', ''],
]

describe('wpautop against WordPress output', () => {
  it.each(golden)('%j', (input, expected) => {
    expect(wpautop(input)).toBe(expected)
  })
})

describe('wpautop details', () => {
  it('turns single newlines into <br /> and blank lines into paragraphs', () => {
    expect(wpautop('a\nb\n\nc')).toBe('<p>a<br />\nb</p>\n<p>c</p>\n')
  })
  it('does not break pre blocks', () => {
    expect(wpautop('<pre>\na\n\nb\n</pre>')).toContain('<pre>\na\n\nb\n</pre>')
  })
})

import { describe, expect, it } from 'vitest'
import { titleHtml, titleText } from './title'

describe('titleHtml', () => {
  it('keeps del/ins/em/strong and drops their attributes', () => {
    expect(titleHtml('Tampondruck<del>?</del><ins datetime="2005">!</ins>')).toBe(
      'Tampondruck<del>?</del><ins>!</ins>',
    )
    expect(titleHtml('a <em>b</em> <strong>c</strong>')).toBe('a <em>b</em> <strong>c</strong>')
  })
  it('drops every other tag but keeps its text', () => {
    expect(titleHtml('x<script>alert(1)</script>y<img src="a" onerror="b">')).toBe('xalert(1)y')
  })
  it('escapes stray angle brackets and ampersands', () => {
    expect(titleHtml('Quarks&Co a < b')).toBe('Quarks&amp;Co a &lt; b')
    expect(titleHtml('Quarks&amp;Co')).toBe('Quarks&amp;Co')
  })
  it('keeps a "<" or ">" that does not start a tag as text', () => {
    expect(titleHtml('Rock < Pop > Jazz')).toBe('Rock &lt; Pop &gt; Jazz')
  })
  it('texturizes quotes and dashes', () => {
    expect(titleHtml('"Das alles..." - Mediamarkt')).toBe('„Das alles…" – Mediamarkt')
  })
  it('allows links only on request, and only http(s) or site-relative ones', () => {
    const title =
      '<a title="speak" href="http://www.m-w.com/a?b=c">flI-i[ng]</a> <a href="javascript:x">y</a>'
    expect(titleHtml(title)).toBe('flI-i[ng] y')
    expect(titleHtml(title, { links: true })).toBe(
      '<a href="http://www.m-w.com/a?b=c" title="speak">flI-i[ng]</a> <a>y</a>',
    )
  })
})

describe('titleText', () => {
  it('strips tags and decodes entities', () => {
    expect(titleText('Bit<del>s</del>chen &amp; mehr')).toBe('Bitschen & mehr')
  })
})

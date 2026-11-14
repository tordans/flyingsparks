import { describe, expect, test } from 'vitest'
import { sanitizeComment } from './sanitize'

describe('sanitizeComment', () => {
  test('wraps plain text and turns newlines into paragraphs and breaks', () => {
    expect(sanitizeComment('hello\nworld')).toBe('<p>hello<br>world</p>')
    expect(sanitizeComment('a\n\nb')).toBe('<p>a</p><p>b</p>')
  })

  test('strips active tags, event handlers, and javascript URLs', () => {
    expect(sanitizeComment('<p>ok<script>alert(1)</script></p>')).toBe('<p>okalert(1)</p>')
    expect(sanitizeComment('<p onclick="alert(1)">x</p>')).toBe('<p>x</p>')
    expect(sanitizeComment('<p><a href="javascript:alert(1)">x</a></p>')).toBe(
      '<p><a href="#">x</a></p>',
    )
  })

  test('links bare URLs like make_clickable, leaving existing links alone', () => {
    expect(sanitizeComment('see http://example.org/a. and www.example.com')).toBe(
      '<p>see <a href="http://example.org/a" rel="nofollow">http://example.org/a</a>. and <a href="http://www.example.com" rel="nofollow">www.example.com</a></p>',
    )
    expect(sanitizeComment('<p><a href="http://x.org">http://x.org</a></p>')).toBe(
      '<p><a href="http://x.org">http://x.org</a></p>',
    )
  })
})

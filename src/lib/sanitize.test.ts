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
})

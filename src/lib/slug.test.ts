import { describe, expect, test } from 'vitest'
import { tagSlug } from './slug'

describe('tagSlug', () => {
  test('transliterates German umlauts and ß', () => {
    expect(tagSlug('Äpfel Öl Übergröße')).toBe('aepfel-oel-uebergroesse')
  })

  test('collapses punctuation and trims hyphens', () => {
    expect(tagSlug('Hello, World!')).toBe('hello-world')
  })

  test('falls back to tag when empty', () => {
    expect(tagSlug('')).toBe('tag')
    expect(tagSlug('---')).toBe('tag')
  })
})

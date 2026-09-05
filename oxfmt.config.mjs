import { defineConfig } from 'oxfmt'

// ignorePatterns: keep in sync with oxlint.config.mjs.
// No Tailwind in this archive — omit sortTailwindcss.
export default defineConfig({
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  semi: false,
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  sortImports: {
    newlinesBetween: false,
  },
  sortPackageJson: true,
  ignorePatterns: [
    '.agents/**',
    '.cursor/**',
    'dist/**',
    '.astro/**',
    'public/**',
    'src/content/**',
    'src/data/**',
    'src/styles/**',
    '_migration/*.json',
    '_migration/**/*.json',
    '_migration/archive/**',
    '_migration/layout-reference/**',
  ],
})

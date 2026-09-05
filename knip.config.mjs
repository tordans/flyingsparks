/** @type {import('knip').KnipConfig} */
// Verify scripts (@see references/package-json-scripts.md):
//   "knip": "KNIP_STRICT=1 knip --config knip.config.mjs",
//   "knip-warn": "knip --config knip.config.mjs || true",
//   "check": "bun run --parallel type-check lint format test-run knip-warn",
//   "check-pre-push": "bun run --parallel type-check lint format test-run knip",
const strict = process.env.KNIP_STRICT === '1'

export default {
  // Trace from here — Astro pages/layouts/components plus migration scripts
  entry: [
    'astro.config.mjs',
    'src/content.config.ts',
    'src/pages/**/*.{astro,ts,js}',
    'src/layouts/**/*.astro',
    'src/components/**/*.astro',
    'src/**/*.test.ts',
    '_migration/scripts/**/*.mjs',
  ],
  ignore: [
    '.agents/**',
    'src/content/**',
    'src/data/**',
    'public/**',
    'dist/**',
    '.astro/**',
    '_migration/**/*.json',
    '_migration/archive/**',
    '_migration/layout-reference/**',
  ],
  // html lang is still hardcoded; wiring SITE_LANG would touch dirty layout files.
  ignoreIssues: {
    'src/consts.ts': ['exports'],
  },
  rules: {
    files: 'error',
    dependencies: 'error',
    devDependencies: 'error',
    unlisted: 'error',
    binaries: 'error',
    exports: strict ? 'error' : 'warn',
    types: strict ? 'error' : 'warn',
    enumMembers: strict ? 'error' : 'warn',
    duplicates: 'warn',
  },
}

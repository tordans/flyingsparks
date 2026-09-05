import { defineConfig } from 'oxlint'

// ignorePatterns: keep in sync with oxfmt.config.mjs.
export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc'],
  options: { typeAware: true },
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
  rules: {
    'typescript/switch-exhaustiveness-check': 'error',
    // Allow bare `_` (oxlint default ignores `_foo` but not `_`); object config clears defaults
    'eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // Type-aware rules that are noisy in FMC apps — keep off unless you tighten deliberately.
    // 'typescript/no-floating-promises': 'off',
    // 'typescript/no-duplicate-type-constituents': 'off',
    // 'typescript/no-redundant-type-constituents': 'off',
    // 'typescript/restrict-template-expressions': 'off',
    // 'typescript/no-base-to-string': 'off',
    // 'typescript/await-thenable': 'off',
    // 'typescript/unbound-method': 'off',
    // 'typescript/no-meaningless-void-operator': 'off',
    // 'typescript/no-useless-default-assignment': 'off',
    // 'typescript/no-misused-spread': 'off',
    // 'typescript/require-array-sort-compare': 'off',
    // 'typescript/no-array-delete': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      rules: {
        'typescript/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['src/components/**', 'src/pages/**', 'src/layouts/**'],
      jsPlugins: [{ name: 'compat', specifier: 'eslint-plugin-compat' }],
      rules: {
        'compat/compat': 'error',
      },
    },
  ],
})

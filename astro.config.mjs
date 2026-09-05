// @ts-check

import { homedir } from 'node:os'
import { join } from 'node:path'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import browserslistToEsbuild from 'browserslist-to-esbuild'

// https://astro.build/config
export default defineConfig({
  site: 'https://fly.ingsparks.de',
  // WordPress permalinks used trailing slashes (e.g. /2006-04-24/slug/).
  // Keep parity so old links + redirects resolve identically.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  vite: {
    build: {
      target: browserslistToEsbuild(),
    },
    // Extend Vite's default allow list so Bun globalStore symlinks resolve in dev.
    // @see tech-stack references/bun-install.md
    server: {
      fs: {
        allow: ['.', join(homedir(), '.bun/install/cache/links')],
      },
    },
  },
})

// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://fly.ingsparks.de',
	// WordPress permalinks used trailing slashes (e.g. /2006-04-24/slug/).
	// Keep parity so old links + redirects resolve identically.
	trailingSlash: 'always',
	build: { format: 'directory' },
	integrations: [sitemap()],
});

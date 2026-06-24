import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Shared schema for migrated WordPress posts and pages.
const wpSchema = z.object({
	title: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	slug: z.string().optional(),
	wpPostId: z.string().optional(),
	// Original WordPress permalink path, e.g. "/2006-04-24/zeichnen-nicht-reden/".
	permalink: z.string().optional(),
	visibility: z.enum(['public', 'private', 'draft']).default('public'),
	// drafts + private are preserved in the repo but excluded from production builds.
	draft: z.boolean().default(false),
	description: z.string().optional(),
	tags: z.array(z.string()).default([]),
});

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
	schema: wpSchema,
});

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
	schema: wpSchema,
});

export const collections = { posts, pages };

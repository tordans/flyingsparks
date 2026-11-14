// Markdown processor for the archived posts and pages.
//
// The imported bodies are the raw WordPress post content (HTML plus plain text
// with newlines), not Markdown: WordPress added <p>/<br> with wpautop() and
// curly quotes/dashes with wptexturize() when a post was displayed. Running them
// through a Markdown engine merges lines, eats `*` and `1.`, makes lists out of
// "- " and autolinks `www.` text inside <a> elements. So entries that come from
// WordPress (they have a `wpPostId`) are rendered like WordPress did it:
// wptexturize -> wpautop. Everything else (the privacy policy) stays Markdown.
import { satteri } from '@astrojs/markdown-satteri'
import { texturizeHtml } from './texturize'
import { wpautop } from './wpautop'

type Satteri = ReturnType<typeof satteri>

export function wordpressMarkdown(): Satteri {
  const base = satteri()
  return {
    ...base,
    async createRenderer(shared) {
      const markdown = await base.createRenderer(shared)
      return {
        ...markdown,
        async render(content, options) {
          if (!options?.frontmatter?.wpPostId) return markdown.render(content, options)
          return {
            code: wpautop(texturizeHtml(content)),
            metadata: {
              headings: [],
              localImagePaths: [],
              remoteImagePaths: [],
              frontmatter: options.frontmatter,
            },
          }
        },
      }
    },
  }
}

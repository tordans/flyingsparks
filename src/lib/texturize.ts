// The part of WordPress' wptexturize() that mattered for the post titles of the
// old blog (the theme printed them through the_title()). Quotes follow the
// German translation the blog used: opening quotes become „ and ‚, closing
// quotes and apostrophes stay plain ASCII; "Wordpress" becomes "WordPress".
export function texturizeTitle(title: string): string {
  return title
    .replace(/---/g, '—')
    .replace(/ -- /g, ' — ')
    .replace(/--/g, '–')
    .replace(/ - /g, ' – ')
    .replace(/\.\.\./g, '…')
    .replace(/(^|[\s([{])"(?=\S)/g, '$1„')
    .replace(/(^|[\s([{])'(?=\S)/g, '$1‚')
    .replace(/Wordpress/g, 'WordPress')
}

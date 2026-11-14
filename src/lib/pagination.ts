// Port of the up_pagination plugin (view "deImg") of the original theme:
// which page links appear, and with which CSS classes. 2 pages left/right of
// the current one, first and last page are always present.
const OFFSET_LEFT = 2
const OFFSET_RIGHT = 2

export const POSTS_PER_PAGE = 7

export type PageItem =
  | { type: 'dots' }
  | {
      type: 'link' | 'current'
      page: number
      // class names after "seite", e.g. "erste prev"
      classes: string[]
      // "first" | "last" | "prev" | "next": which icon sits next to the number
      icon?: 'first' | 'last' | 'prev' | 'next'
    }

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE))
}

/** pagenum_link: "/", "/page/2/", "/tag/x/page/2/" */
export function pageHref(base: string, page: number): string {
  return page <= 1 ? base : `${base}page/${page}/`
}

export function paginationItems(paged: number, maxPage: number): PageItem[] {
  const items: PageItem[] = []
  const offsetSum = OFFSET_LEFT + OFFSET_RIGHT
  const cur = (
    page: number,
    classes: string[],
    icon?: 'first' | 'last' | 'prev' | 'next',
  ): PageItem => ({ type: 'current', page, classes, icon })
  const link = (
    page: number,
    classes: string[],
    icon?: 'first' | 'last' | 'prev' | 'next',
  ): PageItem => ({ type: 'link', page, classes, icon })

  if (maxPage === 1) {
    // the plugin prints no "erste" class here
    return [cur(1, [], 'first')]
  }
  if (maxPage === 2) {
    return paged === 1
      ? [cur(1, ['erste'], 'first'), link(2, [], 'first')]
      : [link(1, ['erste'], 'first'), cur(2, [], 'first')]
  }

  const innenstart = Math.max(Math.min(paged - OFFSET_LEFT, maxPage - (offsetSum + 2)), 2)
  const innenende = Math.min(Math.max(paged - OFFSET_LEFT, 2) + offsetSum, maxPage - 1)

  if (paged === 1) items.push(cur(1, ['erste'], 'first'))
  else items.push(link(1, paged === 2 ? ['erste', 'prev'] : ['erste'], 'first'))

  if (innenstart > 2) items.push({ type: 'dots' })

  for (let i = innenstart; i <= innenende; i++) {
    if (i === paged - 1) items.push(link(i, ['prev'], 'prev'))
    else if (i === paged + 1) items.push(link(i, ['next'], 'next'))
    else if (i === paged) items.push(cur(i, []))
    else items.push(link(i, []))
  }

  if (innenende + 1 < maxPage) items.push({ type: 'dots' })

  if (paged === maxPage) items.push(cur(maxPage, ['letzte'], 'last'))
  else items.push(link(maxPage, paged + 1 === maxPage ? ['letzte', 'next'] : ['letzte'], 'last'))

  return items
}

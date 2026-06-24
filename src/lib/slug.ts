// WordPress-like slug for tag URLs. Post/page URLs use their exact original
// permalink; tag-page slugs are derived from the display name (best-effort parity
// with the old /tag/<nicename>/ URLs).
export function tagSlug(name: string): string {
	return (
		name
			.toLowerCase()
			.replace(/ä/g, 'ae')
			.replace(/ö/g, 'oe')
			.replace(/ü/g, 'ue')
			.replace(/ß/g, 'ss')
			.normalize('NFKD')
			.replace(/[̀-ͯ]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'tag'
	);
}

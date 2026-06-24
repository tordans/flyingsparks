// Build-time sanitizer + light formatter for archived comment content.
// Comments come from the site's own (approved) WordPress data, but we still strip
// active content and dangerous attributes before baking them into static HTML.
export function sanitizeComment(input = ''): string {
	let html = input.trim();
	// WordPress applied wpautop on display; reproduce for plain-text comments.
	const hasBlock = /<(p|div|blockquote|ul|ol|pre|figure)\b/i.test(html);
	if (!hasBlock) {
		html = '<p>' + html.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
	}
	return html
		.replace(/<\/?(script|style|iframe|object|embed|form|input|link|meta)\b[^>]*>/gi, '')
		.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
		.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
		.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '')
		.replace(/(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, '$1="#"');
}

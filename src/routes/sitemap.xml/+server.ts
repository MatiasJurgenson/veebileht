import type { RequestHandler } from '@sveltejs/kit';
import { SECTION_CONFIG, fetchSectionArticles } from '$lib/api';

function xmlEscape(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export const GET: RequestHandler = async ({ fetch, url }) => {
	const entries = [
		`${url.origin}/`,
		`${url.origin}/fox`,
		`${url.origin}/projects`,
		`${url.origin}/other`
	];

	const articleEntries = await Promise.all(
		(Object.keys(SECTION_CONFIG) as Array<keyof typeof SECTION_CONFIG>).map(async (section) => {
			const articles = await fetchSectionArticles(fetch, section);

			return articles.map((article) => `${url.origin}/${section}/${encodeURIComponent(article.slug)}`);
		})
	);

	const urls = [...entries, ...articleEntries.flat()].map((loc) => `
		<url>
			<loc>${xmlEscape(loc)}</loc>
		</url>`).join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="http://www.w3.org/1999/xhtml"
			xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urls}
		</urlset>`,
		{
			headers: {
				'Content-Type': 'application/xml; charset=utf-8'
			}
		}
	);
};
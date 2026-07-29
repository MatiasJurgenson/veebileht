import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { SECTION_CONFIG, fetchSectionArticles, isSectionSlug } from '$lib/api';

export const load: PageLoad = async ({ fetch, params }) => {
	if (!isSectionSlug(params.section)) {
		throw error(404, 'Section not found');
	}

	const section = params.section;
	const config = SECTION_CONFIG[section];

	return {
		section,
		title: config.title,
		articles: await fetchSectionArticles(fetch, section)
	};
};
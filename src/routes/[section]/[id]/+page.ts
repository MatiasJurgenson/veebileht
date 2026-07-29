import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { fetchSectionArticle, isSectionSlug } from '$lib/api';

export const load: PageLoad = async ({ fetch, params }) => {
	if (!isSectionSlug(params.section)) {
		throw error(404, 'Section not found');
	}

	return {
		section: params.section,
		article: await fetchSectionArticle(fetch, params.section, params.id)
	};
};
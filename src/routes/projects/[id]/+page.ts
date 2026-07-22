import type { PageLoad } from './$types';
import { fetchProjectArticle } from '$lib/project';

export const load: PageLoad = async ({ fetch, params }) => {
	return {
		article: await fetchProjectArticle(fetch, params.id)
	};
};

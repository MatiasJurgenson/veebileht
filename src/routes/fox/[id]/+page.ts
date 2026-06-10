import type { PageLoad } from './$types';
import { fetchFoxArticle } from '$lib/fox';

export const load: PageLoad = async ({ fetch, params }) => {
	return {
		article: await fetchFoxArticle(fetch, params.id)
	};
};
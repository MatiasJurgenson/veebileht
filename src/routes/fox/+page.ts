import type { PageLoad } from './$types';
import { fetchFoxArticles } from '$lib/fox';

export const load: PageLoad = async ({ fetch }) => {
    return {
		articles: await fetchFoxArticles(fetch)
	};
};
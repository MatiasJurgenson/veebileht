import { error } from '@sveltejs/kit';
import { fetchArticles, type Article } from '$lib/api';

export type FoxArticle = Article;

export async function fetchFoxArticles(fetcher: typeof fetch): Promise<FoxArticle[]> {
	const articles = await fetchArticles(fetcher);

	return articles.filter((article) => article.category.slug === 'fox');
}

export async function fetchFoxArticle(fetcher: typeof fetch, id: string): Promise<FoxArticle> {
	const articles = await fetchFoxArticles(fetcher);
	const article = articles.find((entry) => entry.slug === id || String(entry.id) === id);

	if (!article) {
		throw error(404, 'Article not found');
	}

	return article;
}
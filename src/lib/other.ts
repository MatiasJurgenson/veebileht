import { error } from '@sveltejs/kit';
import { fetchArticles, type Article } from '$lib/api';

export type OtherArticle = Article;

export async function fetchOtherArticles(fetcher: typeof fetch): Promise<OtherArticle[]> {
    const articles = await fetchArticles(fetcher);

    return articles.filter((article) => article.category.slug === 'other');
}

export async function fetchOtherArticle(fetcher: typeof fetch, id: string): Promise<OtherArticle> {
    const articles = await fetchOtherArticles(fetcher);
    const article = articles.find((entry) => entry.slug === id || String(entry.id) === id);

    if (!article) {
        throw error(404, 'Article not found');
    }

    return article;
}
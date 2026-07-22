import { error } from '@sveltejs/kit';
import { fetchArticles, type Article } from '$lib/api';

export type ProjectArticle = Article;

export async function fetchProjectArticles(fetcher: typeof fetch): Promise<ProjectArticle[]> {
    const articles = await fetchArticles(fetcher);

    return articles.filter((article) => article.category.slug === 'project');
}

export async function fetchProjectArticle(fetcher: typeof fetch, id: string): Promise<ProjectArticle> {
    const articles = await fetchProjectArticles(fetcher);
    const article = articles.find((entry) => entry.slug === id || String(entry.id) === id);

    if (!article) {
        throw error(404, 'Article not found');
    }

    return article;
}
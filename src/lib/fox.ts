import { error } from '@sveltejs/kit';

export type RichTextText = {
	type: 'text';
	text: string;
};

export type RichTextBlock = {
	type: 'paragraph';
	children: RichTextText[];
};

export type MediaFormat = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};

export type CoverImage = {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	focalPoint: unknown | null;
	width: number;
	height: number;
	formats: {
		thumbnail?: MediaFormat;
		small?: MediaFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: unknown | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type Category = {
	id: number;
	documentId: string;
	name: string;
	slug: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type FoxArticle = {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	text: RichTextBlock[];
	cover: CoverImage;
	category?: Category | null;
};

const FOX_ARTICLES_URL = 'https://cms.matias.ee/api/articles?filters[category][slug][$eq]=fox&populate=*';

export async function fetchFoxArticles(fetcher: typeof fetch): Promise<FoxArticle[]> {
	const res = await fetcher(FOX_ARTICLES_URL);
	const { data } = (await res.json()) as { data: FoxArticle[] };

	return data.filter((article) => article.category?.slug === 'fox');
}

export async function fetchFoxArticle(fetcher: typeof fetch, id: string): Promise<FoxArticle> {
	const articles = await fetchFoxArticles(fetcher);
	const article = articles.find((entry) => entry.slug === id || String(entry.id) === id);

	if (!article) {
		throw error(404, 'Article not found');
	}

	return article;
}
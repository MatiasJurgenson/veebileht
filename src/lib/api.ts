import { error } from '@sveltejs/kit';


// all the Types in the API
export type RichTextText = {
	type: 'text';
	text: string;
};

export type RichTextLink = {
	type: 'link';
	url: string;
	children: RichTextNode[];
	rel: string;
	target: string;
};

export type RichTextNode = RichTextText | RichTextLink;

export type RichTextBlock = {
	type: 'paragraph';
	children: RichTextNode[];
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

export type MediaAsset = {
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
		medium?: MediaFormat;
		large?: MediaFormat;
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

export interface ArticleBase {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	text: RichTextBlock[];
	cover: MediaAsset;
	category: Category;
	media: MediaAsset[] | null;
}

export interface Article extends ArticleBase {
	localizations: ArticleBase[];
}

// all the API functions
export const SECTION_CONFIG = {
	fox: {
		apiSlug: 'fox',
		title: 'Svelte and Strapi Integration'
	},
	other: {
		apiSlug: 'other',
		title: 'Other'
	},
	projects: {
		apiSlug: 'project',
		title: 'Projects'
	}
} as const;


// check if a given section slug is valid
export type SectionSlug = keyof typeof SECTION_CONFIG;

export function isSectionSlug(section: string): section is SectionSlug {
	return section in SECTION_CONFIG;
}

const ARTICLES_URL = 'https://cms.matias.ee/api/articles?populate=*';

// fetch all articles from the API
export async function fetchArticles(fetcher: typeof fetch): Promise<Article[]> {
	const res = await fetcher(ARTICLES_URL);
	const { data } = (await res.json()) as { data: Article[] };

	return data;
}

// fetch a single article by its ID or slug
export async function fetchArticle(fetcher: typeof fetch, id: string, categorySlug?: string): Promise<Article> {
	const articles = await fetchArticles(fetcher);
	const article = articles.find((entry) => {
		const matchesCategory = !categorySlug || entry.category.slug === categorySlug;
		const matchesBaseArticle = entry.slug === id || String(entry.id) === id;
		const matchesLocalization = entry.localizations?.some((localization) => localization.slug === id || String(localization.id) === id);

		return matchesCategory && (matchesBaseArticle || matchesLocalization);
	});

	if (!article) {
		throw error(404, 'Article not found');
	}

	return article;
}

// fetch all articles for a specific section
export async function fetchSectionArticles(fetcher: typeof fetch, section: SectionSlug): Promise<Article[]> {
	return fetchSlugArticles(fetcher, SECTION_CONFIG[section].apiSlug);
}

// fetch a single article for a specific section
export async function fetchSectionArticle(fetcher: typeof fetch, section: SectionSlug, id: string): Promise<Article> {
	return fetchArticle(fetcher, id, SECTION_CONFIG[section].apiSlug);
}

// fetch all articles for a specific slug
export async function fetchSlugArticles(fetcher: typeof fetch, slug: string): Promise<Article[]> {
    const articles = await fetchArticles(fetcher);

    return articles.filter((article) => article.category.slug === slug);
}
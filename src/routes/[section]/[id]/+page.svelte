<script lang="ts">
	import Nav from '../../Nav.svelte';
	import Footer from '../../Footer.svelte';

	import { locale } from '$lib/settings';
	import type { Article, RichTextNode } from '$lib/api';

	let { data }: { data: { section: string; article: Article } } = $props();

	// escape HTML special characters
	function escapeHtml(text: string): string {
		return text
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#39;');
	}

	// recursively render rich text nodes to HTML
	function renderNode(node: RichTextNode): string {
		if (node.type === 'text') {
			return escapeHtml(node.text);
		}

		// force links to open in a new tab and add safe rel attributes
		const targetAttr = `target="${escapeHtml('_blank')}"`;
		const relAttr = `rel="${escapeHtml('noopener noreferrer')}"`;
	
		const attributes = [
			`href="${escapeHtml(node.url)}"`,
			targetAttr,
			relAttr
		].filter(Boolean).join('');

		// render the label of the link, falling back to the URL if no label is provided
		const label = node.children.map(renderNode).join('').trim() || escapeHtml(node.url);

		// render link nodes
		return `<a ${attributes}>${label}</a>`;
	}

	function renderBlock(block: { children: RichTextNode[] }) {
		return block.children.map(renderNode).join(' ');
	}

	function getArticleByLocale(selectedLocale: 'en' | 'et') {
		return [data.article, ...data.article.localizations].find((article) => article.locale === selectedLocale) ?? data.article;
	}

	// selectedArticle: for `projects` prefer localized fields but fall back
	// to the default article's `cover` and `media` when missing.
	const selectedArticle = $derived.by(() => {
		if (data.section === 'projects') {
			const localeArticle = getArticleByLocale($locale);
			return {
				...data.article,
				...localeArticle,
				cover: localeArticle.cover ?? data.article.cover,
				media: (localeArticle.media && localeArticle.media.length) ? localeArticle.media : data.article.media
			};
		}

		return data.article;
	});
</script>

<svelte:head>
	<title>{selectedArticle.title}</title>
</svelte:head>

<article>

	<Nav />

	{#if selectedArticle.cover}
		<img
			src={`https://cms.matias.ee${selectedArticle.cover.url}`}
			alt={selectedArticle.cover.alternativeText ?? selectedArticle.title}
		/>
	{/if}

	<h1>{selectedArticle.title}</h1>
	<p>{selectedArticle.description}</p>
	<p>{selectedArticle.category.name}</p>

	{#if selectedArticle.media?.length}
		<section class="gallery" aria-label="Image gallery">
			{#each selectedArticle.media as image}
				<figure>
					<img
						src={`https://cms.matias.ee${image.url}`}
						alt={image.alternativeText ?? image.caption ?? selectedArticle.title}
						loading="lazy"
					/>
					{#if image.caption}
						<figcaption>{image.caption}</figcaption>
					{/if}
				</figure>
			{/each}
		</section>
	{/if}

	{#each selectedArticle.text as block}
		<p>{@html renderBlock(block)}</p>
	{/each}

	<Footer />
</article>

<style>
	article {
		display: grid;
		gap: 1rem;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.75rem;
		margin: 1rem 0;
	}

	.gallery figure {
		margin: 0;
	}

	.gallery img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 0.75rem;
	}

	.gallery figcaption {
		margin-top: 0.35rem;
		font-size: 0.9rem;
		opacity: 0.8;
	}
</style>
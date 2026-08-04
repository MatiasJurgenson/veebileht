<script lang="ts">
	import Nav from '../../Nav.svelte';
	import Footer from '../../Footer.svelte';

	import { locale } from '$lib/settings';
	import type { Article, MediaAsset, RichTextNode } from '$lib/api';

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

	const CMS_BASE_URL = 'https://cms.matias.ee';
	let selectedImageIndex = $state(0);

	function imageAlt(image: MediaAsset): string {
		return image.alternativeText ?? image.caption ?? selectedArticle.title;
	}

	function imageSrc(image: MediaAsset, size: 'full' | 'thumb' = 'full'): string {
		if (size === 'thumb') {
			const thumbUrl = image.formats.small?.url ?? image.formats.thumbnail?.url ?? image.url;

			return `${CMS_BASE_URL}${thumbUrl}`;
		}

		return `${CMS_BASE_URL}${image.url}`;
	}


	// to the default article's `cover` and `media` when missing.
	const selectedArticle = $derived.by(() => {
		const localeArticle = getArticleByLocale($locale);

		return {
			...data.article,
			...localeArticle,
			cover: localeArticle.cover ?? data.article.cover,
			media: (localeArticle.media && localeArticle.media.length) ? localeArticle.media : data.article.media
		};
	});

	$effect(() => {
		const imageCount = selectedArticle.media?.length ?? 0;

		if (imageCount === 0) {
			selectedImageIndex = 0;

			return;
		}

		if (selectedImageIndex > imageCount - 1) {
			selectedImageIndex = 0;
		}
	});
</script>

<svelte:head>
	<title>{selectedArticle.title}</title>
	<meta name="description" content={selectedArticle.description} />
</svelte:head>


<Nav />

<div class="article">

	<h1>{selectedArticle.title}</h1>

	{#each selectedArticle.text as block}
		<p>{@html renderBlock(block)}</p>
	{/each}

	{#if selectedArticle.media?.length}
		<section class="gallery" aria-label="Image gallery">
			<figure class="gallery-main">
				<img
					src={imageSrc(selectedArticle.media[selectedImageIndex])}
					alt={imageAlt(selectedArticle.media[selectedImageIndex])}
					loading="eager"
				/>
				{#if selectedArticle.media[selectedImageIndex].caption}
					<figcaption>{selectedArticle.media[selectedImageIndex].caption}</figcaption>
				{/if}
			</figure>

			<div class="gallery-thumbs" role="list" aria-label="Gallery thumbnails">
				{#each selectedArticle.media as image, index}
					<button
						type="button"
						class:selected={index === selectedImageIndex}
						onclick={() => (selectedImageIndex = index)}
						aria-label={`Show image ${index + 1}`}
						aria-pressed={index === selectedImageIndex}
					>
						<img
							src={imageSrc(image, 'thumb')}
							alt={imageAlt(image)}
							loading="lazy"
						/>
					</button>
				{/each}
			</div>
		</section>
	{/if}

</div>


<Footer />

<style>

	.article {
		max-width: 60%;
		margin: 0 auto;
		padding: 1rem 0;
	}

	.gallery {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin: 1rem 0;
	}

	.gallery-main {
		margin: 0;
	}

	.gallery-main img {
		display: block;
		width: 100%;
		height: clamp(220px, 55vw, 560px);
		object-fit: contain;
		border-radius: 0.75rem;
	}

	.gallery-main figcaption {
		margin-top: 0.35rem;
		font-size: 0.9rem;
		opacity: 0.8;
	}

	.gallery-thumbs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
		gap: 0.55rem;
	}

	.gallery-thumbs button {
		padding: 0;
		border: 2px solid transparent;
		background: transparent;
		border-radius: 0.6rem;
		cursor: pointer;
		overflow: hidden;
	}

	.gallery-thumbs button.selected {
		border-color: hsl(198, 82%, 52%);
	}

	.gallery-thumbs img {
		display: block;
		width: 100%;
		height: 84px;
		object-fit: cover;
	}

	@media (max-width: 640px) {
		.gallery-main img {
			height: clamp(200px, 60vw, 420px);
		}

		.gallery-thumbs {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
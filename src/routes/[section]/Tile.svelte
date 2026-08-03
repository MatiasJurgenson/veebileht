<script lang="ts">
	import { locale } from '$lib/settings';

	let { data, article } = $props();

	function getArticleByLocale(selectedLocale: 'en' | 'et') {
		return [article, ...article.localizations].find((entry) => entry.locale === selectedLocale) ?? article;
	}

	const selectedArticle = $derived.by(() => {
		const localeArticle = getArticleByLocale($locale);

		return {
			...article,
			...localeArticle,
			cover: localeArticle.cover ?? article.cover
		};
	});
</script>

<a href={`/${data.section}/${selectedArticle.slug}`}>
	<div class="tile-content">
		{#if selectedArticle.cover}
			<div class="tile-image">
				<img
					src={`https://cms.matias.ee${selectedArticle.cover.url}`}
					alt={selectedArticle.cover.alternativeText ?? selectedArticle.title}
					loading="lazy"
				/>
			</div>
		{/if}

		<div class="tile-text">
			<h2>{selectedArticle.title}</h2>
			<p>{selectedArticle.description}</p>
		</div>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
		width: min(100%, 900px);

	}
	
	img {
		display: block;
		height: auto;
		width: 100%;
		border-radius: 0.75rem;
	}

	.tile-content {
		display: flex;
		align-items: flex-start;
		gap: 1rem;

		border: 1px solid #ccc;
		border-radius: 0.75rem;
		padding: 0.75rem;

		@media (max-width: 640px) {
			flex-direction: column;
		}
	}

	.tile-content:hover {
		transform: scale(1.1);
    	z-index: 1;
		transition: transform 0.2s ease-in-out;
	}

	.tile-image {
		flex: 0 0 220px;
		width: 220px;
		height: 160px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.04);
		border-radius: 0.75rem;

		@media (max-width: 640px) {
			width: 100%;
			flex-basis: auto;
		}
	}

	.tile-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.tile-text {
		display: grid;
		gap: 0.35rem;
		flex: 1;
	}

</style>
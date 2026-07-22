<script lang="ts">
	import { locale } from '$lib/settings';
	import type { ProjectArticle } from '$lib/project';
	import type { RichTextNode } from '$lib/api';

	let { data }: { data: { article: ProjectArticle } } = $props();

	function nodeText(node: RichTextNode): string {
		if (node.type === 'text') {
			return node.text;
		}

		return node.children.map(nodeText).join('');
	}

	function blockText(block: { children: RichTextNode[] }) {
		return block.children.map(nodeText).join('');
	}

	const languages = {
		en: 'English',
		et: 'Eesti'
	} as const;

	function getArticleByLocale(selectedLocale: 'en' | 'et') {
		return [data.article, ...data.article.localizations].find((article) => article.locale === selectedLocale) ?? data.article;
	}

	const selectedArticle = $derived.by(() => getArticleByLocale($locale));
</script>

<svelte:head>
	<title>{selectedArticle.title}</title>
</svelte:head>

<article>
	<div class="locale-switcher" aria-label="Article language switcher">
		{#each Object.entries(languages) as [code, label]}
			<button
				type="button"
				class:active={$locale === code}
				onclick={() => locale.set(code as 'en' | 'et')}
			>
				{label}
			</button>
		{/each}
	</div>

	{#if selectedArticle.cover}
		<img
			src={`https://cms.matias.ee${selectedArticle.cover.url}`}
			alt={selectedArticle.cover.alternativeText ?? selectedArticle.title}
		/>
	{/if}

	<h1>{selectedArticle.title}</h1>
	<p>{selectedArticle.description}</p>
	<p>{selectedArticle.category.name}</p>

	{#each selectedArticle.text as block}
		<p>{blockText(block)}</p>
	{/each}
</article>

<style>
	.locale-switcher {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.locale-switcher button {
		border: 1px solid currentColor;
		background: transparent;
		color: inherit;
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		cursor: pointer;
	}

	.locale-switcher button.active {
		background: currentColor;
		color: white;
	}
</style>

<script lang="ts">
	let { data } = $props();

	function blockText(block: { children: { text: string }[] }) {
		return block.children.map((child) => child.text).join('');
	}
</script>

<svelte:head>
	<title>{data.article.title}</title>
</svelte:head>

<article>
	{#if data.article.cover}
		<img
			src={`https://cms.matias.ee${data.article.cover.url}`}
			alt={data.article.cover.alternativeText ?? data.article.title}
		/>
	{/if}

	<h1>{data.article.title}</h1>
	<p>{data.article.description}</p>
	<p>{data.article.category.name}</p>

	{#each data.article.text as block}
		<p>{blockText(block)}</p>
	{/each}
</article>
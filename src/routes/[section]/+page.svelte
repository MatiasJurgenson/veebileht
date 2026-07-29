<script lang="ts">
	import Nav from '../Nav.svelte';
	import Footer from '../Footer.svelte';
	let { data } = $props();
</script>

<Nav />

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<h1>{data.title}</h1>
<div>
{#each data.articles as article}
	<article>
		<h2><a href={`/${data.section}/${article.slug}`}>{article.title}</a></h2>
		<p>{article.description}</p>
	</article>
{/each}
</div>

<Footer />
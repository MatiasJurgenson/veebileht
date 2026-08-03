<script lang="ts">
	import Nav from '../Nav.svelte';
	import Footer from '../Footer.svelte';
	import Tile from './Tile.svelte';

	import { locale, theme } from '$lib/settings';
	let { data } = $props();

	const labels = {
    en: { project: 'Projects I have done or have been involved in', other: 'Other interesting info' },
    et: { project: 'Projektid mida olen teinud või milles olen osa võtnud', other: 'Muu huvitav info' }
  };
</script>

<Nav />

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<main class="section-page">
	{#if data.section === 'projects'}
		<h1>{labels[$locale].project}</h1>
	{:else}
		<h1>{labels[$locale].other}</h1>
	{/if}
	<div class="tile-list">
		{#each data.articles as article}
			<Tile {data} {article} />
		{/each}
	</div>
</main>

<Footer />

<style>
	.tile-list {
		display: grid;
		place-items: center;
		gap: 1rem;
	}

	.section-page {
		text-align: center;
		padding: 1rem;
	}
</style>
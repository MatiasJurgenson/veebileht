<script>
	import Nav from './Nav.svelte';
	import Footer from './Footer.svelte';
	import Hero from './Hero.svelte';
</script>

<main class="home-page">
	<Nav />
	<Hero />
	<Footer />
</main>

<style>
	.home-page {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		height: 100dvh;
		overflow: hidden;
	}

	.home-page :global(.hero) {
		flex: 1 1 auto;
		min-height: 0;
	}
</style>
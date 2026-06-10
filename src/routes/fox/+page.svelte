<script>
	let { data } = $props();
</script>

<h1>Svelte and Strapi Integration</h1><div>
{#each data.articles as article}
  <article>
    <h2><a href={`/fox/${article.slug}`}>{article.title}</a></h2>
    <p>{article.description}</p>
  </article>
{/each}
</div>
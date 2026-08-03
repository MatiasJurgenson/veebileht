<script lang="ts">
	import { locale, theme } from '$lib/settings';

	let { data, children } = $props<{ data: { locale: 'en' | 'et' }; children: () => unknown }>();

	$effect(() => {
		locale.set(data.locale);
	});

	$effect(() => {
		document.documentElement.dataset.theme = $theme;
	});
</script>

{@render children()}
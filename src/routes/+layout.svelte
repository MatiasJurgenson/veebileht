//  the server reads that cookie

<script lang="ts">
	import { locale } from '$lib/settings';

	let { data, children } = $props<{ data: { locale: 'en' | 'et' }; children: () => unknown }>();

	locale.set(data.locale);
</script>

{@render children()}
<script>
	let numbers = $state([1, 2, 3, 4]);
	let total = $derived(numbers.reduce((t, n) => t + n, 0));

	function addNumber() {
		numbers.push(numbers.length + 1);
		console.log($state.snapshot(numbers));
	}

	$inspect(numbers).with(console.trace);
</script>



<p>{numbers.join(' + ')} = {total}</p>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button onclick={addNumber}>
	Add a number
</button>
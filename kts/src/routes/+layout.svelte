<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-slate-950 text-slate-100">
	<Header />
	<main class="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>

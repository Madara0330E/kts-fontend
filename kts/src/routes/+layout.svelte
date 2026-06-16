<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import LeftPanel from '$lib/components/LeftPanel.svelte';
	import RightPanel from '$lib/components/RightPanel.svelte';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-[#2B2B2B]">
	<Header />
	<main class="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 lg:pl-[360px] lg:pr-[360px]">
		{@render children()}
	</main>
	<div class="fixed left-5 top-24 bottom-5 z-40 hidden lg:block ">
		<div class="h-full overflow-y-auto">
			<LeftPanel />
		</div>
	</div>
	<div class="fixed right-5 top-24 bottom-5 z-40 hidden lg:block ">
		<div class="h-full overflow-y-auto">
			<RightPanel />
		</div>
	</div>
</div>

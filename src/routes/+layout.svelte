<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import LeftPanel from '$lib/components/LeftPanel.svelte';
	import RightPanel from '$lib/components/RightPanel.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { loadUser } from '$lib/stores/userStore';
	import { loadSidebarData } from '$lib/stores/sidebarStore';
	import { API_CHAIN } from '$lib/api/kts/client';

	let { children } = $props();

	const isAuth = $derived(
		page.url.pathname.startsWith('/login') || page.url.pathname.startsWith('/register')
	);

	onMount(() => {
		if (isAuth) return;
		loadUser(API_CHAIN);
		loadSidebarData();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if isAuth}
	<div class="bg-[#212121] w-full min-h-screen flex flex-col">
		<Header />
		<main class="flex-1 w-full rounded-tl-[40px] rounded-tr-[40px] bg-[#2B2B2B] flex items-center justify-center px-[16px] py-[40px]">
			{@render children()}
		</main>
	</div>
{:else}
	<div class="bg-[#212121] w-full h-screen flex flex-col">
		<Header />
		<div class="flex items-center justify-center w-full h-full">
			<main class="mx-auto w-full h-full rounded-tl-[40px] gap-[8px] pl-[32px] pr-[32px] pt-[32px] pb-[32px] rounded-tr-[40px] rounded-bl-[0px] rounded-br-[0px] bg-[#2B2B2B] flex">
				<aside class="sticky left-0 top-[6.667vmin] h-full w-[288px]">
					<div class="h-full"><LeftPanel /></div>
				</aside>
				<div class="flex-1">{@render children()}</div>
				<aside class="sticky right-0 top-[6.667vmin] h-full w-[288px]">
					<div class="h-full"><RightPanel /></div>
				</aside>
			</main>
		</div>
	</div>
{/if}
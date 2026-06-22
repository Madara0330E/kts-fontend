<script lang="ts">
	import { fly } from 'svelte/transition';
	import BrandIcon from './BrandIcon.svelte';

	type Method = { label: string; type: 'redirect' | 'modal'; url?: string; modal?: string };
	type Provider = { id: 'discord' | 'telegram' | 'minecraft'; name: string; methods: Method[] };

	let {
		provider,
		isOpen = false,
		subtitle = 'выбрать способ входа',
		connected = false,
		ontoggle,
		onaction
	}: {
		provider: Provider;
		isOpen?: boolean;
		subtitle?: string;
		connected?: boolean;
		ontoggle: () => void;
		onaction: (method: Method) => void;
	} = $props();
</script>

<div class="relative w-full">
	<button
		type="button"
		onclick={ontoggle}
		class="flex w-full h-[58px] items-center gap-[14px] rounded-[14px] bg-[#2F2F2F] pl-[12px] pr-[16px] transition-colors hover:bg-[#363636] {isOpen
			? 'bg-[#363636]'
			: ''}"
	>
		<span class="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#262626]">
			<BrandIcon id={provider.id} />
		</span>

		<span class="flex flex-1 flex-col items-start">
			<span class="font-tiktok text-[17px] font-medium text-[#F8F8F8]">{provider.name}</span>
			<span class="font-tiktok text-[13px] font-medium {connected ? 'text-[#6CAE3E]' : 'text-[#6C6C6C]'}">
				{subtitle}
			</span>
		</span>

		{#if connected}
			<span class="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#6CAE3E]">
				<svg viewBox="0 0 24 24" class="h-[12px] w-[12px] text-[#212121]" fill="none">
					<path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
		{/if}

		<svg
			viewBox="0 0 24 24"
			fill="none"
			class="h-[18px] w-[18px] text-[#6C6C6C] transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
		>
			<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>

	{#if isOpen}
		<div
			transition:fly={{ y: -6, duration: 160 }}
			class="absolute left-0 right-0 top-[calc(100%+6px)] z-50 flex flex-col gap-[4px] rounded-[14px] bg-[#262626] p-[6px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
		>
			{#each provider.methods as method}
				<button
					type="button"
					onclick={() => onaction(method)}
					class="group flex h-[46px] items-center gap-[10px] rounded-[10px] pl-[14px] pr-[12px] text-left transition-colors hover:bg-[#F8F8F8]/[0.06]"
				>
					<span class="flex-1 font-tiktok text-[15px] font-medium text-[#F8F8F8]/80 group-hover:text-[#F8F8F8]">
						{method.label}
					</span>
					<svg viewBox="0 0 24 24" fill="none" class="h-[16px] w-[16px] shrink-0 text-[#6C6C6C] transition-transform group-hover:translate-x-[2px]">
						<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			{/each}
		</div>
	{/if}
</div>

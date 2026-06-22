<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import BrandIcon from './BrandIcon.svelte';

	type Step = { text: string; copy?: string; link?: string };
	type Data = { title: string; subtitle: string; steps: Step[] };

	let {
		open = false,
		data = null,
		onclose
	}: { open?: boolean; data?: Data | null; onclose: () => void } = $props();

	let copied = $state<number | null>(null);

	async function copy(i: number, value: string) {
		try {
			await navigator.clipboard.writeText(value);
			copied = i;
			setTimeout(() => (copied = copied === i ? null : copied), 1600);
		} catch {
			// буфер обмена недоступен
		}
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={onKey} />

{#if open && data}
	<div
		class="fixed inset-0 z-[60] flex items-center justify-center p-[16px]"
		transition:fade={{ duration: 150 }}
	>
		<button
			type="button"
			aria-label="Закрыть"
			class="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
			onclick={onclose}
		></button>

		<div
			class="relative w-full max-w-[460px] rounded-[24px] bg-[#2B2B2B] px-[24px] pb-[24px] pt-[22px]"
			transition:scale={{ duration: 170, start: 0.96 }}
		>
			<div class="contents">
				<div class="flex items-start gap-[14px]">
					<span class="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[#2C2C2C]">
						<BrandIcon id="minecraft" />
					</span>
					<div class="flex flex-1 flex-col">
						<span class="font-tiktok text-[13px] font-medium text-[#6C6C6C]">{data.subtitle}</span>
						<h2 class="font-tiktok text-[22px] font-semibold leading-tight text-[#F8F8F8]">{data.title}</h2>
					</div>
					<button
						type="button"
						aria-label="Закрыть"
						onclick={onclose}
						class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#2C2C2C] text-[#F8F8F8]/70 transition-colors hover:bg-[#383838] hover:text-[#F8F8F8]"
					>
						<svg viewBox="0 0 24 24" class="h-[16px] w-[16px]" fill="none">
							<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
						</svg>
					</button>
				</div>

				<div class="mt-[20px] flex flex-col gap-[6px]">
					{#each data.steps as step, i}
						{@const clickable = !!step.copy || !!step.link}
						<svelte:element
							this={clickable ? 'button' : 'div'}
							role={clickable ? 'button' : undefined}
							type={clickable ? 'button' : undefined}
							onclick={clickable
								? () => (step.copy ? copy(i, step.copy) : window.open(step.link, '_blank', 'noopener'))
								: undefined}
							class="flex w-full items-center gap-[14px] rounded-[12px] px-[12px] py-[11px] text-left transition-colors {clickable
								? 'cursor-pointer bg-[#F8F8F8]/[0.03] hover:bg-[#F8F8F8]/[0.07]'
								: ''}"
						>
							<span
								class="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px] bg-[#2C2C2C] font-tiktok text-[14px] font-semibold text-[#F07241]"
							>
								{i + 1}
							</span>
							<span class="flex-1 font-tiktok text-[15px] font-medium text-[#F8F8F8]/85">{step.text}</span>

							{#if step.copy}
								<span class="shrink-0 font-tiktok text-[13px] font-medium {copied === i ? 'text-[#6CAE3E]' : 'text-[#F8F8F8]/45'}">
									{copied === i ? 'скопировано' : 'копировать'}
								</span>
							{:else if step.link}
								<svg viewBox="0 0 24 24" class="h-[16px] w-[16px] shrink-0 text-[#F8F8F8]/45" fill="none">
									<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							{/if}
						</svelte:element>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import { sidebarStore, currentChain, navigateTo, visitedItemsCache, loadSidebarData } from '$lib/stores/sidebarStore';
	import { userStore } from '$lib/stores/userStore';

	function isActive(id: string): boolean {
		const ids = $currentChain.split(',');
		return ids[ids.length - 1] === id;
	}

	function getHistoryItems() {
		const ids = $currentChain.split(',');
		const items = [];
		const cache = $visitedItemsCache;
		
		for (let i = 1; i < ids.length; i++) {
			const id = ids[i];
			const cached = cache.get(id);
			
			if (cached) {
				items.push({ id, name: cached.name, type: cached.type });
			} else {
				items.push({ id, name: `ID: ${id.slice(0, 8)}...`, type: 'unknown' });
			}
		}
		return items;
	}

	function jumpToIndex(index: number) {
		const chainIndex = index + 1; 
		currentChain.update(chain => {
			const ids = chain.split(',');
			return ids.slice(0, chainIndex + 1).join(',');
		});
		setTimeout(() => loadSidebarData(), 0);
	}

	function jumpToUser() {
		currentChain.update(chain => chain.split(',')[0]);
		setTimeout(() => loadSidebarData(), 0);
	}

	let isOnUserLevel = $derived($currentChain.split(',').length === 1);
</script>

<style>
	.history-scroll,
	.content-scroll {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.history-scroll::-webkit-scrollbar,
	.content-scroll::-webkit-scrollbar {
		display: none;
	}
</style>

<aside class="flex flex-col w-[288px] max-h-full h-full overflow-y-auto custom-scrollbar">
	<div class="flex flex-col gap-[36px] justify-between pl-[8px] pr-[8px] rounded-[20px] pt-[8px] pb-[8px] bg-[#212121]/60 max-h-full h-full">
		
		<div class="content-scroll overflow-y-auto flex-1 min-h-0">
			<div class="flex flex-col gap-[4px]">
				{#each [...($sidebarStore?.groups ?? []), ...($sidebarStore?.applications ?? [])] as item, index}
					{@const totalItems = ($sidebarStore?.groups?.length ?? 0) + ($sidebarStore?.applications?.length ?? 0)}
					{@const isFirst = index === 0}
					{@const isLast = index === totalItems - 1}
					{@const isGroup = index < ($sidebarStore?.groups?.length ?? 0)}
					{@const itemId = item.id}
					{@const itemName = item.name}
					{@const isActiveItem = isActive(itemId)}
					
					<button 
						type="button"
						class="flex gap-[12px] items-center pl-[16px] pr-[16px] pt-[2px] pb-[2px] w-[272px] h-[71px] cursor-pointer transition-colors text-left bg-[#2F2F2F] {isActiveItem ? 'bg-[#F8F8F8]' : ''} {isFirst ? 'rounded-t-[20px]' : 'rounded-t-[10px]'} {isLast ? 'rounded-b-[20px]' : 'rounded-b-[10px]'}"
						onclick={() => navigateTo(itemId)}
					>
						<div class="flex flex-col flex-1">
							<div class="text-[20px] font-medium font-tiktok truncate {isActiveItem ? 'text-[#524A4A]' : 'text-[#F8F8F8]'}">
								{itemName}
							</div>
							<div class="flex items-center gap-[4px]">
								{#if isGroup}
									<div class="text-[16px] font-medium font-tiktok text-[#6C6C6C]">группа</div>
									<div class="text-[16px] text-[#6C6C6C] font-medium font-tiktok">·</div>
									<div class="text-[16px] text-[#6C6C6C] font-medium font-tiktok">
										{'member_ids' in item ? item.member_ids.length : 0} игрока
									</div>
								{:else}
									<div class="text-[16px] text-[#6C6C6C] font-medium font-tiktok">приложение</div>
								{/if}
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>

		<div class="flex flex-col gap-[4px] mt-auto">
			<div class="history-scroll overflow-y-auto" style="max-height: {getHistoryItems().length > 3 ? '144px' : 'auto'};">
				<div class="flex flex-col gap-[4px]">
					{#each getHistoryItems().toReversed() as item, reversedIndex}
						{@const index = getHistoryItems().length - 1 - reversedIndex}
						{@const isCurrent = reversedIndex === 0}
						<button 
							type="button"
							class="flex gap-[12px] items-center pl-[16px] pr-[16px] pt-[2px] pb-[2px] w-[272px] h-[71px] cursor-pointer transition-colors text-left bg-[#2F2F2F] {isCurrent ? 'bg-[#F8F8F8] rounded-t-[20px] rounded-b-[10px]' : 'rounded-t-[10px] rounded-b-[10px]'}"
							onclick={() => jumpToIndex(index)}
						>
							<div class="flex flex-col flex-1">
								<div class="text-[20px] font-medium font-tiktok truncate {isCurrent ? 'text-[#524A4A]' : 'text-[#F8F8F8]'}">
									{item.name}
								</div>
								<div class="flex items-center gap-[4px]">
									<div class="text-[16px] font-medium font-tiktok text-[#6C6C6C]">
										{item.type === 'group' ? 'группа' : 'приложение'}
									</div>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<button 
				type="button"
				class="flex gap-[12px] items-center pl-[16px] pr-[16px] pt-[2px] pb-[2px] w-[272px] h-[71px] cursor-pointer transition-colors text-left bg-[#2F2F2F] rounded-t-[10px] rounded-b-[20px] {isOnUserLevel ? 'bg-[#F8F8F8]' : ''}"
				onclick={() => jumpToUser()}
			>
				<div class="flex flex-col flex-1">
					<div class="text-[20px] font-medium font-tiktok truncate {isOnUserLevel ? 'text-[#524A4A]' : 'text-[#F8F8F8]'}">
						{$userStore?.nickname ?? 'User'}
					</div>
					<div class="flex items-center gap-[4px]">
						<div class="text-[16px] font-medium font-tiktok text-[#6C6C6C]">ваш игровой аккаунт</div>
					</div>
				</div>
			</button>
		</div>

	</div>
</aside>
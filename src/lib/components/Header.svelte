<script lang="ts">
	import ktsImg from '$lib/assets/images/components/kts.png';
	import sleshImg from '$lib/assets/images/components/slesh.png';
	import spmhImg from '$lib/assets/images/components/spm.png';
	import { userStore } from '$lib/stores/userStore';

	let { title = 'KTS Frontend' } = $props();

	const navItems = [
		{ name: 'Профиль', href: '/profile' },
		{ name: 'Банкинг', href: '/banking' },
		{ name: 'Склады', href: '/warehouses' }
	];
</script>

<header class="bg-[#212121] w-full h-[6.667vmin] flex items-center justify-center pl-[2.778vmin] pr-[2.778vmin]">
	<div class="flex items-center justify-between h-[6.667vmin] w-[142.963vmin]">
		<div class="justify-center flex w-[16.852vmin] h-[3.889vmin] items-center">
			<div><img src={ktsImg} alt="kts" class="w-[7.037vmin] h-[2.593vmin]" /></div>
			<div><img src={sleshImg} alt="slesh" class="w-[1.111vmin] h-[3.889vmin]" /></div>
			<div><img src={spmhImg} alt="spm" class="w-[7.963vmin] h-[3.333vmin]" /></div>
		</div>

		<nav class="flex items-center justify-between h-[6.667vmin] w-[37.222vmin]">
			{#each navItems as item}
				<a href={item.href} class="flex items-center">
					<span class="text-[1.852vmin] text-[#F8F8F8] font-medium font-tiktok">{item.name}</span>
				</a>
			{/each}
		</nav>

		<div class="profile gap-[1.111vmin] flex items-center justify-center">
			<div>
				<a href="/profile" class="flex items-center justify-center">
					<span class="text-[1.852vmin] text-[#F8F8F8] font-medium font-tiktok">
						{$userStore?.nickname ?? 'Гость'}
					</span>
				</a>
			</div>
			<div>
				<a href="/profile" class="flex items-center justify-center">
					{#if $userStore?.nickname}
						<img 
							src={`https://assets.zaralx.ru/api/v1/minecraft/vanilla/player/face/${$userStore.nickname}`}
							alt={$userStore.nickname} 
							class="w-[4.074vmin] h-[4.074vmin] object-cover rounded-sm" 
						/>
					{:else}
						<div class="w-[4.074vmin] h-[4.074vmin] bg-gray-600 rounded-sm animate-pulse"></div>
					{/if}
				</a>
			</div>
		</div>
	</div>
</header>
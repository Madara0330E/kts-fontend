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

<header class="bg-[#212121] w-full h-[6.667vmin] lg:h-[72px] flex items-center justify-center pl-[9.792vmin] pr-[9.792vmin]">
	<div class="flex items-center justify-between h-[6.667vmin] lg:h-[72px] w-[142.963vmin] lg:w-full lg:max-w-screen-xl">
		
		<div class="justify-center flex w-[16.852vmin] lg:w-[182px] h-[3.889vmin] lg:h-[42px] items-center">
			<div><img src={ktsImg} alt="kts" class="w-[7.037vmin] lg:w-[76px] h-[2.593vmin] lg:h-[28px]" /></div>
			<div><img src={sleshImg} alt="slesh" class="w-[1.111vmin] lg:w-[12px] h-[3.889vmin] lg:h-[42px]" /></div>
			<div><img src={spmhImg} alt="spm" class="w-[7.963vmin] lg:w-[86px] h-[3.333vmin] lg:h-[36px]" /></div>
		</div>

		<nav class="flex items-center justify-between h-[6.667vmin] lg:h-[72px] w-[37.222vmin] lg:w-auto lg:gap-[64px]">
			{#each navItems as item}
				<a href={item.href} class="flex items-center">
					<span class="text-[1.852vmin] lg:text-xl text-[#F8F8F8] font-medium font-tiktok">{item.name}</span>
				</a>
			{/each}
		</nav>

		<div class="profile gap-[1.111vmin] lg:gap-3 flex items-center justify-center">
			<div>
				<a href="/profile" class="flex items-center justify-center">
					<span class="text-[1.852vmin] lg:text-xl text-[#F8F8F8] font-medium font-tiktok">
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
							class="w-[4.074vmin] lg:w-[44px] h-[4.074vmin] lg:h-[44px] object-cover rounded-sm" 
						/>
					{:else}
						<div class="w-[4.074vmin] lg:w-[44px] h-[4.074vmin] lg:h-[44px] bg-gray-600 rounded-sm animate-pulse"></div>
					{/if}
				</a>
			</div>
		</div>
	</div>
</header>
<script lang="ts">
	import { fade } from 'svelte/transition';
	import SocialAuthButton from './SocialAuthButton.svelte';
	import InstructionModal from './InstructionModal.svelte';

	type Method = { label: string; type: 'redirect' | 'modal'; url?: string; modal?: string };
	type Provider = { id: 'discord' | 'telegram' | 'minecraft'; name: string; methods: Method[] };
	type Step = { text: string; copy?: string; link?: string };

	let { mode = 'login' }: { mode?: 'login' | 'register' } = $props();
	const isLogin = $derived(mode === 'login');

	// При регистрации Discord и Minecraft обязательны, Telegram - по желанию.
	const requiredProviders = ['discord', 'minecraft'];

	// Способы входа. URL у redirect-методов пока пустые - подставить реальные ссылки на бота / OAuth.
	const providers: Provider[] = [
		{
			id: 'discord',
			name: 'Discord',
			methods: [
				{ label: 'Войти через бота', type: 'redirect', url: '' },
				{ label: 'Войти через авторизацию', type: 'redirect', url: '' }
			]
		},
		{
			id: 'telegram',
			name: 'Telegram',
			methods: [
				{ label: 'Войти через авторизацию', type: 'redirect', url: '' },
				{ label: 'Войти через бота', type: 'redirect', url: '' }
			]
		},
		{
			id: 'minecraft',
			name: 'Minecraft',
			methods: [
				{ label: 'Войти через мод', type: 'modal', modal: 'mc-mod' },
				{ label: 'Войти через сервер', type: 'modal', modal: 'mc-server' }
			]
		}
	];

	// Шаги инструкций - заглушки, заменить на реальные.
	const instructions: Record<string, { title: string; subtitle: string; steps: Step[] }> = {
		'mc-mod': {
			title: 'Вход через мод',
			subtitle: 'Minecraft',
			steps: [
				{ text: 'Установите мод KTS в папку .minecraft/mods' },
				{ text: 'Запустите игру и зайдите на наш сервер' },
				{ text: 'Откройте чат и введите команду', copy: '/kts token' },
				{ text: 'Мод покажет одноразовый код входа' },
				{ text: 'Скопируйте код и вставьте в поле «Токен» ниже' },
				{ text: 'Нажмите кнопку входа' }
			]
		},
		'mc-server': {
			title: 'Вход через сервер',
			subtitle: 'Minecraft',
			steps: [
				{ text: 'Зайдите на сервер', copy: 'play.kts.su' },
				{ text: 'Введите в чат команду', copy: '/login web' },
				{ text: 'Сервер пришлёт ссылку-подтверждение в чат' },
				{ text: 'Перейдите по ссылке и подтвердите вход' },
				{ text: 'Скопируйте выданный токен' },
				{ text: 'Вставьте токен в поле ниже и нажмите кнопку входа' }
			]
		}
	};

	let openId = $state<string | null>(null);
	let modalKey = $state<string | null>(null);
	let token = $state('');
	let done = $state(false);
	let notice = $state('');
	let connected = $state<Record<string, boolean>>({ discord: false, telegram: false, minecraft: false });

	const modalData = $derived(modalKey ? instructions[modalKey] : null);
	const canSubmit = $derived(
		isLogin ? token.trim().length > 0 : connected.discord && connected.minecraft
	);

	function toggle(id: string) {
		openId = openId === id ? null : id;
	}

	function providerSubtitle(p: Provider): string {
		if (isLogin) return 'выбрать способ входа';
		if (connected[p.id]) return 'подключён';
		return requiredProviders.includes(p.id) ? 'обязательно' : 'по желанию';
	}

	function handleAction(provider: Provider, method: Method) {
		openId = null;

		if (!isLogin) {
			// Регистрация: помечаем аккаунт привязанным (в реале - после возврата с OAuth / проверки токена).
			if (method.type === 'modal' && method.modal) modalKey = method.modal;
			connected = { ...connected, [provider.id]: true };
			return;
		}

		// Вход: любой способ ведёт сразу внутрь.
		if (method.type === 'modal' && method.modal) {
			modalKey = method.modal;
			return;
		}
		if (method.url) {
			window.location.href = method.url;
		} else {
			notice = 'Этот способ скоро подключим';
			setTimeout(() => (notice = ''), 2600);
		}
	}

	async function paste() {
		try {
			token = (await navigator.clipboard.readText()).trim();
		} catch {
			// буфер обмена недоступен
		}
	}

	function submit() {
		if (!canSubmit) return;
		// TODO: вход по токену / финализация регистрации на бэкенде
		done = true;
		setTimeout(() => (done = false), 2600);
	}
</script>

<div class="w-full max-w-[440px]">
	<div class="w-full rounded-[24px] bg-[#212121] px-[26px] pb-[26px] pt-[28px]">
		<div class="flex flex-col gap-[4px]">
			<h1 class="font-tiktok text-[28px] font-semibold leading-none text-[#F8F8F8]">
				{isLogin ? 'Вход' : 'Регистрация'}
			</h1>
			<p class="font-tiktok text-[15px] font-medium text-[#6C6C6C]">
				{isLogin ? 'Выберите способ входа' : 'Привяжите Discord и Minecraft, Telegram - по желанию'}
			</p>
		</div>

		<div class="relative mt-[22px]">
			{#if openId}
				<button
					type="button"
					aria-label="Закрыть меню"
					class="fixed inset-0 z-40 cursor-default"
					onclick={() => (openId = null)}
				></button>
			{/if}
			<div class="relative z-50 flex flex-col gap-[8px]">
				{#each providers as provider}
					<SocialAuthButton
						{provider}
						isOpen={openId === provider.id}
						subtitle={providerSubtitle(provider)}
						connected={!isLogin && connected[provider.id]}
						ontoggle={() => toggle(provider.id)}
						onaction={(method) => handleAction(provider, method)}
					/>
				{/each}
			</div>
		</div>

		{#if isLogin}
			<div class="my-[20px] flex items-center gap-[12px]">
				<span class="h-px flex-1 bg-[#F8F8F8]/10"></span>
				<span class="font-tiktok text-[13px] font-medium text-[#6C6C6C]">или по токену</span>
				<span class="h-px flex-1 bg-[#F8F8F8]/10"></span>
			</div>

			<div class="flex items-center gap-[8px] rounded-[12px] bg-[#F8F8F8]/5 pl-[16px] pr-[6px] h-[52px]">
				<input
					type="text"
					bind:value={token}
					spellcheck="false"
					autocomplete="off"
					placeholder="Вставьте токен"
					class="h-full w-full border-none bg-transparent font-tiktok text-[16px] font-medium text-[#F8F8F8] placeholder:font-tiktok placeholder:text-[16px] placeholder:text-[#F8F8F8]/30 focus:outline-none focus:ring-0"
				/>
				<button
					type="button"
					onclick={paste}
					class="h-[40px] shrink-0 rounded-[9px] bg-[#2F2F2F] px-[16px] font-tiktok text-[14px] font-medium text-[#F8F8F8] transition-colors hover:bg-[#3A3A3A]"
				>
					Вставить
				</button>
			</div>
		{/if}

		<button
			type="button"
			onclick={submit}
			disabled={!canSubmit}
			class="mt-[16px] h-[54px] w-full rounded-[13px] bg-[#F07241] font-tiktok text-[17px] font-semibold text-[#F8F8F8] transition-all hover:bg-[#F4865C] disabled:cursor-not-allowed disabled:bg-[#F07241]/25 disabled:text-[#F8F8F8]/40"
		>
			{isLogin ? 'Войти' : 'Зарегистрироваться'}
		</button>

		{#if done}
			<p transition:fade={{ duration: 150 }} class="mt-[12px] text-center font-tiktok text-[14px] font-medium text-[#6CAE3E]">
				{isLogin ? 'Токен принят' : 'Аккаунты привязаны'}
			</p>
		{:else if notice}
			<p transition:fade={{ duration: 150 }} class="mt-[12px] text-center font-tiktok text-[14px] font-medium text-[#F8F8F8]/50">
				{notice}
			</p>
		{/if}

		<p class="mt-[18px] text-center font-tiktok text-[14px] font-medium text-[#6C6C6C]">
			{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
			<a
				href={isLogin ? '/register' : '/login'}
				class="ml-[4px] text-[#F8F8F8] underline-offset-4 hover:underline"
			>
				{isLogin ? 'Зарегистрироваться' : 'Войти'}
			</a>
		</p>
	</div>
</div>

<InstructionModal open={!!modalKey} data={modalData} onclose={() => (modalKey = null)} />

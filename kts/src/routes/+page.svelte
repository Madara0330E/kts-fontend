<script>
	import LeftPanel from '$lib/components/LeftPanel.svelte';
	import RightPanel from '$lib/components/RightPanel.svelte';
</script>

<div class="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
	<LeftPanel />

	<div class="space-y-6">
		<div class="rounded-[32px] border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p class="text-sm uppercase tracking-[0.3em] text-cyan-300">Профиль</p>
					<h1 class="mt-2 text-3xl font-semibold text-white">Панель управления</h1>
				</div>
				<button class="inline-flex items-center gap-2 rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
					<span>Создать</span>
				</button>
			</div>
			<p class="text-slate-400">Здесь отображаются карточки и ключевые действия для текущего проекта. Левая панель содержит группы, правая — ленту событий.</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-[32px] border border-slate-800/80 bg-slate-950/90 p-5 shadow-lg shadow-slate-950/20">
				<p class="text-sm uppercase tracking-[0.3em] text-slate-500">Owner</p>
				<h2 class="mt-3 text-xl font-semibold text-white">123456789012345678</h2>
			</div>
			<div class="rounded-[32px] border border-slate-800/80 bg-slate-950/90 p-5 shadow-lg shadow-slate-950/20">
				<p class="text-sm uppercase tracking-[0.3em] text-slate-500">Member</p>
				<h2 class="mt-3 text-xl font-semibold text-white">MrEzhuk</h2>
			</div>
		</div>

		<div class="grid gap-4 xl:grid-cols-2">
			<div class="rounded-[32px] border border-slate-800/80 bg-slate-950/90 p-5 shadow-lg shadow-slate-950/20">
				<p class="text-sm uppercase tracking-[0.3em] text-cyan-300">Таблица прав</p>
				<ul class="mt-4 space-y-3 text-slate-300">
					<li class="flex items-center justify-between rounded-3xl bg-slate-900 px-4 py-3">
						<span>Право №1</span>
						<input type="checkbox" checked class="h-4 w-4 accent-cyan-500" />
					</li>
					<li class="flex items-center justify-between rounded-3xl bg-slate-900 px-4 py-3">
						<span>Право №1</span>
						<input type="checkbox" class="h-4 w-4 accent-cyan-500" />
					</li>
				</ul>
			</div>
			<div class="rounded-[32px] border border-slate-800/80 bg-slate-950/90 p-5 shadow-lg shadow-slate-950/20">
				<p class="text-sm uppercase tracking-[0.3em] text-cyan-300">Панель управления</p>
				<ul class="mt-4 space-y-3 text-slate-300">
					<li class="flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3">
						<span class="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-800">⇄</span>
						<span>Перевод по нику</span>
					</li>
					<li class="flex items-center gap-3 rounded-3xl bg-slate-900 px-4 py-3">
						<span class="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-800">🏷</span>
						<span>Переименовать</span>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<RightPanel />
</div>

<script>
  let actions = [
    { title: 'Профильдоговно 100ap', subtitle: '24 часа назад', color: 'text-pink-400', icon: '⏱' },
    { title: 'Переименовали', subtitle: '24 часа назад', color: 'text-amber-400', icon: '✏️' },
    { title: 'Удалили карту', subtitle: '24 часа назад', color: 'text-red-400', icon: '🗑️' },
    { title: 'Добавление участника', subtitle: '24 часа назад', color: 'text-emerald-400', icon: '➕' },
    { title: 'Разблокировка', subtitle: '24 часа назад', color: 'text-lime-400', icon: '🔓' },
    { title: 'Передача прав карты', subtitle: '24 часа назад', color: 'text-sky-400', icon: '🔁' }
  ];
</script>

<aside class="flex h-full flex-col gap-6 rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
  <div>
    <p class="text-sm uppercase tracking-[0.3em] text-cyan-300">Последние действия</p>
    <h2 class="mt-3 text-xl font-semibold text-white">Живая лента</h2>
  </div>

  <div class="space-y-3 overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-950/80 p-3">
    {#each actions as action}
      <div class="flex items-start gap-3 rounded-3xl border border-slate-800/80 bg-slate-900 p-3">
        <div class={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 ${action.color}`}>{action.icon}</div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-slate-100">{action.title}</p>
          <p class="mt-1 text-xs text-slate-500">{action.subtitle}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-auto rounded-[28px] border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-400">
    <div class="flex items-center justify-between text-slate-300">
      <span>Страница</span>
      <span>1 из 1</span>
    </div>
    <div class="mt-3 flex items-center justify-between gap-2 text-xs text-slate-500">
      <button class="flex-1 rounded-2xl border border-slate-800/80 bg-slate-900 px-3 py-2 text-left transition hover:border-slate-600">←</button>
      <button class="flex-1 rounded-2xl border border-slate-800/80 bg-slate-900 px-3 py-2 text-right transition hover:border-slate-600">→</button>
    </div>
  </div>
</aside>

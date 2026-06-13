<script>
  let query = $state('');
  let { groups = [
    { title: 'coplva клан', subtitle: 'группа · 4 игрока', active: true },
    { title: 'За клан', subtitle: 'группа · 4 игрока' },
    { title: 'c5кдна клан', subtitle: 'приложение' },
    { title: '1234567890123456', subtitle: 'группа · 4 игрока' },
    { title: 'сорокдва', subtitle: 'группа · 4 игрока' },
    { title: 'сорокдва', subtitle: 'группа · 4 игрока' },
    { title: 'сорокдва', subtitle: 'группа · 4 игрока' },
    { title: 'сорокдва', subtitle: 'группа · 4 игрока' }
  ] } = $props();

  const filtered = () => query.trim()
    ? groups.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    : groups;
</script>

<aside class="flex h-full flex-col gap-6">
  <div class="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
    <div class="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Группы</div>
    <div class="relative rounded-3xl border border-slate-800/80 bg-slate-950 p-3">
      <input
        type="search"
        bind:value={query}
        placeholder="Введите запрос"
        class="w-full bg-transparent px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
      />
    </div>
  </div>

  <div class="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-base font-semibold text-white">Выбор группы</h2>
      <span class="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{filtered().length}</span>
    </div>

    <ul class="space-y-2">
      {#each filtered() as group}
        <li class={`rounded-3xl border px-4 py-3 transition ${group.active ? 'border-cyan-400 bg-slate-950 text-white' : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600 hover:bg-slate-950'}`}>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm font-semibold leading-5">{group.title}</p>
              <p class="mt-1 text-xs text-slate-500">{group.subtitle}</p>
            </div>
            {#if group.active}
              <span class="rounded-full bg-cyan-500/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200">Активно</span>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <div class="mt-auto rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
    <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Ваш игровой аккаунт</p>
    <div class="mt-4 flex items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-950 p-4">
      <div class="h-12 w-12 rounded-2xl bg-slate-800"></div>
      <div>
        <p class="text-sm font-semibold text-white">fupir</p>
        <p class="text-xs text-slate-500">ID 123456789012345678</p>
      </div>
    </div>
  </div>
</aside>

import { writable, get } from 'svelte/store';
import { client, API_CHAIN } from '$lib/api/kts/client';
import type { components as KtsComponents } from '$lib/api/kts/schema';

type GroupFull = NonNullable<KtsComponents['schemas']['GroupProjectionResponse']> extends infer U 
  ? U extends { full: infer F } ? F : never 
  : never;

type AppFull = NonNullable<KtsComponents['schemas']['ApplicationProjectionResponse']> extends infer U 
  ? U extends { full: infer F } ? F : never 
  : never;

export interface SidebarData {
    groups: GroupFull[];
    applications: AppFull[];
}

export const sidebarStore = writable<SidebarData | null>(null);
export const currentChain = writable<string>(API_CHAIN);

export const visitedItemsCache = writable<Map<string, { name: string; type: 'group' | 'application' }>>(new Map());

let isFetchingSidebar = false;

export async function loadSidebarData() {
    if (isFetchingSidebar) return;
    isFetchingSidebar = true;

    try {
        const chainValue = get(currentChain);
        const ids = chainValue.split(',');
        const agentId = ids[ids.length - 1];

        const [groupsRes, appsRes] = await Promise.all([
            client.GET('/groups/membered/{agent_id}', { params: { path: { agent_id: agentId } } }),
            client.GET('/applications/membered/{agent_id}', { params: { path: { agent_id: agentId } } })
        ]);

        const groups = groupsRes.data?.groups?.map(g => g.full).filter(Boolean) as GroupFull[] || [];
        const applications = appsRes.data?.applications?.map(a => a.full).filter(Boolean) as AppFull[] || [];

        const cache = get(visitedItemsCache);
        groups.forEach(g => cache.set(g.id, { name: g.name, type: 'group' }));
        applications.forEach(a => cache.set(a.id, { name: a.name, type: 'application' }));
        visitedItemsCache.set(cache);

        sidebarStore.set({ groups, applications });
    } catch (e) {
        console.error('Ошибка загрузки сайдбара:', e);
    } finally {
        isFetchingSidebar = false;
    }
}

export async function navigateTo(id: string) {
    currentChain.update(chain => {
        const ids = chain.split(',');
        if (ids[ids.length - 1] === id) return chain;
        return `${chain},${id}`;
    });
    
    setTimeout(() => loadSidebarData(), 0);
}

function jumpToIndex(index: number) {
    currentChain.update(chain => {
        const ids = chain.split(',');
        return ids.slice(0, index + 1).join(',');
    });
    setTimeout(() => loadSidebarData(), 0);
}
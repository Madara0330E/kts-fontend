import { writable } from 'svelte/store';
import { client } from '$lib/api/kts/client';

export const userStore = writable<{ nickname: string; userId: string } | null>(null);

let isFetching = false;

export async function loadUser(userId: string) {
    if (isFetching || !userId) return;
    isFetching = true;

    try {
        const { data } = await client.GET('/users/get/{id}', {
            params: { path: { id: userId } }
        });

        if (data?.user && 'full' in data.user) {
            userStore.set({
                nickname: data.user.full.minecraft_nickname,
                userId: data.user.full.user_id
            });
        }
    } finally {
        isFetching = false;
    }
}
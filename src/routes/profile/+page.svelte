<script lang="ts">
    import { client } from "$lib/api/kts/client";
    import { API_CHAIN } from "$lib/api/kts/client";
    import { client as zaralx } from "$lib/api/zaralx/client";

    const promise = client.GET("/users/get/{id}", { params: { path: { id: API_CHAIN } } });
    const image = zaralx.GET("/v1/minecraft/vanilla/item/{item}/icon", {
        params: {
            path: {
                item: "golden_apple"
            }
        },
        parseAs: "blob"
    });
</script>

<div>
{#await promise}
    <p>Loading...</p>
{:then result}
    <p>{JSON.stringify(result.data)} {result.error}</p>
{:catch error}
    <p>Error: {JSON.stringify(error)}</p>
{/await}

{#await image}
    <p>Loading...</p>
{:then result}
    <p>{result.error}</p>
    {#if result.data}
    <img src={URL.createObjectURL(result.data)} alt="golden_apple">
    {/if}
{:catch error}
    <p>Error: {error}</p>
{/await}
</div>

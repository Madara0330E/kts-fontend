<script lang="ts">
    import { client } from "$lib/api/client";
    import { API_CHAIN } from "$lib/api/client";
    const promise = client.GET("/users/get/{id}", { params: { path: { id: API_CHAIN } } });
</script>

<div>
{#await promise}
    <p>Loading...</p>
{:then result}
    <p>{JSON.stringify(result.data)} {result.error}</p>
{:catch error}
    <p>Error: {JSON.stringify(error)}</p>
{/await}
</div>

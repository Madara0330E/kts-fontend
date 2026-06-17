<script lang="ts">
    import { client } from "$lib/api/client";
    import { API_CHAIN } from "$lib/api/client";

    const { data, error } = await client.GET("/users/get/{id}", { params: { path: { id: API_CHAIN } } });
</script>
    <p>{JSON.stringify(data)} {error}</p>
<div>
</div>

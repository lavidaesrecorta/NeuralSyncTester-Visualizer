<script lang="ts">
    import SessionCount from "$lib/sessionCount/sessionCount.svelte";
    export let data;   
    
    
</script>

    <div class="surface-counts">
        {#each data.sessions.result as session}
        <div>
            <h1 class=" text-2xl m-2">{`Grupo H-L ${session.h_l_group} | ${session.tpm_type}`}</h1>
            <SessionCount session={session} />
        </div>
        {/each}
    </div>


<style>
.surface-counts{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.surface-counts > div{
    height: 480px;
    width: 480px;
    display: block;
}
</style>

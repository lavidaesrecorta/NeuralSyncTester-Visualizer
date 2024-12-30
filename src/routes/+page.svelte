<script lang="ts">
	import Hamburguer from "$lib/hamburguer.svelte";
	import type { OpenSession } from "$lib/server/database.js";
    import SessionSummary from "$lib/sessionSummary/sessionSummary.svelte";
	import { chartSurfaceTypes, getSeriesFromSet } from "$lib/surfaceChart/chartUtils";
	import SurfaceChart from "$lib/surfaceChart/surfaceChart.svelte";
	import { onDestroy, onMount } from "svelte";
    export let data;   
    

    
    const eventSourceUrl = `http://127.0.0.1:8080/track-sessions`;
    let eventSrc : EventSource | null = null;

    let sessionList : Map<string,OpenSession> = data.sessions;

    onMount(() => {

    eventSrc = new EventSource(eventSourceUrl);
    eventSrc.onmessage = (event) => {
        sessionList = JSON.parse(event.data);
    };
    })

    onDestroy(() => {
        if (!!eventSrc){
            eventSrc.close()
        }
    })
    
    
</script>


<div class="w-full flex justify-center">
    <div class="w-full md:max-w-3xl">
        {#each Object.values(sessionList) as session}
            <SessionSummary session={session} />
        {/each}
    </div>
</div>
<style>
    .surface-charts{
        height: 100vh;
        width: 100%;
    }
</style>

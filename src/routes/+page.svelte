<script lang="ts">
	import type { OpenSession } from "$lib/server/database.js";
    import SessionSummary from "$lib/sessionSummary/sessionSummary.svelte";
	import { onDestroy, onMount } from "svelte";
    export let data;   
    
    
    const eventSourceUrl = data.url;
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
    <div class="w-full md:max-w-3xl py-12">
        <h1 class="text-3xl my-4">Active Sessions:</h1>
        
        {#if Object.keys(sessionList).length == 0}
            <h2 class="text-xl">It seems that you don't have any active sessions.</h2>
        {/if}

        {#each Object.values(sessionList) as session}
            <SessionSummary session={session} />
        {/each}

        <a class="mt-6" href="/newSession">New Session</a>
    </div>
</div>
<style>
    a{
        display: block;
        padding: 4px;
        border: solid gray 1px;
        text-align: center;
        background-color: rgb(30 41 59);
        color: azure;
        font-weight: bold;
    }
</style>

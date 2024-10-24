<script lang="ts">
	import type { OpenSession } from "$lib/server/database";

export let session: OpenSession

const get_progress = () => { return (session.CurrentSessionCount / session.MaxSessionCount)*100 }

const title_length = 12

let showStats = false

</script>
<button class="relative" on:click={() => {showStats = !showStats}} >
    <h1 class="text-xl font-bold text-left">{session.Uid.substring(0,title_length)}</h1>
    <div class="tpm_config">
        <div>H: {session.Config.H}</div>
        <div>N_0: {session.Config.N[0]}</div>
        <div>L: {session.Config.L}</div>
        <div>M: {session.Config.M}</div>
    </div>
    <div class="progress-bar bg-slate-400 relative">
        <span class="bg-blue-500" style={`width: ${get_progress()}%;`}></span>
    </div>
    {#if showStats}
    <span>{session.CurrentSessionCount}/{session.MaxSessionCount}</span>
    <div>Inicio: {new Date(session.StartTime)}</div>

    {/if}
</button>

<style>

    button{
        display: block;
        width: 100%;
        padding-top: 15px;
    }

    .progress-bar{
        position: relative;
        width: 100%;
        height: 10px;
        text-align: left;
    }
    .progress-bar > span {
        position: absolute;
        height: 100%;
    }
    .tpm_config {
        position: absolute;
        top: 0;
        right: 0;
    }
    .tpm_config > div {
        display: inline;
    }
</style>

<script lang="ts">
    import SessionSummary from "$lib/sessionSummary/sessionSummary.svelte";
	import { chartSurfaceTypes, getSeriesFromSet } from "$lib/surfaceChart/chartUtils";
	import SurfaceChart from "$lib/surfaceChart/surfaceChart.svelte";
    export let data;   
    

    
    // let charts = []
    // Object.keys(chartSurfaceTypes).forEach(element => {
    //     const parsedSeries = getSeriesFromSet(data.sessions.result.graphs[element]);
    //     const newChart = {
    //         chartType: chartSurfaceTypes[element],
    //         series: parsedSeries
    //     }
    //     charts.push(newChart)
    // });
    
    
    
</script>


<!-- <div class="surface-charts">
    {#each charts as chart}
        
        <SurfaceChart chartObject={chart} />
    {/each}
</div> -->

<div class="w-full flex justify-center">
    <div class="w-full md:max-w-3xl">
        {#each Object.values(data.sessions) as session}
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

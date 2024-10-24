<script lang="ts">
    import SessionSummary from "$lib/sessionSummary/sessionSummary.svelte";
	import { chartSurfaceTypes, getSeriesFromSet } from "$lib/surfaceChart/chartUtils";
	import SurfaceChart from "$lib/surfaceChart/surfaceChart.svelte";
    export let data;   
    

    
    let charts = []
    Object.keys(chartSurfaceTypes).forEach(element => {
        const parsedSeries = getSeriesFromSet(data.sessions.result.graphs[element]);
        const newChart = {
            chartType: chartSurfaceTypes[element],
            series: parsedSeries
        }
        charts.push(newChart)
    });
    
    
    
</script>


<div class="surface-charts">
    {#each charts as chart}
    <div class="mt-8">
        <h1 class="m-2 text-2xl">{chart.chartType.title}</h1>
        <SurfaceChart chartObject={chart} />
    </div>   
    {/each}
</div>


<style>
    .surface-charts{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6rem 2rem;
}

.surface-charts > div{
    height: 720px;
    width: 720px;
    display: block;
}

</style>

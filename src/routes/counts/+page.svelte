<script lang="ts">
	import IterationHistogramForm from "$lib/sessionCount/iterationHistogramForm.svelte";
import IterationHistogramGraph from "$lib/sessionCount/iterationHistogramGraph.svelte";
import type { HistogramEntry, IterationHistogramRequestBody } from "$lib/sessionCount/sessionCount";
	import { t } from "$lib/translations";
	import { onMount } from "svelte";

    
    let status = "waiting"

    const postData: IterationHistogramRequestBody = {
        TableName: "sessions",
        BucketColumn: "tpm_type",
        Scenario: "NO_OVERLAP",
        LearnRule: "HEBBIAN",
    }

    let axisData
    let seriesData
    let loadedSeries: HistogramEntry[] | null;
    onMount(async ()=> {
        // await getDataFromAPI(postData)
        
    })



    const getDataFromAPI = async (postData: IterationHistogramRequestBody) => {
    
    const response = await fetch("/api/iterationHistogram",{
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'content-type': 'application/json'
			}
		})
    const graphResponse = await response.json();
    
    status = "ready"
    loadedSeries = graphResponse["histogram"];
    
    if (loadedSeries == null || loadedSeries.length == 0) return
    
    axisData = {
                name: $t("counts.RangeLabel"),
                data: loadedSeries.map((entry: HistogramEntry) => {return entry.RangeLabel})
            }

    seriesData = [
        {
            name: $t("FinishedPercentage"),
            data: loadedSeries.map((entry: HistogramEntry) => {return (entry.FinishedCount/entry.TotalCount) * 100})
        },
        {
            name: $t("LearnPercentage"),
            data: loadedSeries.map((entry: HistogramEntry) => {return (entry.AvgLearn/entry.AvgStim) * 100})
        },
        // {
        //     name: $_("UnfinishedCount"),
        //     data: loadedSeries.map((entry: HistogramEntry) => {return entry.TotalCount-entry.FinishedCount})
        // },
        // {
        //     name: $_("FinishedCount"),
        //     data: loadedSeries.map((entry: HistogramEntry) => {return entry.FinishedCount})
        // },
        // {
        //     name: $_("TotalCount"),
        //     data: loadedSeries.map((entry: HistogramEntry) => {return entry.TotalCount})
        // },
    ]
    
    }
</script>
<div class="md:w-full md:p-24 md:h-full grid  grid-cols-none md:grid-cols-[1fr_1fr] gap-4">
    <h1 class="text-3xl md:col-span-2">Iterations Histogram</h1>


    <IterationHistogramForm executeQuery={getDataFromAPI} />
    {#if loadedSeries!=null && axisData != null}
    <IterationHistogramGraph axisData={axisData} seriesData={seriesData} />
    {:else if status != "waiting"}
    <h2 class="text-xl text-center">{$t("counts.noData")}</h2>
    {/if}
</div>


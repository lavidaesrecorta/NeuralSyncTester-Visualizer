<script lang="ts">
	import { availableScenarios } from "$lib/3dGraphs/chartUtils";
	import IterationHistogramForm from "$lib/sessionCount/iterationHistogramForm.svelte";
import IterationHistogramGraph from "$lib/sessionCount/iterationHistogramGraph.svelte";
import type { HistogramEntry, IterationHistogramRequestBody } from "$lib/sessionCount/sessionCount";
	import { t } from "$lib/translations";
	import { onMount } from "svelte";

    
    let status = "waiting"

    const getButtonLabel = (status: string) => {
        switch (status) {
            case "ready":
                return "Filter Graphs"
            case "error":
                return "An error has ocurred..."
            default:
                return "Loading...";
        }
    }

    $: buttonLabel = getButtonLabel(status)

    let axisData
    let seriesData
    let loadedSeries: HistogramEntry[] | null;
    onMount(async ()=> {
        // await getDataFromAPI(postData)
        status = "ready"
    })

    const labels = {
            graphGroups:$t("counts.form.graphGroups"),
            formFilter:$t("counts.form.formFilter"),
            scenario:$t("counts.form.scenario"),
            learnRule:$t("counts.form.learnRule"),
            finishedSessionBox:$t("counts.form.finishedSessionBox"),
            finishedDataSize:$t("counts.form.finishedDataSize"),
            xAxis: {tpm_type: $t("counts.form.xAxis.tpm_type"), learn_rule: $t("counts.form.xAxis.learn_rule")},
            scenarios: {"none": $t("counts.form.scenarios.none"),"NO_OVERLAP":$t("counts.form.scenarios.NO_OVERLAP"), "PARTIALLY_CONNECTED": $t("counts.form.scenarios.PARTIALLY_CONNECTED"), "FULLY_CONNECTED": $t("counts.form.scenarios.FULLY_CONNECTED")},
            learnRules: {"none": $t("counts.form.learnRules.none"),"HEBBIAN": $t("counts.form.learnRules.HEBBIAN"),"ANTI-HEBBIAN": $t("counts.form.learnRules.ANTI-HEBBIAN"),"RANDOM-WALK":$t("counts.form.learnRules.RANDOM-WALK")},
            buttonLabels: {
                ready: $t("counts.form.buttons.ready"),
                error: $t("counts.form.buttons.error"),
            }
        }   

    const getMaxFromSeries = (series) => {
        let max = -9999
        for (let index = 0; index < loadedSeries.length; index++) {
            const element = loadedSeries[index][series];
            if (element > max) {
                max = element
            }
        }
        return max
    }

    const normalizeData = (seriesToNormalize: string) => {
        const max = getMaxFromSeries(seriesToNormalize)

        return loadedSeries.map((entry: HistogramEntry) => {return (entry[seriesToNormalize]/max) * 100})
    }

    const getDataFromAPI = async (postData: IterationHistogramRequestBody) => {
    
        const response = await fetch("/api/iterationHistogram",{
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'content-type': 'application/json'
                }
            })
        const graphResponse = await response.json();
            
        if (graphResponse["status"] != "success"){
            status = "error"
            return
        }
        

        status = "ready"
        loadedSeries = graphResponse["histogram"];
        
        if (loadedSeries == null || loadedSeries.length == 0) return
        
        console.log(loadedSeries);
        
        

        axisData = {
                    name: $t("counts.graph.RangeLabel"),
                    data: loadedSeries.map((entry: HistogramEntry) => {return $t(`counts.bucketLabels.${entry.RangeLabel}`)})
                }

        seriesData = [
            {
                name: $t("counts.graph.FinishedPercentage"),
                data: loadedSeries.map((entry: HistogramEntry) => {return (entry.FinishedCount/entry.TotalCount) * 100}),
                normalizeFactor: 1
            },
            {
                name: $t("counts.graph.LearnPercentage"),
                data: loadedSeries.map((entry: HistogramEntry) => {return (entry.AvgLearn/entry.AvgStim) * 100}),
                normalizeFactor: 1
            },
            {
                name: $t("counts.graph.AvgDataSize"),
                data: normalizeData("AvgDataSize"),
                normalizeFactor: getMaxFromSeries("AvgDataSize")
            },
            // {
            //     name: $t("counts.graph.UnfinishedCount"),
            //     data: loadedSeries.map((entry: HistogramEntry) => {return entry.TotalCount-entry.FinishedCount})
            // },
            // {
            //     name: $_t"counts.graph.FinishedCount"),
            //     data: loadedSeries.map((entry: HistogramEntry) => {return entry.FinishedCount})
            // },
            // {
            //     name: $t("counts.graph.TotalCount"),
            //     data: loadedSeries.map((entry: HistogramEntry) => {return entry.TotalCount})
            // },
        ]
    }
</script>
<div class="md:w-full md:p-24 md:h-full grid  grid-cols-none md:grid-cols-[1fr_1fr] gap-4">
    <h1 class="text-3xl md:col-span-2">{$t("counts.title")}</h1>


    <IterationHistogramForm executeQuery={getDataFromAPI} buttonLabel={buttonLabel} labels={labels} />
    {#if loadedSeries!=null && axisData != null}
    {#key seriesData}
    <IterationHistogramGraph axisData={axisData} seriesData={seriesData} />
    {/key}
    {:else if status != "waiting"}
    <h2 class="text-xl text-center">{$t("counts.noData")}</h2>
    {/if}
</div>


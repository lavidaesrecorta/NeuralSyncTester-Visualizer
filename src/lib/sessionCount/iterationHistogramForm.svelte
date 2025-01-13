<script lang="ts">
	import { Axis } from "echarts";
import type { IterationHistogramRequestBody } from "./sessionCount";
import { t } from '$lib/translations';
	import DoubleSlider from "$lib/ui/doubleSlider.svelte";

    export let executeQuery = async (postData: IterationHistogramRequestBody) => {}

    export let labels

    const validXAxis = ["tpm_type","learn_rule"]
    const validScenarios = ["none","NO_OVERLAP", "PARTIALLY_CONNECTED", "FULLY_CONNECTED"]
    const validRules = ["none","HEBBIAN","ANTI-HEBBIAN","RANDOM-WALK"]

    export let buttonState = "ready"

    const postData: IterationHistogramRequestBody = {
        TableName: "sessions",
        BucketColumn: validXAxis[0],
        Scenario: validScenarios[0],
        LearnRule: validRules[0],
        CountUnfinished: false,
        LimitDataSize: false,
        MinDataSize: 256,
        MaxDataSize: 4096,
    }


</script>
<div class="form-hist">
    <label for="">{labels.graphGroups}</label>
    <select name="" id="" bind:value={postData.BucketColumn}>
        {#each validXAxis as axis}
        <option value={axis}>{labels.xAxis[axis]}</option>
        {/each}
    </select>
<h2 class="text-2xl mt-4">{labels.formFilter}</h2>
{#if postData.BucketColumn != "tpm_type"}
    
<label for="">{labels.scenario}</label>
<select name="" id="" bind:value={postData.Scenario}>
    {#each validScenarios as scenario}
    <option value={scenario}>{labels.scenarios[scenario]}</option>
    {/each}
</select>
{/if}
{#if postData.BucketColumn != "learn_rule"}
<label for="">{labels.learnRule}</label>
<select name="" id="" bind:value={postData.LearnRule}>
    {#each validRules as rule}
    <option value={rule}>{labels.learnRules[rule]}</option>
    {/each}
</select>
{/if}
<div>
    <input type="checkbox" bind:checked={postData.CountUnfinished} /> {labels.finishedSessionBox}
</div>

<div>
    <input type="checkbox" bind:checked={postData.LimitDataSize} /> {labels.finishedDataSize}
</div>
{#if (postData.LimitDataSize)}
    <DoubleSlider minValue={256} maxValue={4096} step={256}  bind:sliderRightValue={postData.MaxDataSize} bind:sliderLeftValue={postData.MinDataSize} />
{/if}
    <button disabled={buttonState!="ready"} on:click={()=>{executeQuery(postData)}}> {labels.buttonLabels[buttonState]}</button>
</div>

<style>
    .form-hist{
        display: flex;
        flex-direction: column;
        flex: 1 1 0px;
        gap: 12px;
    }
        input{
        background-color: #e5e7eb;
        padding: 4px;
        border-radius: 2px;
    }
    select{
        background-color: #e5e7eb;
        padding: 4px;
        border-radius: 2px;
    }
    button{
        border: 1px solid gray;
        padding: 6px 12px;
        background-color: rgb(30 41 59);
        color: azure;
        font-weight: bold;
    }
</style>
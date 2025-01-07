<script lang="ts">
	import { Axis } from "echarts";
import type { IterationHistogramRequestBody } from "./sessionCount";
import { t } from '$lib/translations';

    export let executeQuery = (postData: IterationHistogramRequestBody) => {}

    const validXAxis = ["tpm_type","learn_rule"]
    const validScenarios = ["none","NO_OVERLAP", "PARTIALLY_CONNECTED", "FULLY_CONNECTED"]
    const validRules = ["none","HEBBIAN","ANTI-HEBBIAN","RANDOM-WALK"]

    const postData: IterationHistogramRequestBody = {
        TableName: "sessions",
        BucketColumn: validXAxis[0],
        Scenario: validScenarios[0],
        LearnRule: validRules[0]    
    }

</script>
<div class="form-hist">
    <label for="">{$t("counts.graphGroups")}</label>
    <select name="" id="" bind:value={postData.BucketColumn}>
        {#each validXAxis as axis}
        <option value={axis}>{$t(axis)}</option>
        {/each}
    </select>
<h2 class="text-2xl mt-4">$_("formFilter")</h2>
{#if postData.BucketColumn != "tpm_type"}
    
<label for="">$_("Scenario")</label>
<select name="" id="" bind:value={postData.Scenario}>
    {#each validScenarios as scenario}
    <option value={scenario}>{$t(scenario)}</option>
    {/each}
</select>
{/if}
{#if postData.BucketColumn != "learn_rule"}
<label for="">$_("LearnRule")</label>
<select name="" id="" bind:value={postData.LearnRule}>
    {#each validRules as rule}
    <option value={rule}>{$t(rule)}</option>
    {/each}
</select>
{/if}

    <button on:click={()=>{executeQuery(postData)}}>Filter Graph</button>
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
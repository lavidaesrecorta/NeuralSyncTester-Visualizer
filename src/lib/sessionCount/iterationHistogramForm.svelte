<script lang="ts">
	import type { IterationHistogramRequestBody } from "./sessionCount";
	import { _ } from "svelte-i18n";


    export let executeQuery = (postData: IterationHistogramRequestBody) => {}

    const validScenarios = ["NO_OVERLAP", "PARTIALLY_CONNECTED", "FULLY_CONNECTED"]
    const validRules = ["HEBBIAN","ANTI-HEBBIAN","RANDOM-WALK"]

    const postData: IterationHistogramRequestBody = {
        TableName: "sessions",
        Scenario: validScenarios[0],
        LearnRule: validRules[0],
        Min: 500,
        Max: 500_000,
        BucketCount: 32
    }

</script>
<div class="form-hist">
    <label for="">$_("Scenario")</label>
    <select name="" id="" bind:value={postData.Scenario}>
        {#each validScenarios as scenario}
        <option value={scenario}>{$_(scenario)}</option>
        {/each}
    </select>
    <label for="">$_("LearnRule")</label>
    <select name="" id="" bind:value={postData.LearnRule}>
        {#each validRules as rule}
        <option value={rule}>{$_(rule)}</option>
        {/each}
    </select>
    <label for="">$_("Min")</label>
    <input type="number" name="" id="" bind:value={postData.Min} min="50">
    <label for="">$_("Max")</label>
    <input type="number" name="" id="" bind:value={postData.Max} max="900000">

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
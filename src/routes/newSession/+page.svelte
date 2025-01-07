<script lang="ts">
	import NewOverlapSessionForm from "$lib/sessionSummary/newOverlapSessionForm.svelte";
	import NewNoOverlapSessionForm from "$lib/sessionSummary/newNoOverlapSessionForm.svelte";
	import type { NewNoOverlapRequestBody, NewOverlapRequestBody } from "$lib/sessionSummary/sessionRequestTypes";
	import { t } from "$lib/translations";

	const tpmScenarios = ["NO_OVERLAP","PARTIALLY_CONNECTED","FULLY_CONNECTED"]

	let selectedScenario = tpmScenarios[0]

    const requestNoOverlap = async (postData: NewNoOverlapRequestBody) => {
        console.log(postData);
        const response = await fetch("/api/newNoOverlapSession",{
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'content-type': 'application/json'
			}
		})
    	const newSessionData : {sessionToken:string} = await response.json();
		console.log(newSessionData.sessionToken);
    }

	const requestOverlap = async (postData: NewOverlapRequestBody) => {
        postData.Scenario = selectedScenario
		console.log(postData);
        const response = await fetch("/api/newOverlapSession",{
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'content-type': 'application/json'
			}
		})
    	const newSessionData : {sessionToken:string} = await response.json();
		console.log(newSessionData.sessionToken);
    }


</script>


<select name="" id="" bind:value={selectedScenario}>
	{#each tpmScenarios as scenario}
		<option value={scenario}>{$t(scenario)}</option>
	{/each}
</select>
{#if selectedScenario=="NO_OVERLAP"}
	<NewNoOverlapSessionForm executeNoOverlapRequest={requestNoOverlap} />
{/if}
{#if selectedScenario!="NO_OVERLAP"}
	<NewOverlapSessionForm executeOverlapRequest={requestOverlap} />
{/if}
<style>
    select{
        padding: 4px;
    }
</style>
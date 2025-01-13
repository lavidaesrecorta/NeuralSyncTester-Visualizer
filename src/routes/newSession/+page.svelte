<script lang="ts">
	import NewOverlapSessionForm from "$lib/sessionSummary/newOverlapSessionForm.svelte";
	import NewNoOverlapSessionForm from "$lib/sessionSummary/newNoOverlapSessionForm.svelte";
	import type { NewNoOverlapRequestBody, NewOverlapRequestBody } from "$lib/sessionSummary/sessionRequestTypes";
	import { t } from "$lib/translations";
	import Hamburguer from "$lib/ui/hamburguer.svelte";

	const tpmScenarios = ["NO_OVERLAP","PARTIALLY_CONNECTED","FULLY_CONNECTED"]

	let selectedScenario = tpmScenarios[0]

	let lastRequestSuccesful = false
	let lastRequestToken = ""

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
		if (newSessionData.sessionToken != null){
			lastRequestSuccesful = true
			lastRequestToken = newSessionData.sessionToken
		}
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
		if (newSessionData.sessionToken != null){
			lastRequestSuccesful = true
			lastRequestToken = newSessionData.sessionToken
		}
    }


	const formLabels = {
		H: $t("newSession.form.H"),
		K: $t("newSession.form.K"),
		N: $t("newSession.form.N"),
		N_0: $t("newSession.form.N_0"),
		K_LAST: $t("newSession.form.K_LAST"),
		M: $t("newSession.form.M"),
		L: $t("newSession.form.L"),
		MaxSessionCount: $t("newSession.form.MaxSessionCount"),
		MaxIterations: $t("newSession.form.MaxIterations"),
		buttons:{
			ready: "Request New Session"
		}
	}

</script>

<div class="p-4 md:max-w-xl mx-auto">
	<select name="" id="" bind:value={selectedScenario}>
		{#each tpmScenarios as scenario}
		<option value={scenario}>{$t(`newSession.scenarios.${scenario}`)}</option>
		{/each}
	</select>
	{#if selectedScenario=="NO_OVERLAP"}
	<NewNoOverlapSessionForm executeNoOverlapRequest={requestNoOverlap} formLabels={formLabels} />
	{/if}
	{#if selectedScenario!="NO_OVERLAP"}
	<NewOverlapSessionForm executeOverlapRequest={requestOverlap} formLabels={formLabels}/>
	{/if}

	{#if lastRequestSuccesful}
	<a href={`/realtime/${lastRequestToken}`} class="bg-green-200 block p-4 overflow-clip break-all"> 
	New session created with token: {lastRequestToken}
	</a>
	{/if}

</div>
<style>
    select{
        padding: 4px;
    }
</style>
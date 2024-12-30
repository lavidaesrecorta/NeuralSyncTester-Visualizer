<script lang="ts">
    import { _ } from 'svelte-i18n'
	import type { GraphRequestData } from './chartUtils';
    export let formLabels   
    export let requestFunction = (postData: GraphRequestData) => {}


    const executeRequest = (postData: GraphRequestData) => {
        requestFunction(postData)
    }

    let postData: GraphRequestData = {
        X: "",
        Y: "",
        LearnRule: formLabels.learnRulesLabels[0][0],
        Scenario: formLabels.scenarioLabels[0][0],
        TableName: "sessions",
    }

</script>

<div class="flex flex-col p-4 gap-2">
    <label for="">Learn Rule:</label>
    <select name="" id="" bind:value={postData.LearnRule} >
        {#each formLabels["learnRulesLabels"] as [rule,label]}
            <option value={rule}>{label}</option>
        {/each}
    </select>
    <label for="" >Scenario:</label>
    <select name="" id="" bind:value={postData.Scenario} >
        {#each formLabels["scenarioLabels"] as [scenario,label]}
            <option value={scenario}>{label}</option>
        {/each}
    </select>
    <label for="">Axis X:</label>
    <select bind:value={postData.X} name="" id="">
        <option value="none" selected disabled hidden>Select an Option</option>
        {#each formLabels["axisLabels"] as [axis,label]}
            <option  value={axis} disabled={axis==postData.Y}>{label}</option>
        {/each}
    </select>

    <label for="">Axis Y:</label>
    <select bind:value={postData.Y} name="" id="">
        <option value="none" selected disabled hidden>Select an Option</option>
        {#each formLabels["axisLabels"] as [axis,label]}
            <option value={axis} disabled={axis==postData.X}>{label}</option>
        {/each}
    </select>

    <button class="my-2" on:click={()=> executeRequest(postData)}>Request Graph</button>
</div>
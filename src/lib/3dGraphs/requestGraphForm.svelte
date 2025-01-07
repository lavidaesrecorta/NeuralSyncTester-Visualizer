<script lang="ts">
	import type { GraphRequestData } from './chartUtils';
    export let formLabels   
    export let requestFunction = async (postData: GraphRequestData) => {}

    let status = "disabled"
    const executeRequest = async (postData: GraphRequestData) => {
        status="loading"
        try {
            await requestFunction(postData)
        } catch (error) {
            console.log("e: ", error);
            status = "error"
            
        }

        status="success"
    }


    const checkReady = () => {
        if (postData.X == "" || postData.Y =="") {
            status="disabled"
            return
        }
        status="ready"
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
    <label for="">{formLabels.form.learnRule}:</label>
    <select  class="rounded-sm" name="" id="" bind:value={postData.LearnRule} >
        {#each formLabels["learnRulesLabels"] as [rule,label]}
            <option value={rule}>{label}</option>
        {/each}
    </select>
    <label for="" >{formLabels.form.tpm_type}:</label>
    <select  class="rounded-sm" name="" id="" bind:value={postData.Scenario} >
        {#each formLabels["scenarioLabels"] as [scenario,label]}
            <option value={scenario}>{label}</option>
        {/each}
    </select>
    <label for="">{formLabels.form.xAxis}:</label>
    <select  class="rounded-sm" bind:value={postData.X} on:change={()=>{checkReady()}} name="" id="">
        <option value="none" selected disabled hidden>Select an Option</option>
        {#each formLabels["axisLabels"] as [axis,label]}
            <option  value={axis} disabled={axis==postData.Y}>{label}</option>
        {/each}
    </select>

    <label for="">{formLabels.form.yAxis}::</label>
    <select class="rounded-sm" bind:value={postData.Y} on:change={()=>{checkReady()}} name="" id="">
        <option value="none" selected disabled hidden>Select an Option</option>
        {#each formLabels["axisLabels"] as [axis,label]}
            <option value={axis} disabled={axis==postData.X}>{label}</option>
        {/each}
    </select>

    <button  on:click={()=> executeRequest(postData)} class={`${status=="loading"? "loading" : ""} my-2 rounded-sm`} disabled={status!="ready"} >{status=="loading"?"Loading...":"Request Graph"}</button>
</div>





<style>

button{
        border: 1px solid gray;
        padding: 6px 12px;
        background-color: rgb(30 41 59);
        color: azure;
        font-weight: bold;
    }

    .loading{
        color:gray
    }


    select{
        padding: 4px;
    }
</style>



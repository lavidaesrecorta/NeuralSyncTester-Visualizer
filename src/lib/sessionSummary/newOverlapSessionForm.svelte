<script lang="ts">
	import { t } from '$lib/translations';
	import type { NewNoOverlapRequestBody, NewOverlapRequestBody } from './sessionRequestTypes';
    export let executeOverlapRequest = async (postData: NewOverlapRequestBody) => {}

let status = "ready"


let postData: NewOverlapRequestBody = {
    K:               [2],
	N_0:          2,
	L:               3,
	M:               1,
	Rule:            "HEBBIAN",
	MaxSessionCount: 5000,
	MaxIterations:   1_000_000,
}

let layerCount = 1
const onLayerCountChange = () => {
    if (postData.K.length>layerCount) {
        postData.K = postData.K.slice(0,layerCount)
        return
    }

    if (postData.K.length<layerCount){
        const difference = layerCount-postData.K.length
        postData.K = [...postData.K, ...(Array.from({length: difference}, (_, n) => 2))]
        console.log(postData.K);
        return
    }
}
</script>
<div class="flex flex-col p-4 gap-2">
    <!-- <label for="">{$t("learnRule")}</label>
    <select  class="rounded-sm" name="" id="" bind:value={postData.Rule} >

    </select> -->
    <label for="" >{$t("H")}</label>
    <input bind:value={layerCount} on:change={()=>{onLayerCountChange()}} type="number" name=""  min="1" max="128">

    <label for="" >{$t("K")}</label>
    <div class="flex gap-4 overflow-scroll">
        {#each postData.K as neuronCount}
        <input bind:value={neuronCount} type="number" name=""  min="2" max="128" id="">
        {/each}
    </div>

    <label for="" >{$t("N_0")}</label>
    <input bind:value={postData.N_0} type="number" name=""  min="1" max="128" id="">

    <label for="" >{$t("L")}</label>
    <input bind:value={postData.L} type="number" name=""  min="1" max="127" id="">

    <label for="" >{$t("M")}</label>
    <input bind:value={postData.M} type="number" name=""  min="1" max="127" id="">

    <label for="" >{$t("MaxSessionCount")}</label>
    <input bind:value={postData.MaxSessionCount} type="number" name=""  min="1" id="">

    <label for="" >{$t("MaxIterations")}</label>
    <input bind:value={postData.MaxIterations} type="number" name=""  min="1" id="">

    <button  on:click={()=> executeOverlapRequest(postData)} class={`${status=="loading"? "loading" : ""} my-2 rounded-sm`} disabled={status!="ready"} >{status=="loading"?"Loading...":"Request new Session"}</button>
</div>

<style>
    input{
        background-color: #e5e7eb;
        margin-bottom: 6px;
        padding: 4px;
        border-radius: 2px;
    }

    button{
        border: 1px solid gray;
        padding: 4px;
    }

    .loading{
        color:gray
    }


</style>
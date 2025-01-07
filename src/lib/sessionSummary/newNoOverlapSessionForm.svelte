<script lang="ts">
	import { t } from '$lib/translations';
	import type { NewNoOverlapRequestBody } from './sessionRequestTypes';
    export let executeNoOverlapRequest = async (postData: NewNoOverlapRequestBody) => {}

let status = "ready"


let postData: NewNoOverlapRequestBody = {
    N:               [2],
	K_last:          1,
	L:               3,
	M:               1,
	Rule:            "HEBBIAN",
	MaxSessionCount: 5000,
	MaxIterations:   1_000_000,
}

let layerCount = 1
const onLayerCountChange = () => {
    if (postData.N.length>layerCount) {
        postData.N = postData.N.slice(0,layerCount)
        return
    }

    if (postData.N.length<layerCount){
        const difference = layerCount-postData.N.length
        postData.N = [...postData.N, ...(Array.from({length: difference}, (_, n) => 2))]
        console.log(postData.N);
        return
    }
}
</script>
<div class="flex flex-col p-4 gap-2">
    <!-- <label for="">{$_("learnRule")}</label>
    <select  class="rounded-sm" name="" id="" bind:value={postData.Rule} >

    </select> -->
    <label for="" >{$t("H")}</label>
    <input bind:value={layerCount} on:change={()=>{onLayerCountChange()}} type="number" name=""  min="1" max="128">

    <label for="" >{$t("N")}</label>
    <div class="flex gap-4 overflow-scroll">
        {#each postData.N as stimulusCount}
        <input bind:value={stimulusCount} type="number" name=""  min="2" max="128" id="">
        {/each}
    </div>

    <label for="" >{$t("K_LAST")}</label>
    <input bind:value={postData.K_last} type="number" name=""  min="2" max="128" id="">

    <label for="" >{$t("L")}</label>
    <input bind:value={postData.L} type="number" name=""  min="1" max="127" id="">

    <label for="" >{$t("M")}</label>
    <input bind:value={postData.M} type="number" name=""  min="1" max="127" id="">

    <label for="" >{$t("MaxSessionCount")}</label>
    <input bind:value={postData.MaxSessionCount} type="number" name=""  min="1" id="">

    <label for="" >{$t("MaxIterations")}</label>
    <input bind:value={postData.MaxIterations} type="number" name=""  min="1" id="">

    <button  on:click={()=> executeNoOverlapRequest(postData)} class={`${status=="loading"? "loading" : ""} my-2 rounded-sm`} disabled={status!="ready"} >{status=="loading"?"Loading...":"Request new Session"}</button>
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
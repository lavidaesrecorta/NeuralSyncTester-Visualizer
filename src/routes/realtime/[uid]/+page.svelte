<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
    import { Neuron } from './templib/canvasNeuron';
	import { Layer } from './templib/canvasLayer';
	import { TPMm } from './templib/canvasTPMm';
	import type { SimulationState, TPMConfig } from '$lib/realtime-viz/visualizer.config';

    export let data
    const sessionUid = data.uid
    const TPM_config : TPMConfig = data.TPM_config

// Create a canvas and get the context
let canvas
let ctx
let loaded = false

let animationRequestId: number

let simulationState: SimulationState[] = []
let iter_index = 0

let finishedSessions = []

onMount(()=>{
    eventSrc = new EventSource(eventSourceUrl);
    eventSrc.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const cmd = data["CommandType"]
        if (cmd == "progress"){
            if (!loaded) loaded = true 
            simulationState = data["SessionState"]
            iter_index = 0    
        } 
        if(cmd=="finished"){
            finishedSessions.push(data);
            finishedSessions = finishedSessions
            if (data.SessionState.FinalState) {
                simulationState= [data.SessionState.FinalState]
            }
        }
         else {
        }
    };
    ctx = canvas.getContext('2d');
    if (ctx) {
        tpmDiagram.draw(ctx)

    }
    animate()
})


onDestroy(() => {
        if (!!eventSrc){
            eventSrc.close()
        }
        if (typeof window !== 'undefined'){
            cancelAnimationFrame(animationRequestId)
        }
    })
    
const tpmDiagram = new TPMm(0,0,TPM_config)
const animate = () => {
    animationRequestId = requestAnimationFrame(animate)
    if(!simulationState[iter_index]) {
        // console.log("ERROR: NO STATEE");
        iter_index = 0
        return
    }
    // Clear the canvas before each draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tpmDiagram.updateNetworkWeights(simulationState[iter_index].Weights_A)
    tpmDiagram.updateNetworkOutputs(simulationState[iter_index].Outputs_A)
    tpmDiagram.draw(ctx)
}



const eventSourceUrl = `http://127.0.0.1:8080/events?id=${sessionUid}`;
let eventSrc : EventSource | null = null;

// Draw the neuron
</script>

<h1 class="text-3xl mx-4">Active Sesison: {sessionUid}</h1>
<br />
<div class="fixed bg-red-100 right-0 py-4 px-8 h-96 overflow-scroll">
    <h2>Finished Sessions:</h2>
    {#each finishedSessions as finishedSession}
        Learn iterations: {finishedSession.SessionState.LearnIterations}
        <br />
    {/each}
</div>
<div class="mx-4">
    <canvas width="1024" height="1024" bind:this={canvas}></canvas>
</div>
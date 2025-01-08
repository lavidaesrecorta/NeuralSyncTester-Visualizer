<script lang="ts">
	import { onMount } from 'svelte';
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

let simulationState: SimulationState[] = []
let iter_index = 0

onMount(()=>{
    eventSrc = new EventSource(eventSourceUrl);
    eventSrc.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const cmd = data["CommandType"]
        if (cmd == "progress"){
            if (!loaded) loaded = true 
            simulationState = data["SessionState"]
            iter_index = 0    
            console.log("prog");           
        } else {
            console.log(cmd);           
        }
    };
    ctx = canvas.getContext('2d');
    if (ctx) {
        tpmDiagram.draw(ctx)

    }
    animate()
})

// // Create a Neuron instance
// const tpmConfig: TPMConfig = {
//     K: [16,8,4,2],
//     N: [2,2,2,2],
//     L: 3,
//     M: 1,
//     H: 4,
// }
const tpmDiagram = new TPMm(0,0,TPM_config)
const animate = () => {
    requestAnimationFrame(animate)
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
<div class="bg-red-100 mx-4">
    <canvas width="1024" height="1024" bind:this={canvas}></canvas>
</div>
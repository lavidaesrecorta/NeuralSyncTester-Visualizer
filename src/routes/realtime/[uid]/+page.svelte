<script lang="ts">
	import Neuron from "$lib/realtime-viz/molecules/neuron.svelte";
	import Tpm from "$lib/realtime-viz/molecules/tpm.svelte";
	import { area_width, type SimulationState, type TPMConfig } from "$lib/realtime-viz/visualizer.config.js";
	import { onDestroy, onMount } from "svelte";
    
    export let data
    const sessionUid = data.uid
    const TPM_config : TPMConfig = data.TPM_config
    
    let simulationState: SimulationState[] = []

    let iter_index = 0
    let loaded = false

    const animateChart = () => {
        if (!simulationState || simulationState.length == 0) {return}
        iter_index++
        if (iter_index >= simulationState.length) {
            iter_index = simulationState.length-1            
        }
    }

    async function setupChart() {
    // Set up the interval for real-time data updates
    const interval = setInterval(animateChart, 100);
    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }

    const eventSourceUrl = `http://127.0.0.1:8080/events?id=${sessionUid}`;
    let eventSrc : EventSource | null = null;
    onMount(async () => {
    
    await setupChart();

    eventSrc = new EventSource(eventSourceUrl);
    eventSrc.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const cmd = data["CommandType"]
        if (cmd == "progress"){
            simulationState = data["SessionState"]
            iter_index = 0
        }
    };
    })


    onDestroy(() => {
        if (!!eventSrc){
            eventSrc.close()
        }
    })

    // let currentState : SimulationState = {Outputs_A: [],Outputs_B:[],Weights_A:[],Weights_B:[],Stimulus:[]} 
    $: currentState = simulationState[iter_index]
    $: loaded = simulationState.length>0    

    const inverted_offset = area_width(TPM_config) 

</script>
<div class="w-screen h-screen">
    {#if loaded}
    <svg width=100% height=100%  >
        <Tpm TPM_config={TPM_config} stimulus={currentState.Stimulus} layers_weights={currentState.Weights_A} layers_outputs={currentState.Outputs_A} />
        <Tpm x={inverted_offset} TPM_config={TPM_config} stimulus={currentState.Stimulus} layers_weights={currentState.Weights_B} layers_outputs={currentState.Outputs_B} inverted={true} />
    </svg>
    {/if}
</div>
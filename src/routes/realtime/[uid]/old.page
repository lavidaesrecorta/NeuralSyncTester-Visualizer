<script lang="ts">
	import Neuron from "$lib/realtime-viz/molecules/neuron.svelte";
	import Tpm from "$lib/realtime-viz/molecules/tpm.svelte";
	import { area_width, type SimulationState, type TPMConfig } from "$lib/realtime-viz/visualizer.config.js";
	import { onDestroy, onMount } from "svelte";
    import panzoom from '@panzoom/panzoom'
    
    export let data
    const sessionUid = data.uid
    const TPM_config : TPMConfig = data.TPM_config
    
    let simulationState: SimulationState[] = []

    let iter_index = 0
    let loaded = false // change to promise so it only activates once?

    let instance


    const promiseTest = () => {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating a successful data fetch
            resolve('Data fetched successfully!');
            // You could also simulate an error here:
            // reject('Error fetching data');
        }, 2000); // 2 seconds delay
        });
    };


    function initPanzoom(node) {
        instance = panzoom(node)
    }

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
            if (!loaded) loaded = true 
            simulationState = data["SessionState"]
            iter_index = 0

            console.log("progress");
            
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

    const inverted_offset = area_width(TPM_config) 

</script>
<div class="w-screen h-screen">
    <svg width=100% height=100% viewBox="0 0 10000 10000"  >
        <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)"/>
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/>
            </pattern>
        </defs>
              
        <g use:initPanzoom>
            <rect x="-500%" width="1000%" height="1000%" fill="url(#grid)" />
    {#await promiseTest() then testResult}
        <Tpm TPM_config={TPM_config} stimulus={currentState.Stimulus} layers_weights={currentState.Weights_A} layers_outputs={currentState.Outputs_A} />
        <Tpm x={inverted_offset} TPM_config={TPM_config} stimulus={currentState.Stimulus} layers_weights={currentState.Weights_B} layers_outputs={currentState.Outputs_B} inverted={true} />
    {:catch error}
        <p>Error: {error}</p>
    {/await}
      
    </g>
    </svg>
</div>
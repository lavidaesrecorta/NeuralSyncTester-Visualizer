<script lang="ts">
	import Neuron from "./neuron.svelte";
	import { layer_margin, neuron_Ymargin, weight_center } from "./visualizer.config";

    export let x = 0;
    export let y = 0;
    export let neurons = [];
    export let outputs = [];

    export let showWeights = false;

    
    const calculate_neuronOffset = (i,weightCount) => { return showWeights ? (weight_center*2*weightCount+ layer_margin)*i : (weight_center*2 + neuron_Ymargin)*i}

    // export const layer_height = 0;
    // export const layer_width = 0;

</script>
{#key neurons}
    {#each neurons as neuron,i}
        <Neuron x={x} y={y+calculate_neuronOffset(i,neuron.length)} weights={neuron} output={outputs[i]} {showWeights} />
    {/each}
{/key}
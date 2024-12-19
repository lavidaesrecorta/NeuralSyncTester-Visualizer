<script lang="ts">
	import { default_neuron_height, neuron_width, weight_center, weight_radius } from "../visualizer.config";
    
    const weight_offset = (i: number) => {return weight_center + 2*weight_center*i}

    let x=0
    let y=0
    let weights = [0,0,0]
    const weight_count = weights.length

    let showWeights = true
    
    const neuron_height =  showWeights ? default_neuron_height*weight_count : default_neuron_height 

</script>

<rect x={x} y={y} width={neuron_width} height={neuron_height}  fill={"red"} stroke="red" stroke-width="0" />
{#if showWeights}
    {#each weights as weight,j}
        <circle cx={x+weight_center} cy={y+weight_offset(j)} r={weight_radius} stroke="black" stroke-width="2" fill={"red"}/>
    {/each}
{/if}
<script lang="ts">
	import { default_neuron_height, neuron_width, weight_center, weight_radius } from "../visualizer.config";
    
    const weight_offset = (i: number) => {return weight_center + 2*weight_center*i}

    export let x=0
    export let y=0
    export let showWeights = true

    export let weights: number[] = [0,0,0]
    export let output: number = 1
    
    const weight_count = weights.length
    
    
    const neuron_height =  showWeights ? default_neuron_height*weight_count : default_neuron_height 




    function getColor(inputNumber: number){
        const sign = Math.sign(inputNumber);
        if(sign>0){
            return "blue"
        }
        return "red" 
    }

</script>

<rect x={x} y={y} width={neuron_width} height={neuron_height}  fill={getColor(output)} stroke="red" stroke-width="0" />
{#if showWeights}
    {#each weights as weight,j}
        <circle cx={x+weight_center} cy={y+weight_offset(j)} r={weight_radius} stroke="black" stroke-width="2" fill={getColor(weight)}/>
    {/each}
{/if}
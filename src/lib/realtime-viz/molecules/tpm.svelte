<script lang="ts">
	import { calculateLayerY, calculateLayerX, type TPMConfig, get_output_x, get_output_y, output_size } from "../visualizer.config";
    import Layer from "./layer.svelte";

    export let TPM_config: TPMConfig
    export let showWeights = true
    export let inverted = false
    export let align = "middle"

    export let stimulus: number[][]
    export let layers_weights: number[][][]
    export let layers_outputs: number[][]


    const output_x = get_output_x(TPM_config,inverted)
    const output_y = get_output_y(TPM_config,showWeights, align)

    $: output = layers_outputs[layers_outputs.length-1].reduce((accumulator,currentValue)=>accumulator*currentValue)

    export let x = 0
    export let y = 0

</script>

{#each layers_weights as weights,i }
    <Layer x={x+calculateLayerX(i,TPM_config,inverted)} y={y+calculateLayerY(i, TPM_config, showWeights, align)} neurons_weights={weights} neurons_outputs={layers_outputs[i]} {showWeights} />
{/each}
    <rect x={x+output_x} y={y+output_y} width={output_size} height={output_size} fill={output === 1 ? 'blue' : 'red'} transform={`rotate(45,${x+output_x},${y+output_y})`} />


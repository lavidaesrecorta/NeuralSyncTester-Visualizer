
//Neurons and Weights Config
export const weight_margin = 5;
export const weight_radius = 20;
export const weight_center = weight_radius+weight_margin;

export const neuron_width = weight_center*2
export const neuron_Ymargin = 15;
export const default_neuron_height = neuron_width

export const layer_margin = 10;

export const output_size = 75;
export const output_xMargin = 75;

export const input_xMargin = 120;
export const layer_xMargin = 20;


export interface SimulationState{
	Stimulus:         number[][]
	// layer_stimulus_a: number[][][]
	// layer_stimulus_b: number[][][]
	Weights_A:        number[][][]
	Weights_B:        number[][][]
	Outputs_A:        number[][]
	Outputs_B:        number[][]
}

export interface TPMLayer{
    weights: number[][]
    outputs: number[]
}

// export interface Iteration{
//     Stimulus: number[][];
//     LayersOutput: number[][];
//     NetworkOutput: number;

//     Weights: number[][][];
//     // neuronsOnSync: number[][];
// }

// export interface IterationEvent{
//     Iterations_length: number;
//     IterationsA: Iteration[];
//     IterationsB: Iteration[];

//     Total_iterations: number;
//     Learn_iterations: number;
//     Stalled_iterations: number;
// }

// export interface IterationEvent{
//     IterationA: Iteration;
//     IterationB: Iteration;
//     Stimulus_Iterations: number;
//     Learning_Iterations: number;
// }

export interface TPMConfig{
    K: number[];
    N: number[];
    L: number;
    M: number;
    H: number;
}




const getLayerHeight = (k:number,n:number, showWeights: boolean) => {
    return showWeights ? (weight_center*2*n+layer_margin)*k : (weight_center*2 + neuron_Ymargin)*k
}

export const area_height = (config: TPMConfig, showWeights: boolean) => {
  return getLayerHeight(config.K[0],config.N[0], showWeights) //this assumes the first layer is always the biggest
}

export const area_width = (config: TPMConfig) => {

  return input_xMargin+(layer_xMargin+neuron_width)*config.K.length + (output_size + output_xMargin)
}

export const calculateLayerY = ( layerIndex: number, config: TPMConfig,showWeights: boolean , align: string) => {

  if(align == "middle"){
    const layerHeight = getLayerHeight(config.K[layerIndex],config.N[layerIndex], showWeights)
    const layerMidpoint = layerHeight/2
    const areaMidpoint = area_height(config, showWeights)/2
    return areaMidpoint-layerMidpoint
  }
  return 0
}
export const get_output_x = (config: TPMConfig, inverted: boolean = false) => {
  if(!inverted){
    return area_width(config) - output_size
  } else {
    return output_size
  }
}

export const get_output_y = (config: TPMConfig, showWeights: boolean, align: string) => {
  const areaMidpoint = area_height(config, showWeights)/2
  if (align == "middle") {
    return areaMidpoint - output_size
  }
  return 0
  // const output_YOffset = Math.sqrt(2)*output_size / 2
}

const inputLayerX = (config: TPMConfig, inverted: boolean = false) => {
  if(!inverted){ 
    return 0
  } else {
    return area_width(config) - neuron_width
  }
}

export const calculateLayerX = (i: number,config: TPMConfig, inverted: boolean = false) => {
  if (!inverted){
    return input_xMargin+(layer_xMargin+neuron_width)*i;
  }
  else{
    return area_width(config) - neuron_width - (input_xMargin + (layer_xMargin+neuron_width)*i)
  }
}
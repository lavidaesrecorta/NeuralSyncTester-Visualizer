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

// export interface TPMConfig{
//     k: number[];
//     n: number[];
//     l: number;
//     m: number;
// }
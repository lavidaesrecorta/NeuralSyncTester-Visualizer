import type { TPMConfig } from "$lib/realtime-viz/visualizer.config";
import { Layer } from "./canvasLayer";
import { getLayerXOffset, tpmHeight, tpmWidth } from "./visualizerConfig";

interface ITPMmData {
    // stimulus: number[]
    layers: number[][]
}

class TPMm {
    x: number;
    y: number;
    width: number;
    height: number;
    config: TPMConfig;
    layers: Layer[];

    weights: number[][][]; //One number for each weight || layer -> neuron -> weight
    outputs: number[][]; //One number for each neuron || layer -> neuron

    constructor(x: number, y: number, config: TPMConfig) {
        this.x = x;
        this.y = y;
        this.config = config
        this.width = tpmWidth(config)
        this.height = tpmHeight(config)
        //Initialize all layers to 0 
        this.layers = []
        for (let i = 0; i < config.H; i++) {
            const newLayer = new Layer(getLayerXOffset(i),this.y,config.K[i],config.N[i])
            this.layers.push(newLayer)
        }

        this.weights = []
        this.outputs = []

    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'orange'; // Neuron color (gold)
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.layers.forEach((layer,index)=>{
            layer.draw(ctx)
        })
      }
    

    updateNetworkWeights(newWeights: number[][][]): void {
        this.layers.forEach((layer,index)=>{
            layer.updateLayerWeights(newWeights[index])
        })
    }

    updateNetworkOutputs(newOutputs: number[][]): void {
        this.layers.forEach((layer,index)=>{
            layer.updateLayerOutputs(newOutputs[index])
        })
    }

}

export {TPMm}
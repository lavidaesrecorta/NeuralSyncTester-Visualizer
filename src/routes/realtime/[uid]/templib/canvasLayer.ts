import { Neuron } from "./canvasNeuron";
import { layerHeight, layerWidth, neuronHeight, neuronMarginY, neuronWidth } from "./visualizerConfig";

const randomBinary = ()=>{
    return Math.round(Math.random());
  }


  
class Layer {
    x: number;
    y: number;
    width: number;
    height: number;
    neurons: Neuron[];

    layerStimCount: number;
    layerLength: number;

    constructor(x: number, y: number, layerLength: number, neuronStimCount: number) {
        this.x = x;
        this.y = y;
        
        this.layerStimCount = neuronStimCount
        this.layerLength = layerLength
        this.width = layerWidth
        this.height = layerHeight(this.layerStimCount,this.layerLength)

        this.neurons = []
        
        for (let index = 0; index < layerLength; index++) {
            const neuronYOffset = this.y + index*(neuronMarginY+neuronHeight(neuronStimCount))
            const newNeuron = new Neuron(this.x,neuronYOffset,neuronStimCount)
            this.neurons.push(newNeuron)            
        }

      }

      // Draw the neuron as a rectangle
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'blue'; // Neuron color (gold)
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.neurons.forEach((neuron,index)=>{
            neuron.draw(ctx)
        })
      }

      updateLayerWeights(newWeights: number[][]): void {
        this.neurons.forEach((neuron,index)=>{
            neuron.updateWeights(newWeights[index])
        })
      }
      updateLayerOutputs(newOutputs: number[]): void {
        this.neurons.forEach((neurons,index)=>{
            neurons.updateOutput(newOutputs[index])
        })
    }
}

export {Layer}
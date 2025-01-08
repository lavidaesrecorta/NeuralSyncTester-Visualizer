import { neuronHeight, neuronWidth, weightMarginX, weightMarginY, weightOffsetY, weightRadius } from "./visualizerConfig";

class Neuron {
    x: number;
    y: number;
    width: number;
    height: number;
    weightsCount: number;
    weights: number[];
    output: number;
  
    constructor(x: number, y: number, weightsCount: number) {
      this.x = x;
      this.y = y;
      this.width = neuronWidth;
      this.height = neuronHeight(weightsCount);
      this.weightsCount = weightsCount; // Initialize the weight array
      this.weights = []
      for (let i = 0; i < weightsCount; i++) {
        this.weights.push(0)
      }
      this.output = 0
    }
  
    // Draw the neuron as a rectangle
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = this.output<=0 ? 'purple': 'green'; // Neuron color (gold)
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.drawWeights(ctx); // Draw weight inside the neuron
    }
  
    // Draw the weight (circles) inside the neuron
    drawWeights(ctx: CanvasRenderingContext2D): void {
      for (let i = 0; i < this.weights.length; i++) {            
            ctx.fillStyle = this.weights[i]<=0 ? 'red': 'blue'; // weight color (orange)
            ctx.beginPath();
            ctx.arc(this.x+weightRadius+weightMarginX, this.y+weightMarginY*2+(weightOffsetY*i)+weightRadius, weightRadius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    }
  
    updateOutput(data: number): void {
        this.output = data;
      }
    updateWeights(data: number[]): void {
      this.weights = data;
    }

    // Check if a point (x, y) is inside the neuron's rectangle
    isInsideNeuron(x: number, y: number): boolean {
      return (
        x >= this.x &&
        x <= this.x + this.width &&
        y >= this.y &&
        y <= this.y + this.height
      );
    }
  
    // // Connect this neuron to another neuron
    // connectTo(neuron: Neuron): void {
    //   this.connections.push(neuron);
    // }
  }  
  export { Neuron };
  
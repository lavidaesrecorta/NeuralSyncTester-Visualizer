import type { TPMConfig } from "$lib/realtime-viz/visualizer.config"

export const weightRadius= 10
export const weightMarginX= 5
export const weightMarginY= 5
export const weightOffsetY= weightRadius*2 + weightMarginY
export const neuronWidth = weightRadius*2 +weightMarginX*2
export const neuronHeight = (weightCount: number) => {return (weightRadius*2 + weightMarginY*2)*weightCount}

export const inputMarginX = 0
export const neuronMarginY = 15
export const layerMarginx = 15
export const layerWidth = neuronWidth
export const layerHeight = (weightCount: number, layerLength: number) => {return ((weightRadius*2 + weightMarginY*2)*weightCount)*layerLength+ neuronMarginY*(layerLength-1) }

export const getLayerXOffset = (layerIndex: number, networkWidth: number,reversed: boolean) => {
    if (reversed) return networkWidth - neuronWidth - (inputMarginX + (layerMarginx+neuronWidth)*layerIndex)
    return (layerMarginx+layerWidth) * layerIndex
}

export const tpmWidth = (config: TPMConfig) => {
    const maxWidth = (layerWidth+layerMarginx)*config.H
    return maxWidth
}
export const tpmHeight = (config: TPMConfig) => {
    const maxHeight = layerHeight(config.N[0], config.K[0])
    return maxHeight
}


export const interpolateRedBlue = (t: number) => {
    // Map t from the range [-1, 1] to [0, 1]
    const mappedT = (t + 1) / 2;
  
    // Ensure mappedT is between 0 and 1
    const clampedT = Math.min(Math.max(mappedT, 0), 1);
  
    // Interpolate for each color channel (red, green, and blue)
    const red = Math.round(255 * (1 - clampedT));   // Red decreases as t increases
    const green = 0;                               // No green in between
    const blue = Math.round(255 * clampedT);       // Blue increases as t increases
  
    // Return the resulting color as an RGB string
    return `rgb(${red}, ${green}, ${blue})`;
  }
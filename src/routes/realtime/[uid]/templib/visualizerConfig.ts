import type { TPMConfig } from "$lib/realtime-viz/visualizer.config"

export const weightRadius= 10
export const weightMarginX= 5
export const weightMarginY= 5
export const weightOffsetY= weightRadius*2 + weightMarginY
export const neuronWidth = weightRadius*2 +weightMarginX*2
export const neuronHeight = (weightCount: number) => {return (weightRadius*2 + weightMarginY*2)*weightCount}

export const neuronMarginY = 15
export const layerMarginx = 15
export const layerWidth = neuronWidth
export const layerHeight = (weightCount: number, layerLength: number) => {return ((weightRadius*2 + weightMarginY*2)*weightCount)*layerLength+ neuronMarginY*(layerLength-1) }

export const getLayerXOffset = (layerIndex: number) => {
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

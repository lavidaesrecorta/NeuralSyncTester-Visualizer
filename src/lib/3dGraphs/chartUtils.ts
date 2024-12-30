export interface GraphRequestData{
    X: string,
    Y: string,
    LearnRule: string,
    Scenario: string,
    TableName?: string,
}

export interface ChartLabels3D{
    xLabel: string,
    yLabel: string,
    zLabel: string,
    defaultLegend: string,
    legends: string[]
}

export interface ChartData3D{
    graphRequest: GraphRequestData,
    headers: string[],
    data: any[][],
    labels: ChartLabels3D
}

export const zGraphLabels = {
    "stimulate_min":"Minimo de Estimulaciones totales",
    "stimulate_max":"Maximo de Estimulaciones totales",
    "stimulate_avg":"Promedio de Estimulaciones totales",
    "learn_min":"Minimo de Aprendizajes",
    "learn_max":"Maximo de Aprendizajes",
    "learn_avg":"Promedio de Aprendizajes"
    }
    

export const getSeriesFromSet = (dataArray: any[][], legends: string[]) => {

    let newSeries = []

    //Start from index two because 0 and 1 are X and Y
    //This for iterates horizontally
    for (let index = 2; index < dataArray[0].length; index++) {
        const axisLabel = legends[index-2]
        const newEntry = {
            type: 'bar3D',
            shading: 'lambert',
            coordinateSystem: 'cartesian3D',
            name: axisLabel,
            data: dataArray.map(d => [d[0],d[1],d[index]]),
          }

        newSeries.push(newEntry)
    }

    return newSeries
    
}


export const availableLearnRules = ["HEBBIAN", "ANTI-HEBBIAN", "RANDOM-WALK"]
export const availableScenarios = ["NO_OVERLAP", "FULLY_CONNECTED", "PARTIALLY_CONNECTED"]
export const availableAxis = ["H", "N_0", "M", "L", "data_size"]
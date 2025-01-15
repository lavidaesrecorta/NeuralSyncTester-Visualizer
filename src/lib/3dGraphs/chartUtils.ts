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


export const getSeriesFromSet = (dataArray: any[][], legends: string[]) => {

    let newSeries = []
    try {
        
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
    } catch (error) {
        return null
    }

    return newSeries
    
}


export const availableLearnRules = ["HEBBIAN", "ANTI-HEBBIAN", "RANDOM-WALK"]
export const availableScenarios = ["NO_OVERLAP", "FULLY_CONNECTED", "PARTIALLY_CONNECTED"]
export const availableAxis = ["H", "N_0", "M", "L", "data_size"]

export const zGraphLabels = {
"stimulate_min":"Minimo de Estimulaciones totales",
"stimulate_max":"Maximo de Estimulaciones totales",
"stimulate_avg":"Promedio de Estimulaciones totales",
"learn_min":"Minimo de Aprendizajes",
"learn_max":"Maximo de Aprendizajes",
"learn_avg":"Promedio de Aprendizajes"
}


export const chartSurfaceTypes = {
    'D_vs_H': {
        title: "Cantidad de Datos vs Número de Capas",
        xAxisLabel: "Cantidad de Datos",       
        yAxisLabel: " Número de Capas",       
        zAxisLabel: "Iteraciones",       
    },
    'H_vs_L': {
        title: "Número de Capas vs Profundidad de Pesos Sinápticos",
        xAxisLabel: "Número de Capas",       
        yAxisLabel: "Profundidad de Pesos Sinápticos",       
        zAxisLabel: "Iteraciones",       
    },
    'H_vs_N0':{
        title: "Número de Capas vs Cantidad de estímulos en la primera capa",
        xAxisLabel: "Número de Capas",       
        yAxisLabel: "Cantidad de estímulos en la primera capa",       
        zAxisLabel: "Iteraciones",       
    },
    'M_vs_N0': {
        title: "Profundidad de Estímulos de entrada vs Cantidad de estímulos en la primera capa",
        xAxisLabel: "Profundidad de Estímulos de entrada",       
        yAxisLabel: "Cantidad de estímulos en la primera capa",       
        zAxisLabel: "Iteraciones",       
    },
}

export const getSeriesFromSet = (dataArray: any[]) => {

    let newSeries = []

    for (let index = 2; index < dataArray[0].length; index++) {
        const element = dataArray[0][index];
        const axisLabel = zGraphLabels[element] ?? element
        const newEntry = {
            type: 'bar3D',
            coordinateSystem: 'cartesian3D',
            name: axisLabel,
            data: dataArray.map(d => [d[0],d[1],d[index]]),
          }

        newSeries.push(newEntry)
    }

    return newSeries
    
}
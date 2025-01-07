<script lang="ts">
	import Bar3d from "$lib/3dGraphs/bar3d.svelte";
	import { availableAxis, availableLearnRules, availableScenarios, getSeriesFromSet, type ChartData3D, type GraphRequestData } from "$lib/3dGraphs/chartUtils";
	import RequestGraphForm from "$lib/3dGraphs/requestGraphForm.svelte";
	import { t } from "$lib/translations";

const getLabel = (labelName: string) => {
    const labelLocaleName = `${labelName}_axis`
    return $t(labelLocaleName)
}

const getHeaderLegends = (labels: string[]) => {
    let newLabels = labels.slice(2)
    newLabels = newLabels.map((element:string) => $t(element))
    return newLabels
}

const getDefaultLegend = (labels: string[]) => {
    let output: any = {}
    for (let i = 0; i < labels.length; i++) {
        const element = labels[i];
        let setDefault = false      
        if (element == $t("stimulate_avg")) setDefault = true
        output[element]=setDefault
    }
    
    return output 
}

let graphObjects: ChartData3D[]= []
const getDataFromAPI = async (postData: GraphRequestData) => {
    
    const response = await fetch("/api/3dgraphs",{
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'content-type': 'application/json'
			}
		})
    const graphResponse = await response.json();

    const legends = getHeaderLegends(graphResponse.data[0])
    const defaultLegend = getDefaultLegend(legends)
    const graphObject = {
        graphRequest: postData,
        headers: graphResponse.data[0],
        data: graphResponse.data.slice(1),
        labels: {
            xLabel: getLabel(postData.X),
            yLabel: getLabel(postData.Y),
            zLabel: $t("Z_axis"),
            defaultLegend: defaultLegend,
            legends: legends
        }

    }

    graphObjects = [...graphObjects, graphObject]
    console.log(graphObjects);
    
    
    
}


const formLabels = {
    form: {
        learnRule: $t("graphs3d.form.learnRule"),
        tpm_type: $t("graphs3d.form.tpm_type"),
        xAxis: $t("graphs3d.form.xAxis"),
        yAxis: $t("graphs3d.form.yAxis"),
    },
    axisLabels: availableAxis.map((element) =>  {return [element, $t(`${element}_axis`)]}),
    learnRulesLabels: availableLearnRules.map((element) =>  {return [element, $t(element)]}),
    scenarioLabels: availableScenarios.map((element) =>  {return [element, $t(`${element}_scenario`)]}),
}

</script>

<div class="md:w-full md:p-24 md:h-full grid grid-cols-[1fr_1fr] gap-4">
    <h1 class="text-3xl col-span-2">{$t("graphs3d.title")}</h1>
    {#each graphObjects as graph}
        <Bar3d chartObject={graph} />
    {/each}
    <RequestGraphForm {formLabels} requestFunction={getDataFromAPI}/>
</div>


<style>
    
</style>
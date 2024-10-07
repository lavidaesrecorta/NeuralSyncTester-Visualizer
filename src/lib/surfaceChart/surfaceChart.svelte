<script lang="ts">
    import { Chart } from 'svelte-echarts';
    import { onMount } from 'svelte';
    import { init, use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, VisualMapComponent, LegendComponent } from 'echarts/components';
    import { CanvasRenderer } from 'echarts/renderers';
	import { zGraphLabels } from './chartUtils';
  
    // Placeholder for options, initialized later
    let options = {};

    export let chartObject = {}
  
    onMount(async () => {
      try {
        // Dynamically import the SurfaceChart and Grid3D components
        const { Bar3DChart } = await import('echarts-gl/charts');
        const { Grid3DComponent } = await import('echarts-gl/components');
  
        // Ensure both components are imported
        if (!Bar3DChart || !Grid3DComponent) {
          throw new Error('SurfaceChart or Grid3D is not available');
        }
  
        // Register the components including SurfaceChart and Grid3D
        use([Bar3DChart, TitleComponent, CanvasRenderer, TooltipComponent, VisualMapComponent, LegendComponent, Grid3DComponent]);

        const selectedLabels = {}

        Object.values(zGraphLabels).forEach(element => {
            selectedLabels[element] = element == zGraphLabels["stimulate_avg"];
        });
        
        

        // Set up the chart options with cartesian3D coordinate system
        options = {
          title: {
            text: 'ECharts GL Surface Example',
          },
          tooltip: {trigger: 'item',
          formatter(params) {
            
    return `${params.marker} ${params.seriesName}
    <br /><b><p>${chartObject.chartType.xAxisLabel}: ${params.value[0]}
    <br />${chartObject.chartType.yAxisLabel}: ${params.value[1]}
    <br />${chartObject.chartType.zAxisLabel}: ${params.value[2]}</p></b>`;
  }},
          legend: {
            data: Object.values(zGraphLabels),
            selected: selectedLabels
            },
          visualMap: {
            min: 0,
            max: 2000,
            dimension: 2,
            inRange: {
              color: ['#50a3f1', '#eac763', '#d94e5d'],
            },
          },
          // Define 3D axes
          xAxis3D: {
            type: 'value',
            name: chartObject.chartType.xAxisLabel,
          },
          yAxis3D: {
            type: 'value',
            name: chartObject.chartType.yAxisLabel,
          },
          zAxis3D: {
            type: 'value',
            name: chartObject.chartType.zAxisLabel,
          },
          // Define the grid3D for 3D coordinate system
          grid3D: {
            show: true,
            viewControl: {
              // Specify the 3D view control options here
              projection: 'perspective',
            },
          },
          // Specify the series with 3D coordinate system
          series: chartObject.series,
        };
      } catch (error) {
        console.error("Error importing components:", error);
      }
    });
  </script>
  
  <div class="app">
    {#if options.title}
      <Chart {init} {options} />
    {/if}
  </div>
  
  <style>
    .app {
      width: 100%;
      height: 100%;
    }
  </style>
  
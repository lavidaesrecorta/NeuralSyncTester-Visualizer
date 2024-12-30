<script lang="ts">
    import { Chart } from 'svelte-echarts';
    import { onMount } from 'svelte';
    import { init, use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, ToolboxComponent, VisualMapComponent, LegendComponent } from 'echarts/components';
    import { CanvasRenderer } from 'echarts/renderers';
	import { getSeriesFromSet, type ChartData3D } from './chartUtils';
  
    // Placeholder for options, initialized later
    let options = {};

    export let chartObject: ChartData3D
    const selectedLabels = {}
    
    const series = getSeriesFromSet(chartObject.data,chartObject.labels.legends)

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
        use([Bar3DChart, TitleComponent, CanvasRenderer, TooltipComponent, ToolboxComponent, VisualMapComponent, LegendComponent, Grid3DComponent]);
        
        

        // Set up the chart options with cartesian3D coordinate system
        options = {
          title: {
            // text: chartObject.chartType.title,
            text: "",
          },
          tooltip: {trigger: 'item',
          formatter(params) { 
            return `${params.marker} ${params.seriesName}
            <br /><b><p>${chartObject.labels.xLabel}: ${params.value[0]}
            <br />${chartObject.labels.yLabel}: ${params.value[1]}
            <br />${chartObject.labels.zLabel}: ${params.value[2]}</p></b>`;
          }},
          toolbox: {
            show: true,
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            data: chartObject.labels.legends,
            selected: chartObject.labels.defaultLegend,
            top: 35,
            },
          visualMap: {
            show: false,
            min: 0,
            max: 250000,
            dimension: 2,
            inRange: {
              color: ['#50a3f1', '#eac763', '#d94e5d'],
            },
          },
          // Define 3D axes
          xAxis3D: {
            type: 'category',
            name: chartObject.labels.xLabel,
          },
          yAxis3D: {
            type: 'category',
            name: chartObject.labels.yLabel,
          },
          zAxis3D: {
            type: 'value',
            name: chartObject.labels.zLabel,
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
          series: series,
        };
      } catch (error) {
        console.error("Error importing components:", error);
      }
    });
  </script>
  
  <div class="display h-[768px]">
    {#if options.title}
      <Chart {init} {options} />
    {/if}
  </div>
  
  <style>
    /* .display {
      width: 100vw;
      height: 100vh;
      padding: 10px;
    } */
  </style>
  
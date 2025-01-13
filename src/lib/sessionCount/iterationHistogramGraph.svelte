<script lang="ts">
    import { Chart } from 'svelte-echarts';
    import { onMount } from 'svelte';
    import { init, use } from 'echarts/core';
    import { TitleComponent, TooltipComponent, ToolboxComponent, VisualMapComponent, LegendComponent, GridComponent } from 'echarts/components';
    import { CanvasRenderer } from 'echarts/renderers';
    import { BarChart } from 'echarts/charts'
  
    // Placeholder for options, initialized later
    
    export let seriesData
    export let axisData


    const normalizedFormmater = (maxValue: number) => {
      const  formatter = (params) => { 
            return `${params.seriesName}
            <br /> ${params.marker} <strong>${params.name}:</strong> ${params.value*maxValue/100} (${params.value}%)
            `;
          }
      return formatter
    }

    const defaultFormatter = () => {
      const formatter = (params) => { 
            return `${params.seriesName}
            <br /> ${params.marker} <strong>${params.name}:</strong> ${params.value}%
            `;
          }
      return formatter
    }

    let options = {
  legend: {},
  title: {
            text: "",
          },
  tooltip: {trigger: 'item', formatter: defaultFormatter()},
  xAxis: { type: 'category',
    data: axisData.data,
    axisLabel: {
      interval: 0
    }
   },
   yAxis: {},
  series: seriesData.map((entry) => {
    return {type: 'bar',
      name: entry.name,
      data:entry.data,
      tooltip: {
        formatter: entry.normalizeFactor!=1 ? normalizedFormmater(entry.normalizeFactor) : defaultFormatter() 
      } 
    }
  })
};
    

    onMount(async () => {
      try {
        // Dynamically import the SurfaceChart and Grid3D components

        use([BarChart, GridComponent, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent])
        
      } catch (error) {
        console.error("Error importing components:", error);
      }
    });
  </script>
  
  <div class="display h-[512px]">
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
  
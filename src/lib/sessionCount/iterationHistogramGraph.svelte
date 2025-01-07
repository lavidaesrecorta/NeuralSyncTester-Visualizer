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
    
    let options = {
  legend: {},
  title: {
            text: "",
          },
  tooltip: {},
  xAxis: { type: 'category',
    data: axisData.data
   },
   yAxis: {},
  series: seriesData.map((entry) => {
    return {type: 'bar',
      name: entry.name,
      data:entry.data}
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
  
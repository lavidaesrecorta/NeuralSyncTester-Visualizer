<script lang='ts'>

import { Chart } from 'svelte-echarts'

import { init, use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
    
    // now with tree-shaking
    use([PieChart, GridComponent, CanvasRenderer, TitleComponent, TooltipComponent, ToolboxComponent, LegendComponent])
    
export let session: {
        learn_rule: string,
        tpm_type: string,
        h_l_group: string,
        total_count: number,
        finished_count: number,
    } = {}
    
    let percentage = session.finished_count / session.total_count
let options ={
  title: {
    text: ``,
    subtext: `${session.learn_rule}`,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Finished sessions percentages',
      type: 'pie',
      stillShowZeroSum: false,
      radius: '50%',
      label: {position: 'outside', formatter: '{d}%', color:'black',  fontSize:18},
      percentPrecision: 0,
      data: [
        { value: session.finished_count, name: 'Finished Sessions' },
        { value: session.total_count-session.finished_count, name: 'Unfinished Sessions' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>

<div class="display">
<Chart {init} {options} />
</div>

<style>
.display {
  width: 100%;
  height: 100%;
}
</style>
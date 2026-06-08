<template>
  <div>
    <h2>ECharts 图表示例</h2>
    <div ref="chartRef" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    title: { text: '经营地块面积统计' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['耕地', '林地', '草地'] },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis: { type: 'value' },
    series: [
      { name: '耕地', type: 'bar', data: [12, 18, 25, 30, 28, 35] },
      { name: '林地', type: 'bar', data: [8, 12, 15, 18, 22, 26] },
      { name: '草地', type: 'bar', data: [3, 5, 7, 10, 12, 15] }
    ]
  })

  window.addEventListener('resize', resize)
})

function resize() {
  chartInstance?.resize()
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chartInstance?.dispose()
})
</script>

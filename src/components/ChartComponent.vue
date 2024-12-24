<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Chart } from 'chart.js/auto'

// Пропсы
const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: 'line',
  },
})

// Локальные переменные
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

// Функция для отрисовки графика
const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy() // Удалить старый график
  }

  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d')!
    chartInstance = new Chart(ctx, {
      type: props.type, // Тип графика
      data: props.chartData,
      options: props.chartOptions,
    })
  }
}

// Хук для инициализации
onMounted(() => {
  renderChart()
})

// Наблюдение за изменением chartData
watch(
  () => props.chartData,
  () => {
    renderChart()
  },
  { deep: true },
)
</script>

<style scoped>
/* При необходимости добавьте стили */
</style>

<script setup lang="ts">

import {Line} from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement, PointElement, CoreChartOptions
} from 'chart.js'
import {ref, watch} from "vue";
import {DateTime} from "luxon";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

const props = defineProps(['times', 'onPickerChange']);

const date = ref();
const chartData = ref({
  labels: [...Array.from({length:DateTime.now().endOf("month").day},(v,k)=>k+1)],
  datasets: [
    {
      label: 'En ligne',
      backgroundColor: '#ffd000',
      data: [],
      tension: 0.2
    }
  ]
})

const chartOptions: Partial<CoreChartOptions<Line>> = {
  responsive: true,
  maintainAspectRatio: false,
}

watch(() => props.times, (times) => {
  let connectedInSection = {};
  if (times.length > 0) {
    let currentDay = DateTime.fromISO(times[0].start).day;
    for (let i = 0; i < times.length; i++) {
      if (times[i - 1]?.end !== undefined && DateTime.fromISO(times[i - 1].end).day < DateTime.fromISO(times[i].start).day) {
        currentDay = DateTime.fromISO(times[i].start).day;
      }
      const end = DateTime.fromISO(times[i].end);
      const start = DateTime.fromISO(times[i].start);
      const diff = end.diff(start, 'hours');
      if (connectedInSection[currentDay] === undefined) {
        connectedInSection[currentDay] = [];
      }
      connectedInSection[currentDay].push(diff.toObject().hours)
    }
  }
  chartData.value = {
    labels: [...Array.from({length:DateTime.now().endOf("month").day},(v,k)=>k+1)],
    datasets: [
      {
        label: 'En ligne',
        backgroundColor: '#ffd000',
        data: [...Array.from({length:DateTime.now().endOf("month").day},(v,k)=>k+1).map((day) => {
          const section = Object.keys(connectedInSection).find((a) => a == day);
          if (section == undefined)
            return 0;
          return connectedInSection[section].reduce((hours, currentValue) => currentValue + hours, 0)
        })],
        tension: 0.2
      },
    ]
  }
});

const onMonthChange = (event) => {
  props.onPickerChange(event);
}


</script>

<template>
  <div class="title">
    <h2>Monthly</h2>
    <Datepicker class="picker" v-model="date" :month-picker="true" @update:modelValue="onMonthChange"/>
  </div>
  <Line
      :chart-options="chartOptions"
      :chart-data="chartData"
  />
</template>

<style scoped>
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.picker {
  width: 350px
}
</style>
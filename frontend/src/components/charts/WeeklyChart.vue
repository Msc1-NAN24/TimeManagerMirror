<script setup lang="ts">

import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  CoreChartOptions, LineElement, PointElement
} from 'chart.js'
import {onUpdated, ref, watch} from "vue";
import {DateTime} from "luxon";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

const props = defineProps(['times', 'onPickerChange']);
const date = ref();

const chartData = ref({
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  datasets: [
    {
      label: 'En ligne',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
});

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
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
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
      }
    ]
  }
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}


</script>

<template>
  <div class="title">
    <h2>Weekly</h2>
    <Datepicker class="picker" v-model="date" week-picker @update:modelValue="(v) => props.onPickerChange(v)"/>
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
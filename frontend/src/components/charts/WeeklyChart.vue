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

const props = defineProps(['times', 'onPickerChange', 'startingDay']);
const date = ref();

const chartData = ref({
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  datasets: [
    {
      label: 'En ligne',
      fill: true,
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
});

watch(() => props.times, (times) => {
  let connectedInSection = {};
  if (times.length > 0) {
    for (let i = 0; i < 7; i++) {
      connectedInSection[i] = times.filter((wt) => DateTime.fromISO(wt.start).day % 7 === i).reduce((last, time) => last + DateTime.fromISO(time.end).diff(DateTime.fromISO(time.start), 'hours').toObject().hours, 0);
    }
  }
  console.log('a', connectedInSection);
  chartData.value = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'En ligne',
        backgroundColor: '#ffd000',
        fill: true,
        data: [...Array.from({length: 6},(v,k)=>k+1).map((day) => {
          const section = Object.keys(connectedInSection).find((a) => a == day - 1);
          if (section == undefined)
            return 0;
          return connectedInSection[section];
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
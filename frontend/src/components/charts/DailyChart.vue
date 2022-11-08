<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  CoreChartOptions
} from 'chart.js'
import {onUpdated, ref, watch} from "vue";
import {DateTime} from "luxon";
import {IWorkingTime} from "@/dto/workingTime";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const props = defineProps(['times']);

const chartData = ref({
  labels: [ 'En ligne', 'Hors ligne'],
  datasets: [ { data: [0, 0], backgroundColor: ['#41B883', 'rgba(140,140,140,0.49)']} ]
});

const chartOptions: Partial<CoreChartOptions<Doughnut>> = {
  responsive: true,
  aspectRatio: 1.5,
}

watch(() => props.times, (times) => {
  let connectedInSection = 0
  for (let wt: IWorkingTime of times) {
    console.log(wt);
    const end = DateTime.fromISO(wt.end);
    const start = DateTime.fromISO(wt.start);
    const diff = end.diff(start, 'hours');
    connectedInSection += diff.toObject().hours ?? 0;
  }
  connectedInSection = parseFloat(connectedInSection.toFixed(1));
  chartData.value = {
    labels: [ 'En ligne', 'Hors ligne'],
    datasets: [{ data: [connectedInSection, 7-connectedInSection], backgroundColor: ['#41B883', 'rgba(140,140,140,0.49)']}],
  }
});
</script>

<template>
  <h2>Daily</h2>
  <Doughnut
      :chart-options="chartOptions"
      :chart-data="chartData"
  />
</template>
<style scoped>

</style>
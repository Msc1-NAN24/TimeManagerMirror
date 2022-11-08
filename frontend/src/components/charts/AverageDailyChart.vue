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
  LineElement, PointElement
} from 'chart.js'
import {ref} from "vue";
import {DateTime} from "luxon";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

const date = ref();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

const chartData = ref({
  labels: [...Array.from({length: 13},(v,k)=> `${k+8}h`)],
  tension: 0.3,
  datasets: [
    {
      label: 'Nicolas',
      data: [40, 39, 10, 40, 39, 80, 40],
      tension: 0.2,
      borderColor: "#c45850",
      fill: false
    },
    {
      label: 'Hugo',
      data: [20, 10, 30, 35, 39, 50, 60],
      tension: 0.2,
      borderColor: "#5079c4",
      fill: false
    }
  ]
});

</script>

<template>
  <div class="root">
    <div class="title">
      <h2>Temps de connexion journalier</h2>
      <Datepicker class="picker" v-model="date"/>
    </div>
    <Line
        :chart-options="chartOptions"
        :chart-data="chartData"
    />
  </div>
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

<style scoped>
  .root {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
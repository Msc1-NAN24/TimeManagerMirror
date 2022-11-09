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
import {ref, watch} from "vue";
import User from "@/components/User.vue";
import {IWorkingTime} from "@/dto/workingTime";
import {DateTime} from "luxon";

export type UserWorkingTime = {
  user: User,
  times: IWorkingTime[];
}

const colors = ["#2ecc71", "#3498db", "#9b59b6", "#e74c3c", "#e67e22", "#f1c40f", "#34495e"]

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

const props = defineProps(['times', 'numberOfMonths']);
const date = ref();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

const chartData = ref({
  labels: [...Array.from({length: props.numberOfMonths},(v,k)=> `${k+1}`)],
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

watch(() => props.times, (times: UserWorkingTime[]) => {
  const data = times.map((t, index) => {
    let connectedInSection = {};
    if (t.times.length > 0) {
      for (let i = 0; i < props.numberOfMonths; i++) {
        connectedInSection[i] = t.times.filter((wt) => DateTime.fromISO(wt.start).day === i).reduce((last, time) => last + DateTime.fromISO(time.end).diff(DateTime.fromISO(time.start), 'hours').toObject().hours, 0);
      }
    }
    return {
      label: `${t.user.firstname} ${t.user.lastname.toUpperCase()}`,
      tension: 0.2,
      borderColor: colors[index % colors.length],
      fill: false,
      data: [...Array.from({length: props.numberOfMonths},(v,k)=> k+1).map((day) => {
        const section = Object.keys(connectedInSection).find((a) => a == day);
        if (section == undefined)
          return 0;
        return connectedInSection[section];
      })],
    }
  });
  chartData.value = {
    labels: [...Array.from({length: props.numberOfMonths},(v,k)=> `${k+1}`)],
    tension: 0.3,
    datasets: [
        ...data
    ]
  }
});

</script>

<template>
  <div class="root">
    <div class="title">
      <h2>Rapport de connexion mensuel</h2>
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
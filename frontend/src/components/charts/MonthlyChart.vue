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

const props = defineProps(['times', 'onPickerChange', 'numberOfDays']);

const now = DateTime.now();
const date = ref({month: now.month-1, year: now.year});

const chartData = ref({
  labels: [...Array.from({length: props.numberOfDays},(v,k)=>k+1)],
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
  console.log(props.times);
  let connectedInSection = {};
  if (times.length > 0) {
    for (let i = 0; i < props.numberOfDays; i++) {
      connectedInSection[i] = times.filter((wt) => DateTime.fromISO(wt.start).day === i).reduce((last, time) => last + DateTime.fromISO(time.end).diff(DateTime.fromISO(time.start), 'hours').toObject().hours, 0);
    }
  }
  chartData.value = {
    labels: [...Array.from({length: props.numberOfDays},(v,k)=>k+1)],
    datasets: [
      {
        label: 'En ligne',
        backgroundColor: '#ffd000',
        data: [...Array.from({length:DateTime.now().endOf("month").day},(v,k)=>k+1).map((day) => {
          const section = Object.keys(connectedInSection).find((a) => a == day);
          if (section == undefined)
            return 0;
          return connectedInSection[section];
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
    <h2>Récap mensuel</h2>
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
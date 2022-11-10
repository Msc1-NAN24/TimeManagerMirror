<script setup lang="ts">
import { Doughnut } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  CoreChartOptions,
} from "chart.js";
import { ref, watch } from "vue";
import { DateTime } from "luxon";
import { IWorkingTime } from "@/dto/workingTime";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const props = defineProps(["times", 'reload']);

const chartData = ref({
  labels: ["En ligne", "Hors ligne"],
  datasets: [
    { data: [0, 0], backgroundColor: ["#41B883", "rgba(140,140,140,0.49)"] },
  ],
});

const chartOptions: Partial<CoreChartOptions<Doughnut>> = {
  responsive: true,
};

watch(
  () => props.times,
  (times) => {
    let connectedInSection = 0;
    for (let wt: IWorkingTime of times) {
      console.log(wt);
      const end = DateTime.fromISO(wt.end);
      const start = DateTime.fromISO(wt.start);
      const diff = end.diff(start, "hours");
      connectedInSection += diff.toObject().hours ?? 0;
    }
    connectedInSection = parseFloat(connectedInSection.toFixed(1));
    const labels =
      connectedInSection > 7 ? ["En ligne"] : ["En ligne", "Hors ligne"];

    const data =
      connectedInSection > 7
        ? [connectedInSection, (7 - connectedInSection) * -1]
        : [connectedInSection, 7 - connectedInSection];
    console.log(data);

    chartData.value = {
      labels: [
        connectedInSection > 7 ? "Heure supplémentaire" : "En ligne",
        "En ligne",
      ],
      datasets: [
        {
          data,
          backgroundColor: [
            connectedInSection > 7 ? "#fd334c" : "#41B883",
            connectedInSection > 7 ? "#41B883" : "rgba(140,140,140,0.49)",
          ],
        },
      ],
    };
  }
);
</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 10px; align-items: center">
    <h2>Journalier</h2>
    <v-btn
        size="x-small"
        class="ma-2"
        color="blue"
        @click="() => props.reload()"
        icon="mdi-refresh"
    ></v-btn>
  </div>
  <Doughnut :chart-options="chartOptions" :chart-data="chartData" />
</template>

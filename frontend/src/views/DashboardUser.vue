<script setup lang="ts">
import DailyChart from "@/components/charts/DailyChart.vue";
import { IsLogged, useAuthStore } from "@/store/AuthStore";
import workingTimeService from "@/services/workingTimes";
import WeeklyChart from "@/components/charts/WeeklyChart.vue";
import MonthlyChart from "@/components/charts/MonthlyChart.vue";
import { IWorkingTime } from "@/dto/workingTime";
import { onMounted, ref } from "vue";
import { DateTime } from "luxon";
import { useRoute } from "vue-router";
import userService from "@/services/users";

const auth = useAuthStore();
const route = useRoute();
const dailyWorkingTimes = ref<IWorkingTime[]>([]);
const id = Number(route.params.id);
const monthlyWorkingTimes = ref<IWorkingTime[]>([]);
const weeklyWorkingTimes = ref<IWorkingTime[]>([]);
const user = ref();

userService.getUserById(id).then((res) => (user.value = res));

auth.$subscribe(
  (mutation, state) => {
    loadWorkingTimes();
  },
  { deep: true }
);

const loadWorkingTimes = () => {
  const now = DateTime.now().setLocale("fr");
  const monthStart = now.startOf("month");
  const monthEnd = now.endOf("month");
  const weekStart = now.startOf("week");
  const weekEnd = now.endOf("week");
  if (auth.isLogged === IsLogged.Logged && auth.user !== undefined) {
    workingTimeService
      .getWorkingTimes(
        id,
        `${now.toFormat("yyyy-MM-dd")} 00:00:00`,
        `${now.plus({ day: 1 }).toFormat("yyyy-MM-dd")} 00:00:00`
      )
      .then((response) => {
        dailyWorkingTimes.value = response as IWorkingTime[];
      });
    workingTimeService
      .getWorkingTimes(
        id,
        `${weekStart.toFormat("yyyy-MM-dd")} 00:00:00`,
        `${weekEnd.toFormat("yyyy-MM-dd")} 00:00:00`
      )
      .then((response) => {
        weeklyWorkingTimes.value = response as IWorkingTime[];
      });
    workingTimeService
      .getWorkingTimes(
        id,
        `${monthStart.toFormat("yyyy-MM-dd")} 00:00:00`,
        `${monthEnd.toFormat("yyyy-MM-dd")} 00:00:00`
      )
      .then((response) => {
        monthlyWorkingTimes.value = response as IWorkingTime[];
      });
  }
};

onMounted(() => {
  if (auth.isLogged === IsLogged.Logged) {
    loadWorkingTimes();
  }
});

const onMonthChange = (event) => {
  console.log("ABC", event);
  const now = DateTime.now().set({ month: event.month + 1, year: event.year });
  const monthStart = now.startOf("month");
  const monthEnd = now.endOf("month");
  workingTimeService
    .getWorkingTimes(
      auth.user?.id!,
      `${monthStart.toFormat("yyyy-MM-dd")} 00:00:00`,
      `${monthEnd.toFormat("yyyy-MM-dd")} 00:00:00`
    )
    .then((response) => {
      monthlyWorkingTimes.value = response as IWorkingTime[];
    });
};

const onWeekChange = (event) => {
  const d1 = DateTime.fromJSDate(event[0]);
  const d2 = DateTime.fromJSDate(event[1]);
  workingTimeService
    .getWorkingTimes(
      auth.user?.id!,
      `${d1.toFormat("yyyy-MM-dd")} 00:00:00`,
      `${d2.toFormat("yyyy-MM-dd")} 00:00:00`
    )
    .then((response) => {
      weeklyWorkingTimes.value = response as IWorkingTime[];
    });
};
</script>

<template>
  <h2 class="title" v-if="id">
    Profile de {{ `${user?.firstname} ${user?.lastname}` }}
  </h2>
  <v-layout>
    <v-row no-gutters>
      <v-col lg="12" sm="12" md="12" cols="12">
        <WeeklyChart
          :times="weeklyWorkingTimes"
          :on-picker-change="onWeekChange"
        />
      </v-col>
      <v-col lg="4" cols="4">
        <DailyChart :times="dailyWorkingTimes" />
      </v-col>
      <v-col lg="8" cols="8">
        <MonthlyChart
          :times="monthlyWorkingTimes"
          :on-picker-change="onMonthChange"
        />
      </v-col>
    </v-row>
  </v-layout>
</template>

<style scoped>
.picker {
  width: 200px;
}
.title {
  font-weight: bold;
}
</style>

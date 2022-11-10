<script setup lang="ts">
import DailyChart from "@/components/charts/DailyChart.vue";
import { IsLogged, useAuthStore } from "@/store/AuthStore";
import workingTimeService from "@/services/workingTimes";
import WeeklyChart from "@/components/charts/WeeklyChart.vue";
import MonthlyChart from "@/components/charts/MonthlyChart.vue";
import { IWorkingTime } from "@/dto/workingTime";
import { onMounted, ref } from "vue";
import { DateTime } from "luxon";
import {useToast} from "vue-toast-notification";
import { Toast } from '@capacitor/toast';
import {LocalNotifications} from "@capacitor/local-notifications";

const auth = useAuthStore();
const toast = useToast();
const dailyWorkingTimes = ref<IWorkingTime[]>([]);
const monthlyWorkingTimes = ref<IWorkingTime[]>([]);
const weeklyWorkingTimes = ref<IWorkingTime[]>([]);
const selectedWindowDays = ref(30);
const startingDay = ref(0);

auth.$subscribe(
  (mutation, state) => {
    loadWorkingTimes();
  },
  { deep: true }
);

const loadMonthly = () => {
  const now = DateTime.now().setLocale("fr");
  const monthStart = now.startOf("month");
  const monthEnd = now.endOf("month");
  selectedWindowDays.value = monthEnd.day;
  workingTimeService
      .getWorkingTimes(
          auth.user?.id!,
          `${monthStart.toFormat("yyyy-MM-dd")} 00:00:00`,
          `${monthEnd.toFormat("yyyy-MM-dd")} 00:00:00`
      )
      .then((response) => {
        monthlyWorkingTimes.value = response as IWorkingTime[];
      });
}

const loadDaily = () => {
  const now = DateTime.now().setLocale("fr");
  workingTimeService
      .getWorkingTimes(
          auth.user?.id!,
          `${now.toFormat("yyyy-MM-dd")} 00:00:00`,
          `${now.plus({ day: 1 }).toFormat("yyyy-MM-dd")} 00:00:00`
      )
      .then((response) => {
        dailyWorkingTimes.value = response as IWorkingTime[];
      });
}

const loadWeekly = () => {
  const now = DateTime.now().setLocale("fr");
  const weekStart = now.startOf("week");
  const weekEnd = now.endOf("week");
  startingDay.value = weekStart.day;
  workingTimeService
      .getWorkingTimes(
          auth.user?.id!,
          `${weekStart.toFormat("yyyy-MM-dd")} 00:00:00`,
          `${weekEnd.toFormat("yyyy-MM-dd")} 00:00:00`
      )
      .then((response) => {
        weeklyWorkingTimes.value = response as IWorkingTime[];
      });
}

const loadWorkingTimes = () => {
  loadDaily();
  loadWeekly();
  loadMonthly();
};

onMounted( async () => {
  try {
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Title',
          body: 'Body',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) },
          actionTypeId: '',
          extra: null,
        },
      ],
    });
  } catch (er) {
    await Toast.show({
      text: 'Une erreur est survenue !',
    });
  }

  if (auth.isLogged === IsLogged.Logged) {
    loadWorkingTimes();
  }
});

const onMonthChange = (event) => {
  const now = DateTime.now().set({ month: event.month + 1, year: event.year });
  const monthStart = now.startOf("month");
  const monthEnd = now.endOf("month");
  selectedWindowDays.value = monthEnd.day;
  workingTimeService.getWorkingTimes(auth.user?.id!, `${monthStart.toFormat('yyyy-MM-dd')} 00:00:00`, `${monthEnd.toFormat('yyyy-MM-dd')} 00:00:00`).then((response) => {
    monthlyWorkingTimes.value = response as IWorkingTime[];
  });
}

const onWeekChange = (event) => {
  const d1 = DateTime.fromJSDate(event[0])
  const d2 = DateTime.fromJSDate(event[1])
  startingDay.value = d1.day;
  workingTimeService.getWorkingTimes(auth.user?.id!, `${d1.toFormat('yyyy-MM-dd')} 00:00:00`, `${d2.toFormat('yyyy-MM-dd')} 00:00:00`).then((response) => {
    weeklyWorkingTimes.value = response as IWorkingTime[];
  });
}

const onReloadMonthly = () => {
  loadMonthly();
  toast.success("Données mise à jour");
}

const onReloadDaily = () => {
  loadDaily();
  toast.success("Données mise à jour");
}

const onReloadWeekly = () => {
  loadWeekly();
  toast.success("Données mise à jour");
}

</script>

<template>
  <h1>Bienvenue sur votre tableau de bord, {{auth.user?.firstname}}</h1>
  <p>Suivez en temps réel votre temps de travail en entreprise</p>
  <v-row no-gutters style="margin-top: 20px;">
    <v-col lg="12" sm="12" md="12" cols="12">
      <WeeklyChart :times="weeklyWorkingTimes" :on-picker-change="onWeekChange" :starting-day="startingDay" :reload="onReloadWeekly"/>
    </v-col>
    <v-col lg="4" cols="12">
      <DailyChart :times="dailyWorkingTimes" :reload="onReloadDaily"/>
    </v-col>
    <v-col lg="8" cols="12">
      <MonthlyChart :times="monthlyWorkingTimes" :on-picker-change="onMonthChange" :number-of-days="selectedWindowDays" :reload="onReloadMonthly"/>
    </v-col>
  </v-row>
</template>

<style scoped>
.picker {
  width: 200px;
}
</style>

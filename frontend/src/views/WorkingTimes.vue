<script setup lang="ts">
import { IWorkingTime } from "@/dto/workingTime";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/Api";

import WorkingTime from "../components/WorkingTime.vue";

const route = useRoute();
const router = useRouter();

const userId = ref(route.params.userid);
const workingTimes = reactive<IWorkingTime[]>([]);

async function getWorkingtimes() {
  try {
    const { data } = await axios.get<IWorkingTime[]>(
      `/workingtimes/user/${userId.value}`,
      {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    router.push("/not-found");
  }
}

setInterval(
  async () => {
    workingTimes.splice(
      0,
      workingTimes.length,
      ...((await getWorkingtimes()) ?? [])
    );
  },
  1000,
  { immediate: true }
);

setInterval(async () => {
  workingTimes.splice(
    0,
    workingTimes.length,
    ...((await getWorkingtimes()) ?? [])
  );
}, 10000);
</script>

<template>
  <div
    id="workingtimes__list"
    v-if="workingTimes !== null"
    v-for="workingTime in workingTimes"
  >
    <WorkingTime
      :workingTime="workingTime"
      @clicked="
        () => {
          router.push(`/workingtimes/${userId}/${workingTime.id}`);
        }
      "
    />
  </div>
</template>

<style scoped>
#workingtimes__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  gap: 1rem;
}
</style>

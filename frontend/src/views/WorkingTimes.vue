<script setup lang="ts">
import { IWorkingTime } from "@/dto/workingTime";
import {onMounted, reactive, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/Api";
import { Vue3Lottie } from 'vue3-lottie'

import noData from '../assets/no-data.json'
import WorkingTime from "../components/WorkingTime.vue";
import userService from "@/services/users";
import {IUser} from "@/dto/user";
import {useToast} from "vue-toast-notification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const userId = ref(route.params.userid);
const workingTimes = reactive<IWorkingTime[]>([]);
const user = ref<undefined | IUser>(undefined);

async function getWorkingtimes() {
  try {
    const { data } = await axios.get<IWorkingTime[]>(
      `/workingtimes/user/${userId.value}`,
      {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      } as any
    );
    return data;
  } catch (error) {
    console.error(error);
    router.push("/not-found");
  }
}

onMounted(() => {
  userService.getUserById(userId.value as string).then((response) => {
    user.value = response as IUser;
  }).catch((err) => {
    toast.error("Utilisateur non trouvé !");
    router.push({path: '/'});
  });
});

async function update() {
  workingTimes.splice(
    0,
    workingTimes.length,
    ...((await getWorkingtimes()) ?? [])
  );
}

watch(
  [userId],
  () => {
    update();
  },
  { immediate: true }
);

setInterval(() => {
  update();
}, 1000);
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
  <div class="not-found" v-if="workingTimes !== null && workingTimes.length <= 0 && user !== undefined">
    <h1>{{user.firstname}} {{user.lastname.toUpperCase()}} n'a pas de temps de travail</h1>
    <Vue3Lottie :animationData="noData" style="max-width: 500px" />
  </div>
</template>

<style scoped>

.not-found {
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
}

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

<script setup lang="ts">
import { IWorkingTime } from "@/dto/workingTime";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/Api";
import * as luxon from "luxon";
import { IsLogged, useAuthStore } from "@/store/AuthStore";

import WorkingTime from "../../components/WorkingTime.vue";
import { storeToRefs } from "pinia";
import { userRank } from "@/dto/user";

const route = useRoute();
const router = useRouter();

const userId = ref(route.params.userid);
const workingTimeId = ref(route.params.workingtimeid);
const workingTime = ref<IWorkingTime>();

const authStore = useAuthStore();
const { isLogged, user } = storeToRefs(authStore);

async function getWorkingtime() {
  try {
    const { data } = await axios.get<IWorkingTime>(
      `/workingtimes/user/${userId.value}/${workingTimeId.value}`,
      {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      } as any
    );
    if (data) {
      workingTime.value = data;
      console.dir(data);
    } else {
      router.push("/workingtimes/" + userId.value);
    }
  } catch (error) {
    console.error(error);
    router.push("/not-found");
  }
}

watch(
  [userId, workingTimeId],
  () => {
    getWorkingtime();
  },
  { immediate: true }
);

const start = ref(
  luxon.DateTime.now().startOf("minute").toISO({
    includeOffset: false,
  })
);
const end = ref(
  luxon.DateTime.now().startOf("minute").toISO({
    includeOffset: false,
  })
);

watch(
  [workingTime],
  () => {
    if (workingTime.value) {
      start.value = luxon.DateTime.fromISO(workingTime.value.start)
        .startOf("minute")
        .toISO({
          includeOffset: false,
        });
      end.value = luxon.DateTime.fromISO(workingTime.value.end)
        .startOf("minute")
        .toISO({
          includeOffset: false,
        });
    }
  },
  { immediate: true }
);

async function onSubmit() {
  try {
    await axios.put(
      `/workingtimes/entry/${workingTimeId.value}`,
      {
        start: start.value,
        end: end.value,
      },
      {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      } as any
    );
    getWorkingtime();
  } catch (error) {
    console.error(error);
  }
}

async function onDelete() {
  try {
    await axios.delete(`/workingtimes/entry/${workingTimeId.value}`, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
      },
    } as any );
    router.push("/workingtimes/" + userId.value);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <v-btn
      class="mb-4"
      icon="mdi-chevron-left"
      color="white"
      @click="() => router.back()"
  ></v-btn>
  <div>
    <WorkingTime v-if="workingTime" :workingTime="workingTime" />
    <div id="edit" v-if="user?.rank === userRank.general_manager || user.rank === userRank.manager">
      <h2>Edit Working Time</h2>
      <form @submit.prevent>
        <div>
          <label for="start">Start</label>
          <input type="datetime-local" id="start" v-model="start" required />
        </div>
        <div>
          <label for="end">End</label>
          <input type="datetime-local" id="end" v-model="end" required />
        </div>
        <input type="submit" value="Save" @click="() => onSubmit()" />
        <input type="submit" value="Delete" class="delete" @click="onDelete" />
      </form>
    </div>
  </div>
</template>

<style>
#edit {
  margin-top: 2rem;
}

#edit form {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

#edit form div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  flex-shrink: 1;
}

#edit form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

#edit form input[type="submit"] {
  flex: 100% 0 0;
  background-color: #35a3d6;
  border: none;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

#edit form input[type="submit"]:hover {
  background-color: #4fc3f7;
}

#edit form input[type="submit"]:active {
  background-color: #0288d1;
}

#edit form input[type="submit"]:focus {
  outline: none;
}

#edit form input[type="submit"].delete {
  background-color: #d63535;
}
</style>

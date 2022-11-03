<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import services from "@/services/workingTimes";
import { useAuthStore } from "@/store/AuthStore";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { IWorkingTime } from "@/dto/workingTime";

const data = reactive<{ workingTimes: IWorkingTime[] }>({
  workingTimes: [],
});

const auth = reactive(storeToRefs(useAuthStore()));

const route = useRoute();

const userId = ref(route.params.userid as string);

function refreshWorkingtimes() {
  if (userId.value) {
    services.getWorkingTimes(parseInt(userId.value)).then((res) => {
      data.workingTimes = res;
    });
  }
}

refreshWorkingtimes();

watch(userId, () => {
  refreshWorkingtimes();
});

function createWorkingTime() {
  // Random time yesterday
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));

  const now = new Date();

  services
    .createWorkingTime(parseInt(userId.value), {
      start: date.toISOString(),
      end: now.toISOString(),
    })
    .finally(() => {
      refreshWorkingtimes();
    });
}

function timeToClockEmoji(time: string) {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const clock = [
    "🕛",
    "🕧",
    "🕐",
    "🕜",
    "🕑",
    "🕝",
    "🕒",
    "🕞",
    "🕓",
    "🕟",
    "🕔",
    "🕠",
    "🕕",
    "🕡",
    "🕖",
    "🕢",
    "🕗",
    "🕣",
    "🕘",
    "🕤",
    "🕙",
    "🕥",
    "🕚",
    "🕦",
  ];

  const clockEmoji = clock[(hours * 2 + (minutes > 30 ? 1 : 0)) % 12];

  return clockEmoji;
}
</script>

<template>
  <div>
    <h1>Working times</h1>
    <div v-if="auth.user">
      <div v-if="auth.user.id == parseInt(userId)">
        <button @click="createWorkingTime">Create random working time</button>
        <br />
        <button @click="refreshWorkingtimes">Refresh working times</button>
      </div>
      <div
        class="workingTimesList"
        v-for="workingTime in data.workingTimes"
        :key="workingTime.id"
      >
        <div class="workingTime">
          <div class="clock">
            <span>{{ timeToClockEmoji(workingTime.start) }}</span>
            {{ new Date(workingTime.start).toLocaleString() }}
          </div>
          <div class="clock">
            <span>{{ timeToClockEmoji(workingTime.end) }}</span>
            {{ new Date(workingTime.end).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.workingTimesList {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.workingTime {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  /* Give it some style */

  background-color: #f1f1f1;
  padding: 2em 4em;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  /* Make it responsive */

  max-width: 500px;

  /* Make it look like a clock */

  font-size: 1.2em;
  font-family: monospace;
}

.clock {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.clock span {
  font-size: 3em;
  margin-right: 10px;
}

.clock span:hover {
  cursor: pointer;
}

.clock span:active {
  transform: scale(0.9);
}

.clock span:active:hover {
  cursor: pointer;
}
</style>

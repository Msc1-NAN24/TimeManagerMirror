<script setup lang="ts">
import { IWorkingTime } from "@/dto/workingTime";
import * as luxon from "luxon";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

defineEmits(["clicked"]);

defineProps<{
  workingTime: IWorkingTime;
}>();

const clocks = [
  `🕛`,
  `🕧`,
  `🕐`,
  `🕜`,
  `🕑`,
  `🕝`,
  `🕒`,
  `🕞`,
  `🕓`,
  `🕟`,
  `🕔`,
  `🕠`,
  `🕕`,
  `🕡`,
  `🕖`,
  `🕢`,
  `🕗`,
  `🕣`,
  `🕘`,
  `🕤`,
  `🕙`,
  `🕥`,
  `🕚`,
  `🕦`,
];

const getClock = (timestamp: string) => {
  const hour = luxon.DateTime.fromISO(timestamp).hour;
  const minutes = luxon.DateTime.fromISO(timestamp).minute;
  const offset = Math.floor(minutes / 30) + 1;
  return clocks[(hour % 12) * 2 + offset];
};
</script>

<template>

  <div class="workingtime">
    <div class="workingtime__clock">
      <div class="workingtime__clock__header">
        <div
          class="workingtime__clock__header__date mouse-pointer"
          @click="
            () => {
              $emit('clicked');
            }
          "
        >
          {{
            luxon.DateTime.fromISO(workingTime.start).toLocaleString(
              luxon.DateTime.DATE_MED
            )
          }}
        </div>
      </div>
      <div class="workingtime__clock__body">
        <!-- Start time -->
        <div class="workingtime__clock__body__start">
          <div class="workingtime__clock__body__start__clock">
            {{ getClock(workingTime.start) }}
          </div>
          <div class="workingtime__clock__body__start__time">
            {{
              luxon.DateTime.fromISO(workingTime.start).toLocaleString(
                luxon.DateTime.TIME_SIMPLE
              )
            }}
          </div>
        </div>
        <!-- End time -->
        <div class="workingtime__clock__body__end">
          <div class="workingtime__clock__body__end__clock">
            {{ getClock(workingTime.end) }}
          </div>
          <div class="workingtime__clock__body__end__time">
            {{
              luxon.DateTime.fromISO(workingTime.end).toLocaleString(
                luxon.DateTime.TIME_SIMPLE
              )
            }}
          </div>
        </div>
        <!-- Duration -->
        <div class="workingtime__clock__body__duration">
          <div class="workingtime__clock__body__duration__header">Duration</div>
          <div class="workingtime__clock__body__duration__time">
            {{
              luxon.Duration.fromMillis(
                luxon.DateTime.fromISO(workingTime.end).toMillis() -
                  luxon.DateTime.fromISO(workingTime.start).toMillis()
              ).toFormat("hh:mm")
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workingtime {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.mouse-pointer {
  cursor: pointer;
}

.workingtime__clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.workingtime__clock__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
}

.workingtime__clock__header__date {
  font-size: 1.2rem;
  font-weight: bold;
}

.workingtime__clock__body {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.workingtime__clock__body__start,
.workingtime__clock__body__end,
.workingtime__clock__body__duration {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
}

.workingtime__clock__body__start__clock,
.workingtime__clock__body__end__clock {
  font-size: 3rem;
}

.workingtime__clock__body__start__time,
.workingtime__clock__body__end__time {
  font-size: 1.2rem;
}

.workingtime__clock__body__duration__time {
  font-size: 2rem;
  font-weight: bold;
}

.workingtime__clock__body__duration__header {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>

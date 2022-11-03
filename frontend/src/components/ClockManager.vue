<script lang="ts" setup>
import clockRepository from '@/repository/clocks';
import clockLogo from '@/assets/clock.png';
import { ref } from 'vue';
import * as luxon from 'luxon';

const isCounting = ref(true)
const durationTime = ref("--:--:--")
const startingTime = ref("-")
const startingTimeFormated = ref("-")

getClock()

async function clockIn() {
    const clock = await clockRepository.createClock()
    getClock()
}
async function getClock() {
    const clock = await clockRepository.getClock()
    isCounting.value = clock.status
    if (isCounting.value === null || clock.status === false) {
        isCounting.value = false
        startingTime.value = "-"
    } else {
        console.log(clock.time)
        startingTime.value = clock.time
        startingTimeFormated.value = luxon.DateTime.fromISO(clock.time).toFormat("hh:mm:ss")
        updateDurationTime()
    }
}

function getDurationTime() {
    if (isCounting.value === false) {
        durationTime.value = "--:--:--"
    } else {
        const now = luxon.DateTime.local();
        const diff = now.diff(luxon.DateTime.fromISO(startingTime.value));
        durationTime.value = diff.toFormat("hh:mm:ss")
    }
}

function updateDurationTime() {
    if (isCounting.value === true) {
        getDurationTime()
        setTimeout(updateDurationTime, 1000)
    } else {
        durationTime.value = "--:--:--"
        startingTimeFormated.value = "-"
    }
}
</script>

<template>
    <div class="clock-comp">
        <h1>Pointeuse</h1>
        <img :src="clockLogo" alt="clock logo"/>
        <p class="time" v-text="durationTime"></p>
        <v-btn class="counter-button" color="success" @click="clockIn()">
            <p v-if="isCounting">Arrêter</p>
            <p v-else>Commencer</p>
        </v-btn>
        <p class="last-clock">Heure de début: {{ startingTimeFormated }}</p>
    </div>
</template>

<style>

.time {
  font-size: 3em;
  margin-top: 20px;
  margin-bottom: 20px;
}

.counter-button {
    margin-top: 5px;
}

.clock-comp {
  background: transparent;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.last-clock {
    margin-top: 20px;
    margin-bottom: 20px;
}

img {
  max-width: 10%;
  max-height: 10%;
  display: block;
}

</style>

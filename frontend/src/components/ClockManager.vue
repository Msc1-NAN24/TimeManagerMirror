<script lang="ts" setup>
import clockRepository from '@/repository/clocks';
import { ref } from 'vue';

const isCounting = ref(true)
getClock()

async function clockIn() {
    const clock = await clockRepository.createClock()
    console.log(clock)
}
async function getClock() {
    const clock = await clockRepository.getClock()
    console.log(clock)
    isCounting.value = clock.status
}
</script>

<template>
    <button @click="clockIn()">Value of clock.status: {{ isCounting }}.</button>
</template>
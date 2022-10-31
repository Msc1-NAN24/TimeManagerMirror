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
    if (isCounting.value === null) {
        isCounting.value = false
    }
}
</script>

<template>
    <v-btn color="success" @click="clockIn()">
        <p v-if="isCounting">Start counter</p>
        <p v-else>End counter</p>
    </v-btn>
</template>

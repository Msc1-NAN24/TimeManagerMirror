<script setup lang="ts">
import CreateTeamModal from "@/components/modals/CreateTeamModal.vue";
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<template>
  <CreateTeamModal/>
  <h1>Mes Teams</h1>
  <v-btn variant="flat" color="info" @click="onClick">Créer une team</v-btn>
</template>

<style scoped>

</style>
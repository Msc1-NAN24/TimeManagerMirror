<script lang="ts" setup>
import CreateTeamModal from "@/components/modals/teams/CreateTeamModal.vue";
import {useRouter} from "vue-router";
import { ref, onMounted } from 'vue';
import {useAuthStore} from "@/store/AuthStore";
import {getTeams} from "@/services/team";
import TeamList from "@/components/teams/TeamList.vue";

const router = useRouter();
const auth = useAuthStore();

const open = ref(false)
const teams = ref([]);

onMounted(() => {
  loadTeams();
});

const loadTeams = () => {
  getTeams(auth.accessToken, (team, error) => {
    if (error) {
      console.log(error);
    } else {
      teams.value = team;
    }
  });
}

const onCloseModal = () => {
  open.value = false;
}

const onSuccess = (team) => {
  open.value = false;
  loadTeams();
}

</script>

<template>
  <h1>Mes Teams</h1>
  <CreateTeamModal :open="open" :on-success="onSuccess" :on-dismiss="onCloseModal"/>
  <v-btn variant="flat" color="info" @click="open = !open">Créer une team</v-btn>
  <TeamList :teams="teams"/>
</template>

<style scoped>

</style>
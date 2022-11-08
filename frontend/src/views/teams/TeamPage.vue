<script lang="ts" setup>

import {useRoute, useRouter} from "vue-router";
import {getTeam} from "@/services/team";
import {useAuthStore} from "@/store/AuthStore";
import {onMounted, ref} from "vue";
import {ITeam} from "@/dto/team";
import TeamMembersList from "@/components/teams/TeamMembersList.vue";
import EditTeamModal from "@/components/modals/teams/EditTeamModal.vue";
import DeleteTeamModal from "@/components/modals/teams/DeleteTeamModal.vue";
import {useToast} from "vue-toast-notification";
import WeeklyChart from "@/components/charts/WeeklyChart.vue";
import AverageDailyChart from "@/components/charts/AverageDailyChart.vue";
const route = useRoute();
const auth = useAuthStore();

enum ModalType {
  Edit,
  AddUser,
  DeleteTeam,
}

const router = useRouter();
const toast = useToast();

const team = ref<undefined | ITeam>(undefined);
const open = ref<undefined | ModalType>(undefined);

const loadTeam = (teamId: string) => {
  getTeam(auth.accessToken, teamId, (teams, error) => {
    if (error) {
      console.log(error);
      toast.error("Une erreur est survenue ! #1300");
    } else if (teams !== undefined) {
      team.value = teams;
      loadWorkingTimes(teams.id);
    }
  });
}

const loadWorkingTimes = (id: string) => {

}

onMounted(() => {
  loadTeam(route.params["id"] as any);
});

const onDismissModal = () => {
  open.value = undefined;
}

const onTeamEdited = (newTeam: ITeam) => {
  loadTeam(team.value["id"]);
  toast.success("Votre team à bien été modifié");
  open.value = undefined;
}

const onTeamDeleted = (newTeam: ITeam) => {
  toast.success("Votre team à bien été supprimé");
  open.value = undefined;
  router.push({name: 'teams'})
}

</script>

<template>
  <div v-if="team !== undefined">
    <EditTeamModal :open="open === ModalType.Edit" :on-dismiss="onDismissModal" :on-success="onTeamEdited" :team="team"/>
    <DeleteTeamModal :open="open === ModalType.DeleteTeam" :on-dismiss="onDismissModal" :on-success="onTeamDeleted" :team="team"/>
    <h1>{{team.name}}</h1>
    <h4>Mise à jour le {{new Date(team.updated_at).toLocaleString()}}</h4>
    <div class="actions">
      <v-btn
          @click="open = ModalType.Edit"
          color="info"
          rounded
          variant="elevated"
          text>Modifier la team</v-btn>
      <v-btn
          @click="open = ModalType.DeleteTeam"
          color="error"
          rounded
          variant="elevated"
          text>Supprimer la team</v-btn>
    </div>

    <AverageDailyChart/>

    <TeamMembersList :team="team" :reload="() => loadTeam(team.id)"/>
  </div>
</template>

<style scoped>

.actions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
}
</style>
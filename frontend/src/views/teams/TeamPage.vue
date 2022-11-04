<script lang="ts" setup>

import {useRoute} from "vue-router";
import {getTeam} from "@/services/team";
import {useAuthStore} from "@/store/AuthStore";
import {onMounted, ref} from "vue";
import {ITeam} from "@/dto/team";
import TeamMembersList from "@/components/teams/TeamMembersList.vue";
const route = useRoute();
const auth = useAuthStore();

const team = ref<undefined | ITeam>(undefined);

const loadTeam = (teamId: string) => {
  console.log("load team");
  getTeam(auth.accessToken, teamId, (teams, error) => {
    console.log(teams, error);
    if (error) {
      console.log(error);
    } else if (teams !== undefined) {
      team.value = teams;
    }
  });
}

onMounted(() => {
  console.log("mounted !");
  loadTeam(route.params["id"] as any);
});

</script>

<template>
  <div v-if="team !== undefined">
    <h1>{{team.name}}</h1>
    <h4>Mise à jour le {{new Date(team.updated_at).toLocaleString()}}</h4>
    <div class="actions">
      <v-btn
          @click="onClickEdit"
          color="info"
          rounded
          variant="elevated"
          text>Editer la team</v-btn>
      <v-btn
          @click="onClickDelete"
          color="error"
          rounded
          variant="elevated"
          text>Supprimer la team</v-btn>
    </div>
    <TeamMembersList :team="team"/>
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
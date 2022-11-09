<script lang="ts" setup>
  import {useRouter} from "vue-router";
  const props = defineProps(['team']);
  const router = useRouter();

  const onClickTeam = () => {
    router.push({path: `teams/${props.team.id}`});
  }

  const onClickEdit = () => {

  }

  const onClickDelete = () => {

  }

</script>

<template>
  <v-card
      @click="onClickTeam"
      class="team-card"
      max-width="344"
      outlined>
    <v-list-item three-line>
      <v-list-item-title>
          <h4>{{team.name}}</h4>
          <p>{{team.members.length}} membres</p>
          <p>Mise à jour le {{new Date(team.updated_at).toLocaleDateString()}}</p>
      </v-list-item-title>
    </v-list-item>
  </v-card>
</template>

<style scoped>

.team-card {
  padding: 10px;
  margin: 10px;
}

</style>
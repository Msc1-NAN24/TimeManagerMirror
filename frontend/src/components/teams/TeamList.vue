<script lang="ts" setup>
  import TeamCard from "@/components/teams/TeamCard.vue";

  const props = defineProps(['teams']);

</script>

<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <template v-for="(team, index) in props.teams" :key="index">
        <v-col cols="12" sm="12" md="4" lg="3">
          <TeamCard :team="team"/>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
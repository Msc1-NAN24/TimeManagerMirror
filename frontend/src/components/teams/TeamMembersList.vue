<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import * as luxon from "luxon";
const router = useRouter();

const {team} = defineProps(['team']);
const search = ref('');

const getMembers = () => {
  if (search === '') {
    return [...team.members, team.owner];
  }
}

</script>

<template>
  <div class="members-list">
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details/>
    <v-table fixed-header height="300px">
      <thead>
      <tr>
        <th class="text-left">Email</th>
        <th class="text-left">Prénom</th>
        <th class="text-left">Nom</th>
        <th class="text-left">Date de création</th>
        <th class="text-left">Date de maj</th>
        <th class="text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="member in [getMembers()]" :key="member.email">
        <td>{{ member.email }} {{member.id === team.owner.id ? "👑" : ""}}</td>
        <td>{{ member.firstname }}</td>
        <td>{{ member.lastname }}</td>
        <td>{{ luxon.DateTime.fromISO(member.insert_at).toFormat("HH:mm:ss")}}</td>
        <td>{{ luxon.DateTime.fromISO(member.insert_at).toFormat("HH:mm:ss")}}</td>
        <td>
          <v-btn
              class="ma-2"
              variant="text"
              icon="mdi-view-dashboard"
              color="blue-lighten-2"/>
          <v-btn
              v-if="member.id !== team.owner.id"
              class="ma-2"
              variant="text"
              icon="mdi-delete"
              color="blue-lighten-2"/>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
.members-list {
  padding: 20px;
  margin: 20px;
}
</style>
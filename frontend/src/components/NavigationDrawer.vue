<script lang="ts" setup>

import {IsLogged, useAuthStore} from "@/store/AuthStore";
import {storeToRefs} from "pinia";
import ClockManager from "@/components/ClockManager.vue";
import {useRouter} from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const {user} = storeToRefs(auth);

auth.$subscribe((mutation, state) => {
  if (state.isLogged == IsLogged.NotLogged) {
    router.push({name: 'login'})
  }
}, {detached: true});

function onClickBtn() {
  console.log(user?.value);
}

</script>

<script lang="ts" >

</script>

<template>
  <v-navigation-drawer
      expand-on-hover
      class="bg-grey-lighten-3"
  >
    <v-container class="container">
        <v-row class="top">
          <v-list>
            <v-list-item
              @click="router.push({name: 'profile'})"
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :title="`${user?.firstname} ${user?.lastname}`"
              :subtitle="user?.email"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" value="dashboard" @click="router.push({name: 'home'})"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar-blank-multiple" title="Workingtimes" value="workingtimes" @click="onClickBtn"></v-list-item>
            <v-list-item v-if="user?.rank === 'manager' || user?.rank === 'general_manager'" prepend-icon="mdi-account-group" title="Teams" value="teams" @click="router.push({name: 'teams'})"></v-list-item>
            <v-list-item v-if="user?.rank === 'general_manager'" prepend-icon="mdi-account-multiple-outline" title="Utilisateurs" value="users" @click="router.push({name: 'users-management'})"></v-list-item>
          </v-list>
        </v-row>
        <v-row class="bottom">
          <ClockManager />
        </v-row>
    </v-container>
  </v-navigation-drawer>
  <v-main style="height: 250px; margin-top: 20px; width: 80%">
    <router-view />
  </v-main>
</template>

<style scoped>
.container {
  height: 100%;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top {
  flex: 0 0 auto;
}
.bottom {
  justify-self: flex-end;
  flex: 0 0 auto;
  padding: 1em 0;
}
</style>
<script lang="ts" setup>

import { IsLogged, useAuthStore } from "@/store/AuthStore";
import { storeToRefs } from "pinia";
import ClockManager from "@/components/ClockManager.vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

const auth = useAuthStore();
const router = useRouter();
const { user } = storeToRefs(auth);
const drawer = ref(true);
const mobile = ref<boolean>(isMobile());

auth.$subscribe((mutation, state) => {
  if (state.isLogged == IsLogged.NotLogged) {
    router.push({ name: 'login' })
  }
}, { detached: true });

function onClickBtn() {
  console.log(user?.value);
}

window.addEventListener('resize', () => {
  mobile.value = isMobile();
});

function isMobile() {
  return window.innerWidth <= 1284;
}

function logout() {
  auth.logoutUser();
  router.push("Login");
}

watch(mobile, (value) => {
  if (value) {
    drawer.value = false;
  } else {
    drawer.value = true;
  }
});
</script>

<template>
  <v-app>
    <v-app-bar color="deep-grey-lighten-5" dark v-if="mobile">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center w-100">
        <v-toolbar-title style="text-align: center;">Time Manager</v-toolbar-title>
      </div>
      <v-btn icon @click="logout">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" touchless class="bg-grey-lighten-3">
      <v-container class="container">
        <v-row class="top">
            <v-list class="w-100">
            <v-list-item
                @click="() => router.push({name: 'myProfile'})"
                prepend-icon="mdi-account-circle"
                :title="`${user?.firstname} ${user?.lastname}`"
                :subtitle="user?.email"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list class="w-100">
            <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" value="dashboard"
              @click="router.push({ name: 'home' })"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar-blank-multiple" title="Workingtimes" value="workingtimes"
              @click="onClickBtn"></v-list-item>
            <v-list-item v-if="user?.rank === 'manager' || user?.rank === 'general_manager'"
              prepend-icon="mdi-account-group" title="Teams" value="teams" @click="router.push({ name: 'teams' })">
            </v-list-item>
            <v-list-item v-if="user?.rank === 'general_manager'" prepend-icon="mdi-account-multiple-outline"
              title="Utilisateurs" value="users" @click="router.push({ name: 'users-management' })"></v-list-item>
          </v-list>
        </v-row>
        <v-row class="bottom">
          <ClockManager />
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.container {
  height: 100vh;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top {
  flex: 0 0 auto;
}

.bottom {
  flex: 0 0 auto;
  padding: 1em 0;

}
</style>
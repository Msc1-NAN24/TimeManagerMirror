<script lang="ts" setup>

import {useAuthStore} from "@/store/AuthStore";
import {storeToRefs} from "pinia";
import ClockManager from "@/components/ClockManager.vue";

const auth = useAuthStore();
const {user, isLogged} = storeToRefs(auth);

function onClickBtn() {
  console.log(user);
}
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
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :title="`${user?.firstname} ${user?.lastname}`"
              :subtitle="user?.email"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item prepend-icon="mdi-folder" title="Workingtimes" value="workingtimes"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Teams" value="teams" @click="onClickBtn"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Dashboard" value="bashboard"></v-list-item>
          </v-list>
        </v-row>
        <v-row class="bottom">
          <ClockManager />
        </v-row>
    </v-container>
  </v-navigation-drawer>
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
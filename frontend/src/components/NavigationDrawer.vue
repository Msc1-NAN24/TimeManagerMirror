<template>
    <v-navigation-drawer
        expand-on-hover
        rail
        @mouseenter="onUpdateDrawer(true)"
        @mouseleave="onUpdateDrawer(false)"
        class="bg-grey-lighten-3">
        <v-list>
            <v-list-item
                @click="onClickUserInfo"
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                :title="`${user?.firstname} ${user?.lastname}`"
                :subtitle="user?.email"
            ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" value="dashboard" @click="this.router.push({name: 'home'})"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar-blank-multiple" title="Workingtimes" value="workingtimes"></v-list-item>
          <v-list-item v-if="user?.rank === 'manager' || user?.rank === 'general_manager'" prepend-icon="mdi-account-group" title="Teams" value="teams" @click="onClickTeams"></v-list-item>
          <v-list-item v-if="user?.rank === 'general_manager'" prepend-icon="mdi-account-multiple-outline" title="Utilisateurs" value="teams" @click="onClickBtn"></v-list-item>
        </v-list>
        <v-list style="bottom: 0; position: absolute;">
            <v-list-item prepend-icon="" title="" value="clock">
<!--                <ClockManager />-->
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-main style="height: 250px; margin-top: 20px; margin-left: 150px; width: 80%">
      <router-view />
    </v-main>
</template>

<script lang="ts">

import {IsLogged, useAuthStore} from "@/store/AuthStore";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

export default {
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    auth.$subscribe((mutation, state) => {
      if (state.isLogged == IsLogged.NotLogged) {
        router.push({name: 'login'})
      }
    }, {detached: true});
    const {user, isLogged} = storeToRefs(auth);
    return {
      user,
      isLogged,
      router,
    }
  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    onClickBtn() {
      console.log(this.user);
    },
    onClickUserInfo() {
      this.router.push({name: 'profile'});
    },
    onClickTeams() {
      this.router.push({name: 'teams'});
    },
    onUpdateDrawer(enable: boolean) {
      this.drawer = enable;
    }
  }
}

</script>
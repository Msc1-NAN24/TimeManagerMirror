<template>
    <v-navigation-drawer
        expand-on-hover
        rail
        class="bg-grey-lighten-3">
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                :title="`${user?.firstname} ${user?.lastname}`"
                :subtitle="user?.email"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="Workingtimes" value="workingtimes"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Teams" value="teams" @click="onClickBtn"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Dashboard" value="bashboard"></v-list-item>
        </v-list>

        <v-list style="bottom: 0; position: absolute;">
            <v-list-item prepend-icon="" title="" value="clock">
<!--                <ClockManager />-->
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script lang="ts">

import {useAuthStore} from "@/store/AuthStore";
import {storeToRefs} from "pinia";

export default {
  setup() {
    const auth = useAuthStore();
    const {user, isLogged} = storeToRefs(auth);
    return {
      user, isLogged,
    }
  },
  methods: {
    onClickBtn() {
      console.log(this.user);
    }
  }
}

</script>
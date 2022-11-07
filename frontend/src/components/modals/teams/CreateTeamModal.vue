<script lang="ts" setup>
import {createTeam} from "@/services/team";
import {useAuthStore} from "@/store/AuthStore";
import { ref, onMounted } from 'vue'

const props = defineProps(['open', 'onSuccess', 'onDismiss']);
const teamName = ref('');
const auth = useAuthStore();

const onClickCreated = () => {
  createTeam(auth.accessToken, {name: teamName.value}, (team, error) => {
    if (error) {
      console.log(error);
    } else {
      props.onSuccess(team);
    }
  });
}

</script>

<template>
  <v-dialog
      v-model="$props.open"
      @close="$props.onDismiss"
      @click:outside="$props.onDismiss"
      width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Créer une team
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Nom"
            v-model="teamName"
            required></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="onClickCreated"
            color="success"
            text>
          Créer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
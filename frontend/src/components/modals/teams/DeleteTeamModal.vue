<script setup lang="ts">
  import {useAuthStore} from "@/store/AuthStore";
  import {deleteTeam} from "@/services/team";
  import {useToast} from "vue-toast-notification";

  const auth = useAuthStore();
  const toast = useToast();

  const props = defineProps(['open', 'onDismiss', 'onSuccess', 'team']);

  const onClickDelete = () => {
    deleteTeam(auth.accessToken, props.team.id, (team, error) => {
      if (error) {
        toast.error("Une erreur est survenue !");
      } else {
        props.onSuccess();
      }
    });
  }
</script>

<template>
  <v-dialog
      v-model="props.open"
      @close="props.onDismiss"
      @click:outside="props.onDismiss"
      width="800">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Supprimer la team {{team.name}} ?
      </v-card-title>
      <v-card-text>
        Voulez-vous supprimer cette team ? une fois cette opération effectuée, il ne vous serra plus possible de revenir en arrière.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="onClickDelete"
            color="error"
            text>
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
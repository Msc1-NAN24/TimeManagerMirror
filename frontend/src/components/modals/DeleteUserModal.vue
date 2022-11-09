<script setup lang="ts">
import userRepository from "@/repository/users";
import { useAuthStore } from "@/store/AuthStore";
import { useToast } from "vue-toast-notification";

const auth = useAuthStore();
const props = defineProps(["open", "onDismiss", "onSuccess", "deleteUser"]);
const $Toast = useToast();

const onClickDelete = () => {
  if (props.deleteUser) {
    userRepository
      .deleteUsers(auth.accessToken, props.deleteUser)
      .then(() => {
        $Toast.success(
          `Compte avec l'id :${props.deleteUser.id} à été suprimé`
        );
        props.onSuccess();
      })
      .catch((err) => {
        $Toast.error(err);
        props.onDismiss();
      });
  } else {
    userRepository
      .deleteUser(auth.accessToken)
      .then(() => {
        $Toast.success(`Compte suprimer`);
        props.onSuccess();
      })
      .catch((err) => {
        $Toast.error(err);
        props.onDismiss();
      });
  }
};
</script>

<template>
  <v-dialog
    v-model="props.open"
    @close="props.onDismiss"
    @click:outside="props.onDismiss"
    width="500"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Supprimer {{ props.deleteUser !== undefined ? "ce" : "mon" }} compte ?
      </v-card-title>
      <v-card-text>
        Voulez-vous supprimer
        {{ props.deleteUser !== undefined ? "ce" : "votre" }} compte ? une fois
        cette opération effectuer, il n'est plus possible de récupérer le
        compte.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onClickDelete" color="error" text> Supprimer </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

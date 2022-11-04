<script setup>

</script>

<template>
  <v-dialog
      v-model="$props.open"
      @close="$props.onDismiss"
      @click:outside="$props.onDismiss"
      width="500"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Supprimer mon compte ?
      </v-card-title>
      <v-card-text>
        Voulez-vous supprimer votre compte ? une fois cette opération effectuer, il n'est plus possible de récupérer le compte.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="this.onClickDelete"
            color="error"
            text>
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {useAuthStore} from "@/store/AuthStore";
import {storeToRefs} from "pinia";
import userRepository from "@/repository/users";

export default {
  name: "DeleteUserModal",
  props: ['open', 'onDismiss', 'onSuccess'],
  setup() {
    const auth = useAuthStore();
    return {
      ...storeToRefs(auth)
    }
  },
  methods: {
    onClickDelete() {
      userRepository.deleteUser(this.accessToken, (error) => {
        if (error) {
          console.log(error);
        } else {
          this.$props.onSuccess();
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
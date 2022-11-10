<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useAuthStore} from "@/store/AuthStore";
import userService from "@/services/users";
import {IUser} from "@/dto/user";
import {addUserTeam} from "@/services/team";

const auth = useAuthStore();

const props = defineProps(['open', 'onDismiss', 'onSuccess', 'team'])
const users = ref<IUser[]>([]);
const selectedUsers = ref([]);

const onClickAdd = async () => {
  const selectedUsersValue = users.value
      .filter((user) => selectedUsers.value.some((v) => user.email === v))

  for (let user: IUser of selectedUsersValue) {
    await addUserTeam(auth.accessToken, props.team.id, {user_id: user.id});
  }
  props.onSuccess();
}

onMounted(() => {
  userService.getAllUsers().then((response) => {
    users.value = (response as IUser[])
        .filter((user) => user.rank === 'employee')
        .filter((user) => !props.team.members.some((mu) => mu.id === user.id))
        .filter((user) => props.team.owner.id !== user.id)
  });
});

</script>

<template>
  <v-dialog
      v-model="props.open"
      @close="props.onDismiss"
      @click:outside="props.onDismiss"
      width="700">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Ajouter un utilisateur
      </v-card-title>
      <v-card-text>
        <v-combobox
            v-if="users.length > 0"
            multiple
            v-model="selectedUsers"
            :items="users.map((u) => u.email)"
        ></v-combobox>
        <p v-else>Aucun membres ne peut rejoindre votre team !</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="onClickAdd"
            color="success"
            :disabled="users.length <= 0"
            text>
          Ajouter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
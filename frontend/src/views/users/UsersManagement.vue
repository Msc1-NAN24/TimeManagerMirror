<script lang="ts" setup>
import userService from '@/services/users';
import userRepository from '@/repository/users';
import {ref} from 'vue';
import {useAuthStore} from "@/store/AuthStore";
import {IUser} from "@/dto/user";
import {useToast} from "vue-toast-notification";
import {useRouter} from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const items = ref([] as any);
const roles = ["employee", "manager"];
const selected = ref<string | number>('');
const isUser = ref(false);
const isEditing = ref(false);
const user = ref({
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  rank: ''
});
const updateUser = ref({
  firstname: '',
  lastname: '',
  email: '',
  rank: '',
});

refreshUsers()

function refreshUsers() {
  userService.getAllUsers().then((response) => {
    items.value = []
    for (let i = 0; i < response.length; i++) {
      items.value.push({ title: response[i].firstname, icon: 'mdi-account', route: 'users', id: response[i].id });
    }
    console.log(items.value)
  });
}

function searchUsers() {
   isUser.value = false;
   isEditing.value = false;
  if (selected.value !== 0) {
    userService.getUserById(selected.value as string).then((response) => {
      isUser.value = true;
      user.value.id = response.id;
      user.value.firstname = response.firstname;
      user.value.lastname = response.lastname;
      user.value.email = response.email;
      user.value.rank = response.rank;
      updateUser.value = user.value;
    });
  } else {
    console.log('No user selected');
  }
}

function deleteUser() {
  if (selected.value !== 0) {
    userRepository.deleteUserById(selected.value as number).then((response) => {
      toast.success("Utilisateur supprimé avec succès !");
      selected.value = 0;
      isUser.value = false;
      refreshUsers();
    });
  } else {
    toast.success("Une erreur est survenue !");
    console.log('No user selected');
  }
}

function saveUser() {
  if (selected.value !== 0) {
    userService.updateUser(auth.accessToken, selected.value as number, updateUser.value as IUser
    ).then((response) => {
      toast.success("Utilisateur mis à jour !");
      console.log(response);
      isEditing.value = false;
      selected.value = '';
      refreshUsers();
    });
  } else {
    toast.error("Une erreur est survenue !");
    console.log('No user selected');
  }
}
</script>

<template>
  <h1 style="margin-bottom: 20px;">Utilisateurs</h1>
  <v-autocomplete dense filled rounded solo label="Sélectionner un utilisateur" :items="items" item-value="id" v-model="selected"
    menu-icon="" append-icon="mdi-account-search" @click:append="searchUsers" @update:modelValue="() => searchUsers()">
  </v-autocomplete>
  <div v-if="isUser" style="padding: 4px">
      <v-text-field :disabled="!isEditing" label="Prénom" v-model="updateUser.firstname" :placeholder="user.firstname"></v-text-field>
      <v-text-field :disabled="!isEditing" label="Nom" v-model="updateUser.lastname" :placeholder="user.lastname"></v-text-field>
      <v-text-field :disabled="!isEditing" label="Email" v-model="updateUser.email" :placeholder="user.email"></v-text-field>
      <v-select :disabled="!isEditing" label="Rôle" v-if="user.rank !== 'general_manager'" v-model="updateUser.rank" solo :items="roles" :value="user.rank" append-inner-icon=""></v-select>
      <v-select label="Rôle" v-else v-model="updateUser.rank" solo :items="roles" :value="user.rank" append-inner-icon="" disabled></v-select>
      <div v-if="isEditing">
        <v-btn
            color="success"
            class="mr-4"
            prepend-icon="mdi-check"
            @click="saveUser()">Mettre à jour</v-btn>
        <v-btn color="error" prepend-icon="mdi-close" @click="isEditing = !isEditing">Annuler</v-btn>
      </div>
      <div v-else>
        <v-btn
            color="success"
            class="mr-4"
            prepend-icon="mdi-account-edit"
            @click="isEditing = true">Modifier</v-btn>
        <v-btn
            color="error"
            class="mr-4"
            prepend-icon="mdi-account-edit"
            @click="() => deleteUser()">Supprimer</v-btn>
        <v-btn
            color="info"
            class="mr-4"
            prepend-icon="mdi-account-edit"
            @click="() => router.push({path: `/user/${updateUser.id}/dashboard`})">Voir son tableau de bord</v-btn>
      </div>
  </div>
</template>
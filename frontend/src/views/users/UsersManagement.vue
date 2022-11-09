<script lang="ts" setup>
import userService from '@/services/users';
import userRepository from '@/repository/users';
import { ref } from 'vue';

const items = ref([] as any);
const roles = ["employee", "manager", "general_manager"];
const selected = ref(null);
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
  rank: ''
});

refreshUsers()

function refreshUsers() {
  userService.getAllUsers().then((response) => {
    console.log(response);
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
  if (selected.value != null) {
    userService.getUserById(selected.value).then((response) => {
      console.log(response);
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
  if (selected.value != null) {
    userRepository.deleteUserById(selected.value).then((response) => {
      console.log(response);
      selected.value = null;
      isUser.value = false;
      refreshUsers();
    });
  } else {
    console.log('No user selected');
  }
}

function saveUser() {
  if (selected.value != null) {
    userService.updateUser(selected.value, updateUser.value
    ).then((response) => {
      console.log(response);
      isEditing.value = false;
      refreshUsers();
    });
  } else {
    console.log('No user selected');
  }
}
</script>

<template>
  <v-autocomplete dense filled rounded solo label="Select a user" :items="items" item-value="id" v-model="selected"
    menu-icon="" append-icon="mdi-account-search" @click:append="searchUsers">
  </v-autocomplete>
  <v-table v-if="isUser">
    <thead>
      <tr>
        <th class="text-left">Firstname</th>
        <th class="text-left">Lastname</th>
        <th class="text-left">Email</th>
        <th class="text-left">Role</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isEditing">
        <td style="width: 15%">
          <v-text-field v-model="updateUser.firstname" :placeholder="user.firstname"></v-text-field>
        </td>
        <td style="width: 15%">
          <v-text-field v-model="updateUser.lastname" :placeholder="user.lastname"></v-text-field>
        </td>
        <td style="width: 28%">
          <v-text-field v-model="updateUser.email" :placeholder="user.email"></v-text-field>
        </td>
        <td style="width: 28%">
          <v-select v-if="user.rank != 'general_manager'" v-model="updateUser.rank" solo :items="roles" :value="user.rank" append-inner-icon=""></v-select>
          <v-select v-else v-model="updateUser.rank" solo :items="roles" :value="user.rank" append-inner-icon="" disabled></v-select>
        </td>
        <td style="width: 7%">
          <v-btn icon color="success" @click="saveUser()">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </td>
        <td style="width: 7%">
          <v-btn icon color="error" @click="isEditing = !isEditing">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </td>
      </tr>
      <tr v-else>
        <td style="width: 15%">
          <v-text-field v-model="updateUser.firstname" disabled></v-text-field>
        </td>
        <td style="width: 15%">
          <v-text-field v-model="updateUser.lastname" disabled></v-text-field>
        </td>
        <td style="width: 28%">
          <v-text-field v-model="updateUser.email" disabled></v-text-field>
        </td>
        <td style="width: 28%">
          <v-select v-model="updateUser.rank" solo :items="roles" :value="user.rank" disabled append-inner-icon="">
          </v-select>
        </td>
        <td style="width: 7%">
          <v-btn icon color="primary" @click="isEditing = !isEditing">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </td>
        <td style="width: 7%">
          <v-btn v-if="user.rank != 'general_manager'" icon color="error" @click="deleteUser()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
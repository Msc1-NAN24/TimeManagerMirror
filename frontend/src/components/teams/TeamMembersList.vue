<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import * as luxon from "luxon";
import {useAuthStore} from "@/store/AuthStore";
import DeleteUserModal from "@/components/modals/DeleteUserModal.vue";
import AddTeamUserModal from "@/components/modals/teams/AddTeamUserModal.vue";
import {useToast} from "vue-toast-notification";
import {IUser} from "@/dto/user";
import {removeUserTeam} from "@/services/team";
const router = useRouter();
const auth = useAuthStore();

enum ModalType {
  AddUser,
  RemoveUser,
}

const toast = useToast();
const open = ref<undefined | ModalType>(undefined);

const {team, reload} = defineProps(['team', 'reload']);
const search = ref('');

const onClickDeleteUser = (user: IUser) => {
  removeUserTeam(auth.accessToken, team.id, {user_id: user.id}, (team, error) => {
    if (error) {
      toast.error("Une erreur est survenue ! #1400");
    } else {
      toast.success("L'utilisateur a été supprimer de votre team !");
      reload();
    }
  });
}

const onUserAdded = () => {
  toast.success("Les membres ont été ajouter à votre team !");
  open.value = undefined;
  reload();
}

const onDismiss = () => {
  open.value = undefined;
}

</script>

<template>
  <AddTeamUserModal :open="open === ModalType.AddUser" :on-success="onUserAdded" :on-dismiss="onDismiss" :team="team"/>
<!--    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details/>-->
    <v-table fixed-header class="members-list">
      <thead>
      <tr>
        <th class="text-left">Email</th>
        <th class="text-left">Prénom</th>
        <th class="text-left">Nom</th>
        <th class="text-left">Date de création</th>
        <th class="text-left">Date de maj</th>
        <th class="text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(member, index) in [...team.members, team.owner]" :key="index">
        <td>{{ member.email }} {{member.id === team.owner.id ? "👑" : ""}}</td>
        <td>{{ member.firstname }}</td>
        <td>{{ member.lastname }}</td>
        <td>{{ luxon.DateTime.fromISO(member.insert_at).toFormat("HH:mm:ss")}}</td>
        <td>{{ luxon.DateTime.fromISO(member.insert_at).toFormat("HH:mm:ss")}}</td>
        <td>
          <v-btn
              class="ma-2"
              variant="text"
              icon="mdi-view-dashboard"
              color="blue-lighten-2"/>
          <v-btn
              v-if="member.id !== team.owner.id"
              class="ma-2"
              variant="text"
              icon="mdi-delete"
              @click="() => onClickDeleteUser(member)"
              color="blue-lighten-2"/>
        </td>
      </tr>
      </tbody>
    </v-table>
    <v-btn rounded @click="open = ModalType.AddUser">Ajouter un utilisateur</v-btn>
</template>

<style scoped>
.members-list {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
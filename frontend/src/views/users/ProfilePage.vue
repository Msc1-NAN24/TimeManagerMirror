<template>
  <DeleteUserModal :open="this.openDeleteDialog" :on-dismiss="onCloseModal" :on-success="this.onUserDeleted"/>
  <h1 class="title">Mon profile</h1>
  <v-form
      class="forms"
      lazy-validation>
    <v-text-field
        :model-value="this.user?.firstname ?? ''"
        label="Prénom"
        required></v-text-field>
    <v-text-field
        :model-value="this.user?.lastname ?? ''"
        label="Nom"
        required></v-text-field>
    <v-text-field
        :model-value="this.user?.email ?? ''"
        label="Email"
        required></v-text-field>
  </v-form>
  <div class="d-flex" style="gap: 20px">
    <v-btn variant="flat" color="success" @click="onClickUpdate">Mettre à jour</v-btn>
    <v-btn variant="flat" color="warning" @click="onClickChangePassword">Changer mon mot de passe</v-btn>
  </div>
  <div class="d-flex" style="gap: 20px; margin-top: 20px">
    <v-btn variant="outlined" color="info" @click="onClickLogout">Se déconnecter</v-btn>
    <v-btn variant="tonal" color="error" @click="onClickDelete">Supprimer mon compte</v-btn>
  </div>
</template>

<script>
import DeleteUserModal from '@/components/modals/DeleteUserModal.vue';
import {useAuthStore} from "@/store/AuthStore";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

export default {
  name: "ProfilePage",
  components: {
    DeleteUserModal,
  },
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const {user, isLogged, accessToken} = storeToRefs(auth);
    return {
      auth,
      user,
      accessToken,
      isLogged,
      router,
    }
  },
  data() {
    return {
      email: '',
      lastname: '',
      firstname: this.user?.firstname ?? 'hello',
      openDeleteDialog: false,
    }
  },
  methods: {
    onClickUpdate() {
      console.log(this.user.firstname);
    },
    onClickDelete() {
      this.openDeleteDialog = true;
    },
    onClickChangePassword() {
      this.router.push({name: 'reset-password'})
    },
    onCloseModal() {
      this.openDeleteDialog = false;
    },
    onUserDeleted() {
      this.openDeleteDialog = false;
      this.auth.logoutUser();
    },
    onClickLogout() {
      this.auth.logoutUser();
    }
  }
}
</script>

<style scoped>
  .title {
    font-weight: bold;
  }
  .forms {
    margin-top: 40px;
  }
</style>
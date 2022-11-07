<template>
  <DeleteUserModal
    :open="this.openDeleteDialog"
    :on-dismiss="onCloseModal"
    :on-success="this.onUserDeleted"
  />
  <h1 class="title">Mon profile</h1>
  <v-form class="forms" lazy-validation>
    <v-text-field v-model="firstname" label="Prénom" required></v-text-field>
    <v-text-field v-model="lastname" label="Nom" required></v-text-field>
    <v-text-field v-model="email" label="Email" required></v-text-field>
  </v-form>
  <div class="d-flex" style="gap: 20px">
    <v-btn variant="flat" color="success" @click="onClickUpdate"
      >Mettre à jour</v-btn
    >
    <v-btn variant="flat" color="warning" @click="onClickChangePassword"
      >Changer mon mot de passe</v-btn
    >
  </div>
  <div class="d-flex" style="gap: 20px; margin-top: 20px">
    <v-btn variant="outlined" color="info" @click="onClickLogout"
      >Se déconnecter</v-btn
    >
    <v-btn variant="tonal" color="error" @click="onClickDelete"
      >Supprimer mon compte</v-btn
    >
  </div>
</template>

<script lang="ts">
import DeleteUserModal from "@/components/modals/DeleteUserModal.vue";
import { useAuthStore } from "@/store/AuthStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import userService from "@/services/users";
import { useToast } from "vue-toast-notification";

export default {
  name: "ProfilePage",
  components: {
    DeleteUserModal,
  },
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const { user, isLogged, accessToken } = storeToRefs(auth);
    return {
      auth,
      user,
      accessToken,
      isLogged,
      router,
    };
  },
  data() {
    return {
      email: this.user?.email ?? "",
      lastname: this.user?.lastname ?? "",
      firstname: this.user?.firstname ?? "hello",
      openDeleteDialog: false,
      toast: useToast(),
    };
  },
  methods: {
    onClickUpdate() {
      if (this.user?.id) {
        userService
          .updateMyUser(this.auth.accessToken, {
            email: this.email,
            lastname: this.lastname,
            firstname: this.firstname,
          })
          .then(() => this.toast.success("Profil mis à jour"))
          .catch((err) => this.toast.error(err));
      } else {
        this.toast.error("Mise a jour du profile impossible");
      }
    },
    onClickDelete() {
      this.openDeleteDialog = true;
    },
    onClickChangePassword() {
      this.router.push({ name: "reset-password" });
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
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
.forms {
  margin-top: 40px;
}
</style>

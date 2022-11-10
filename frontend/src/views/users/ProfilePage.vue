<template>
  <DeleteUserModal
    :open="this.openDeleteDialog"
    :on-dismiss="onCloseModal"
    :on-success="this.onUserDeleted"
  />
  <h1 class="title" v-if="id">
    Profile de {{ `${user?.firstname} ${user?.lastname}` }}
  </h1>
  <h1 class="title" v-else>Mon profile</h1>
  <v-form class="forms" lazy-validation>
    <v-text-field v-model="firstname" label="Prénom" required></v-text-field>
    <v-text-field v-model="lastname" label="Nom" required></v-text-field>
    <v-text-field v-model="email" label="Email" required></v-text-field>
  </v-form>
  <v-container>
    <v-btn variant="flat" color="success" @click="onClickUpdate">
      Mettre à jour
    </v-btn>
    <v-btn
      variant="flat"
      color="warning"
      @click="onClickChangePassword"
      v-if="!id || currentUser?.rank === 'general_manager'"
    >
      Changer mon mot de passe
    </v-btn>
    <v-btn
      variant="outlined"
      color="info"
      @click="onClickLogout"
      v-if="!id || id === currentUser.id"
      >Se déconnecter</v-btn
    >
    <v-btn variant="tonal" color="error" @click="onClickDelete"
      >Supprimer mon compte</v-btn
    >
  </v-container>
</template>

<script lang="ts">
import DeleteUserModal from "@/components/modals/DeleteUserModal.vue";
import { useAuthStore } from "@/store/AuthStore";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import userService from "@/services/users";
import { useToast } from "vue-toast-notification";
import { ref } from "vue";
import { IUpdateUser, userRank } from "@/dto/user";
import { useAuthorize } from "@/hook/useAuthorize";

export default {
  name: "ProfilePage",
  components: {
    DeleteUserModal,
  },
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const { user: currentUser, isLogged, accessToken } = storeToRefs(auth);
    const id = Number(route.params.id);
    const user = ref(id ? null : storeToRefs(auth).user);
    const { isAuthorize } = useAuthorize();

    if (
      !isAuthorize([userRank.manager, userRank.general_manager]) &&
      auth.user?.id !== id
    ) {
      toast.info("Vous n'avez pas le droit d'accéder a cette page");
      router.push({ path: "/" });
    }

    return {
      auth,
      user,
      accessToken,
      isLogged,
      router,
      id,
      currentUser,
    };
  },
  data() {
    return {
      email: this.user?.email ?? "",
      lastname: this.user?.lastname ?? "",
      firstname: this.user?.firstname ?? "",
      openDeleteDialog: false,
      toast: useToast(),
    };
  },
  mounted() {
    userService.getUserById(Number(this.id)).then((res) => {
      this.user = res;
      this.email = res.email;
      this.firstname = res.firstname;
      this.lastname = res.lastname;
    });
  },
  methods: {
    updateUser() {
      const accessToken = this.auth.accessToken;
      const newValue: IUpdateUser = {
        email: this.email,
        lastname: this.lastname,
        firstname: this.firstname,
      };

      if (this.id) {
        return userService.updateUser(accessToken, Number(this.id), newValue);
      } else {
        return userService.updateMyUser(accessToken, newValue);
      }
    },
    onClickUpdate() {
      if (this.user?.id) {
        this.updateUser()
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
      this.router.push("Login");
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

<template>
  <h1>Changer mon mot de passe</h1>
  <v-form class="forms">
    <v-text-field
      v-model="oldPassword"
      variant="outlined"
      :append-icon="showLastPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showLastPassword ? 'text' : 'password'"
      name="input-10-2"
      label="Ancien password"
      :rules="[rules.required]"
      @click:append="showLastPassword = !showLastPassword"
    ></v-text-field>
    <v-text-field
      v-model="newPassword"
      variant="outlined"
      :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showNewPassword ? 'text' : 'password'"
      name="input-10-2"
      label="Nouveau mot de passe"
      hint="Minimum 8 caractères"
      :rules="[rules.required, rules.min]"
      @click:append="showNewPassword = !showNewPassword"
    ></v-text-field>
  </v-form>
  <div class="actions">
    <v-btn variant="outlined" color="primary" @click="onClickCancel"
      >Annuler</v-btn
    >
    <v-btn variant="elevated" color="success" @click="onClickValidate"
      >Valider</v-btn
    >
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";
import servicesUser from "@/services/users";

export default {
  name: "ChangePasswordPage",
  setup() {
    const router = useRouter();
    const auth = useAuthStore();
    return {
      router,
      auth,
    };
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      showLastPassword: false,
      showNewPassword: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    onClickCancel() {
      this.router.push({ name: "myProfile" });
    },
    onClickValidate() {
      servicesUser
        .resetMyPassword(
          this.auth.accessToken,
          this.newPassword,
          this.oldPassword
        )
        .then((res) => {
          this.router.push({ name: "myProfile" });
          this.$toast.success("Mots de passe modifié");
        })
        .catch((err) => this.$toast.error(err));
    },
  },
};
</script>

<style scoped>
.forms {
  margin-top: 40px;
}
.actions {
  margin-top: 16px;
  display: flex;
  gap: 20px;
}
</style>

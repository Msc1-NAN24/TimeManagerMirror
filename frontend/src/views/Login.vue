<script lang="ts">
import authService from "@/services/auth";
import { IsLogged, useAuthStore } from "@/store/AuthStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    if (auth.isLogged === IsLogged.Logged) {
      router.push({ name: "home" });
    }
    return {
      auth,
      router,
    };
  },
  data: () => ({
    form: false,
    show: false,
    email: "",
    password: "",
    emailRules: [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v: string) => !!v || "Password is required",
      (v: string) => v.length >= 8 || "Min 8 characters",
    ],
    loading: false,
  }),
  methods: {
    onSubmit() {
      if (!this.form || !this.email || !this.password) return;
      this.loading = true;
      authService
        .login(this.email, this.password)
        .then(({ access_token, user }) => {
          this.auth.login(access_token, user);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          this.$toast.error(err);
          this.loading = false;
        });
    },
    required(v: string) {
      return !!v || "Field is required";
    },
  },
};
</script>

<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="emailRules"
          class="mb-2"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="passwordRules"
          label="Password"
          placeholder="Enter your password"
          hint="At least 8 characters"
          @click:append="show = !show"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="/register">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-form>
    </v-card>
  </v-sheet>
</template>

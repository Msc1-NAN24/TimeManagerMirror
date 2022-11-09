<script lang="ts" setup>
import authService from "@/services/auth";
import { IsLogged, useAuthStore } from "@/store/AuthStore";
import { useRouter } from "vue-router";
import {ref} from "vue";
import {useToast} from "vue-toast-notification";

import { Vue3Lottie } from 'vue3-lottie'
import welcome from '../../assets/welcome-screen.json'
import AuthFooter from "@/components/AuthFooter.vue";

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();
const form = ref(false);
const show = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);

const emailRules = [
  (v: string) => !!v || "l'email est obligatoire",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail non valide !",
];
const passwordRules = [
  (v: string) => !!v || "Le mot de passe est obligatoire",
  (v: string) => v.length >= 8 || "Minimum 8 caractères",
];

const required = (v: string) => !!v || "Field is required";

auth.$subscribe(() => {
  //TODO redirect to home
  /*if (auth.isLogged === IsLogged.Logged) {
    router.push({ name: "home" });
  }*/
})

const onSubmit = () => {
  if (!form.value || !email.value || !password.value) return;
  loading.value = true;
  authService
      .login(email.value, password.value)
      .then(({ access_token, user }) => {
        auth.login(access_token, user);
        router.push({ name: "home" });
      })
      .catch((err) => {
        toast.error(err);
        loading.value = false;
      });
}
</script>

<template>
  <v-sheet class="pa-12" rounded>
    <Vue3Lottie :animationData="welcome" :height="300" :width="400" />
    <div class="content mx-auto px-6 py-8">
      <h3 style="font-weight: normal">Se connecter</h3>
      <v-form class="py-4" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="emailRules"
          class="mb-2"
          label="Email"
          placeholder="hello.world@gmail.com"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="passwordRules"
          label="Password"
          placeholder="*********"
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
          Se connecter
        </v-btn>
        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="/register">
            S'inscrire <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-form>
    </div>
  </v-sheet>
  <auth-footer/>
</template>

<style scoped>
  .content {
    max-width: 500px;
  }
</style>
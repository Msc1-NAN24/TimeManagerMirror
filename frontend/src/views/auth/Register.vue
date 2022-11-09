<script lang="ts" setup>
import authService from "@/services/auth";
import {ref} from "vue";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "vue-router";
import {useToast} from "vue-toast-notification";

import { Vue3Lottie } from 'vue3-lottie'
import register from '../../assets/register.json'
import AuthFooter from "@/components/AuthFooter.vue";

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const firstname = ref("");
const form = ref(false);
const lastname = ref("");
const email = ref("");
const password = ref("");
const show1 = ref(false);
const loading = ref(false);
const rules = {
  required: (value) => !!value || "Ce champ est requis",
  min: (v) => v.length >= 8 || "Minimum 8 caractères",
  emailMatch: (v) => /.+@.+\..+/.test(v) || "l'email doit être valide !",
};

const onSubmit = () => {
    if (!form.value) return;
    loading.value = true;
    const user = {
      firstname: firstname.value,
      lastname: lastname.value,
      password: password.value,
      email: email.value,
    };
    authService
        .register(user)
        .then((res) => {
          if (res) {
            router.push({ name: "login" });
            toast.success("Création réussie.\nVeuillez vous connectez");
          } else toast.error(`l'email ${email.value} est déjà utilisé`);
        })
        .catch((err) => {
          toast.error(err);
          loading.value = false;
        });
  };
</script>

<template>
  <v-sheet class="py-8 rounded">
    <Vue3Lottie style="max-width: 400px" :animationData="register" />
    <div class="content mx-auto px-6 py-2">
      <h3 style="font-weight: normal">S'inscrire</h3>
      <v-form class="py-4" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="firstname"
          :rules="[rules.required]"
          color="primary"
          label="Prénom"
        ></v-text-field>

        <v-text-field
          v-model="lastname"
          :rules="[rules.required]"
          color="primary"
          label="Nom"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[rules.emailMatch, rules.required]"
          color="primary"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          :rules="[rules.required, rules.min]"
          @click:append="show1 = !show1"
          color="primary"
          label="Mot de passe"
          placeholder="********"
        ></v-text-field>
        <v-btn
          :disabled="!form"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          S'inscrire
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="login">
            Se connecter <v-icon icon="mdi-chevron-right"></v-icon>
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
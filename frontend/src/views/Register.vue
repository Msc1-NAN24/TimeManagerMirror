<template>
  <v-sheet class="pa-12 rounded">
    <v-card class="mx-auto" max-width="344" title="User Registration">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="firstname"
          :rules="[rules.required]"
          color="primary"
          label="First name"
        ></v-text-field>

        <v-text-field
          v-model="lastname"
          :rules="[rules.required]"
          color="primary"
          label="Last name"
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
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <!-- <v-text-field
          v-model="confirmPassword"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          :rules="[rules.required, rules.confirmPassword]"
          @click:append="show2 = !show2"
          color="primary"
          label="Confirm Password"
          placeholder="Confirm your password"
          @update:error="checkPassword"
        ></v-text-field> -->

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!form"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Complete Registration
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-text class="text-center">
          <router-link class="text-blue text-decoration-none" to="login">
            Sign in now <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import authService from "@/services/auth";
export default {
  data: () => ({
    firstname: null,
    form: false,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null,
    terms: false,
    show1: false,
    show2: false,
    loading: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      confirmPassword: (v) =>
        v === this.password || "Must be identical to the password",
    },
  }),
  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      const user = {
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        email: this.email,
      };
      this.$router.push({ name: "home" });

      authService.register(user).then((res) => {
        console.log("res", res);
        this.$router.push({ name: "login" });
      });
    },
    required(v) {
      return !!v || "Field is required";
    },
    checkPassword(invalid) {
      // correct: false
      if (true == invalid) {
        this.validPassword = false;
      } else {
        this.validPassword = true;
      }
    },
  },
};
</script>

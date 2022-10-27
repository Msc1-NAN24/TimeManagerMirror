<template>
  <v-sheet class="pa-12 rounded">
    <v-card class="mx-auto" max-width="344" title="User Registration">
      <v-container>
        <v-text-field
          v-model="first"
          :rules="[rules.required]"
          color="primary"
          label="First name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="last"
          :rules="[rules.emailMatch, rules.required]"
          color="primary"
          label="Last name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[rules.emailMatch, rules.required]"
          color="primary"
          label="Email"
          variant="underlined"
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
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="comfirmPassword"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          :rules="[rules.required, rules.confirmPassword]"
          @click:append="show2 = !show2"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="submit" color="success">
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
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    comfirmPassword: null,
    terms: false,
    show1: false,
    show2: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      confirmPassword: (v) =>
        v === this.password || "Must be identical to the password",
    },
  }),
};
</script>

<script lang="js">
export default {
    data: () => ({
      form: false,
      show: false,
      email: null,
      password: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        value => !!value || 'Password is required',
        v => v.length >= 8 || 'Min 8 characters',
      ],
      loading: false,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
}
</script>

<template>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
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
  
          <br>
  
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

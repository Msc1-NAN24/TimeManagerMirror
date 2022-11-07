<template>
  <v-dialog
      v-model="$props.open"
      @close="$props.onDismiss"
      @click:outside="$props.onDismiss"
      width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Créer une team
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Nom"
            required></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="this.onClickCreate"
            color="success"
            text>
          Créer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateTeamModal",
  props: ['open', 'onDismiss', 'onSuccess'],
  setup() {

  },
  methods: {
    onClickCreate() {

    }
  }
}
</script>

<style scoped>

</style>
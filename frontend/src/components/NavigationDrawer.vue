<script lang="ts" setup>
import ClockManager from '.@/components/ClockManager.vue';
</script>

<template>
    <v-navigation-drawer
        expand-on-hover
        rail
        class="bg-grey-lighten-3"
    >
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                title="Firstame Lastname"
                subtitle="test@gmail.com"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="Workingtimes" value="workingtimes"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Teams" value="teams"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Dashboard" value="bashboard"></v-list-item>
        </v-list>

        <v-list style="bottom: 0; position: absolute;">
            <v-list-item prepend-icon="" title="" value="clock">
                <ClockManager />
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>
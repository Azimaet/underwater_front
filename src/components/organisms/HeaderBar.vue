<script lang="ts">
export default { name: "HeaderBar" };
</script>

<script setup lang="ts">
import { isLogged, useAuthLogout } from "@/composables/auth";
import store from "@/store";
</script>

<template>
  <v-app-bar :elevation="1">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <router-link to="/" class="subheading mx-3"> Underwwwater </router-link>
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>

      <v-btn icon="mdi-account"></v-btn>
    </template>
  </v-app-bar>

  <!-- <v-app-bar>
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <router-link to="/" class="subheading mx-3"> Underwwwater </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>
    <div v-if="isLogged()">
      <span>{{ store.state.user.data.username }}</span>
      <v-btn :color="'error'" class="mr-4" v-on:click="useAuthLogout">
        Logout
      </v-btn>
    </div>
    <div v-else>
      <v-btn :color="'success'" class="mr-4" @click="$router.push('login')">
        Login
      </v-btn>
    </div>
  </v-app-bar> -->
</template>

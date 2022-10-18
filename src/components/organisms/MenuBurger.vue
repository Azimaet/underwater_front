<script lang="ts">
export default { name: "MenuBurger" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { isLogged, useAuthLogout } from "@/composables/auth";
import store from "@/store";

const menu = ref(false);
</script>

<template>
  <v-app-bar-nav-icon>
    <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
      </template>

      <v-card min-width="300">
        <v-list v-if="isLogged()">
          <v-list-item
            :prepend-avatar="require('@/assets/avatars/009.svg')"
            :title="store.state.user.data.username!"
            subtitle="Diver"
          >
            <template v-slot:append> </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list v-if="isLogged()">
          <v-list-item>
            <router-link :to="'/'"> Home </router-link>
          </v-list-item>
          <v-list-item>
            <router-link :to="'profile'"> Profile </router-link>
          </v-list-item>
          <v-list-item>
            <router-link :to="'account'"> Account </router-link>
          </v-list-item>
          <v-list-item>
            <router-link :to="'dive_log'"> Dive Log </router-link>
          </v-list-item>
          <v-list-item>
            <router-link :to="'dive_form'"> Add a Dive! </router-link>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <router-link :to="'/'"> Home </router-link>
          </v-list-item>
          <v-list-item>
            <router-link :to="'login'"> Login </router-link>
          </v-list-item>
          <v-list-item>
            <router-link :to="'register'"> Register </router-link>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar-nav-icon>
</template>

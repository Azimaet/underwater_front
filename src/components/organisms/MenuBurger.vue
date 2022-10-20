<script lang="ts">
export default { name: "MenuBurger" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { isLogged, useAuthLogout } from "@/composables/auth";
import store from "@/store";
import ButtonComponent from "@/components/atoms/ButtonComponent.vue";

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
            <ButtonComponent
              :block="true"
              :icon="{
                name: 'mdi-home',
                placement: 'prepend',
              }"
              :size="'large'"
              label="Home"
              @click="$router.push('home')"
            />
          </v-list-item>
          <v-list-item>
            <ButtonComponent
              :block="true"
              :icon="{
                name: 'mdi-diving-scuba',
                placement: 'prepend',
              }"
              :size="'large'"
              label="Profile"
              @click="$router.push('profile')"
            />
          </v-list-item>
          <v-list-item>
            <ButtonComponent
              :block="true"
              :icon="{
                name: 'mdi-account',
                placement: 'prepend',
              }"
              :size="'large'"
              label="Account"
              @click="$router.push('account')"
            />
          </v-list-item>
          <v-list-item>
            <ButtonComponent
              :block="true"
              :icon="{
                name: 'mdi-check',
                placement: 'prepend',
              }"
              :size="'large'"
              label="Dive Log"
              @click="$router.push('dive_log')"
            />
          </v-list-item>
          <v-list-item>
            <ButtonComponent
              :block="true"
              :icon="{
                name: 'mdi-plus',
                placement: 'prepend',
              }"
              :size="'large'"
              label="Add Dive"
              @click="$router.push('dive_form')"
            />
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

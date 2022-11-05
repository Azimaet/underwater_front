<script lang="ts">
export default { name: "MenuDrawer" };
</script>

<script setup lang="ts">
import { menu } from "@/store/menu";
import { isLogged } from "@/composables/auth";
import store from "@/store";
</script>

<template>
  <v-navigation-drawer v-model="menu.isOpen" :temporary="true">
    <div
      v-if="
        isLogged() &&
        store.state.user.data.avatar &&
        store.state.user.data.username
      "
    >
      <v-list-item
        :prepend-avatar="
          require('@/assets/avatars/avatar' +
            store.state.user.data.avatar +
            '.svg')
        "
        :title="store.state.user.data.username"
      ></v-list-item>

      <v-divider></v-divider>
    </div>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Home"
        value="home"
        link
        @click="$router.push('/')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="mdi-diving-scuba"
        title="Profile"
        value="profile"
        link
        @click="$router.push('profile')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="mdi-plus"
        title="Add Dive"
        value="add-dive"
        link
        @click="$router.push('dive_form')"
      ></v-list-item>
      <!-- <v-list-item
        v-if="isLogged()"
        prepend-icon="mdi-account"
        title="Account"
        value="account"
        link
        @click="$router.push('account')"
      ></v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

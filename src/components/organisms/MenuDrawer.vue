<script setup lang="ts">
import { menu } from "@/store/menu";
import { isLogged } from "@/composables/auth";
import store from "@/store";
import { translations } from "@/i18n/index";

const { HOME, PROFILE, DIVES_LIST, ADD_DIVE, SETTINGS, STATS } =
  translations.en.PAGES;
</script>

<template>
  <v-navigation-drawer v-model="menu.isOpen" :temporary="true">
    <template
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
            '.png')
        "
        :title="store.state.user.data.username"
      />
      <v-divider />
    </template>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="$viewDashboard"
        :title="HOME"
        value="home"
        link
        @click="$router.push('/')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$divingScuba"
        :title="PROFILE"
        value="profile"
        link
        @click="$router.push('profile')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$formatListBulleted"
        :title="DIVES_LIST"
        value="dive_list"
        link
        @click="$router.push('dives')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$plus"
        :title="ADD_DIVE"
        value="add-dive"
        link
        @click="$router.push('dive_form')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$cog"
        :title="SETTINGS"
        value="settings"
        link
        @click="$router.push('settings')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$podium"
        :title="STATS"
        value="stats"
        link
        @click="$router.push('stats')"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

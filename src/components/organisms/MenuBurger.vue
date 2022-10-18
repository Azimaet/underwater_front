<script lang="ts">
export default { name: "MenuBurger" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { isLogged, useAuthLogout } from "@/composables/auth";
import store from "@/store";

const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

console.log(store.state.user);
</script>

<template>
  <v-app-bar-nav-icon>
    <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            :prepend-avatar="require('@/assets/avatars/009.svg')"
            title="John Leider"
            subtitle="Founder of Vuetify"
          >
            <template v-slot:append> </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
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

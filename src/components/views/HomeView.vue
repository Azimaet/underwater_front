<script lang="ts">
import { defineComponent } from "vue";
import HeaderBar from "@/components/organisms/HeaderBar.vue";
import HomeParallax from "@/components/molecules/HomeParallax.vue";

export default defineComponent({
  name: "HomeView",

  data() {
    return {
      links_logged_off: [
        {
          text: "Login",
          href: "/login",
        },
      ],
      links_logged_on: [
        {
          text: "Add A Dive",
          href: "/dive_form",
        },
      ],
    };
  },
});
</script>

<script setup lang="ts">
import { isLogged } from "@/composables/auth";

const title = "Welcome to Underwwwater";

const subtitle =
  "Underwwwater is a community dive log. Quickly reference your dives to get your global performances underwater as datas and charts.";
</script>

<template>
  <HeaderBar />
  <v-main>
    <HomeParallax :title="title" :subtitle="subtitle" />
    <v-container>
      <v-row class="text-center">
        <v-col cols="12"> </v-col>

        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Welcome to Underwwwater
          </h1>

          <p class="subheading font-weight-regular">
            For help and collaboration with other Vuetify developers,
            <br />please join our online
            <a href="https://community.vuetifyjs.com" target="_blank"
              >Discord Community</a
            >
          </p>
        </v-col>

        <v-col class="mb-5" cols="12">
          <h2 class="headline font-weight-bold mb-5">Links</h2>

          <v-row v-if="isLogged()" justify="center">
            <router-link
              v-for="(next, i) in links_logged_on"
              :key="i"
              :to="next.href"
              class="subheading mx-3"
            >
              {{ next.text }}
            </router-link>
          </v-row>
          <v-row v-else justify="center">
            <router-link
              v-for="(next, i) in links_logged_off"
              :key="i"
              :to="next.href"
              class="subheading mx-3"
            >
              {{ next.text }}
            </router-link>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

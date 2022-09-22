<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { Apollo } from "@/plugins/apollo";

export default defineComponent({
  name: "App",
  beforeCreate() {
    store.commit("initStore");
  },
  data() {
    return {};
  },
  setup() {
    provide(DefaultApolloClient, Apollo);
  },
});
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

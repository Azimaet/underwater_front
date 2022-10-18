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
    <router-view />
  </v-app>
</template>

<style lang="scss">
@import "@/scss/_index.scss";
</style>

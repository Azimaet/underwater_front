<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "App",
  beforeCreate() {
    store.commit("initStore");
  },
  data() {
    return {
      //
    };
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

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import HeaderBar from "@/components/organisms/HeaderBar.vue";
export default defineComponent({
  name: "HomeView",

  components: {
    HeaderBar,
    HelloWorld,
  },
});
</script>

<template>
  <HeaderBar />
  <hello-world />
</template>

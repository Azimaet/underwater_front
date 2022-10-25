import HeaderBar from '@/components/organisms/HeaderBar.vue';
<script lang="ts">
export default { name: "BaseTemplate" };
</script>

<script setup lang="ts">
import HeaderBar from "@/components/organisms/HeaderBar.vue";
import FooterBar from "@/components/molecules/FooterBar.vue";
</script>

<template>
  <HeaderBar />
  <v-main>
    <slot name="main"> </slot>
  </v-main>
  <FooterBar />
</template>

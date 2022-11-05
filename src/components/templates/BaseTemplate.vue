<script lang="ts">
export default { name: "BaseTemplate" };
</script>

<script setup lang="ts">
import HeaderBar from "@/components/organisms/HeaderBar.vue";
import FooterBar from "@/components/molecules/FooterBar.vue";
import AlertsBucket from "@/components/organisms/AlertsBucket.vue";
</script>

<template>
  <div
    id="template"
    :style="{
      'background-image':
        'url(' + require(`@/assets/background-animate.svg`) + ')',
      'background-size': 'cover',
      'background-position': 'top',
    }"
  >
    <HeaderBar />
    <AlertsBucket />
    <v-main>
      <slot name="main"> </slot>
    </v-main>
    <FooterBar />
  </div>
</template>

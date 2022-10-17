<script lang="ts">
export default { name: "HomeParallax" };
</script>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <v-parallax
    :src="require('@/assets/bg_homepage.jpg')"
    :scale="0.9"
    height="500"
  >
    <div
      class="d-flex flex-column fill-height justify-center align-center text-white"
    >
      <h1 class="text-h4 font-weight-thin mb-4">Vuetify</h1>
      <h4 class="subheading">Build your application today!</h4>
    </div>
  </v-parallax>
</template>

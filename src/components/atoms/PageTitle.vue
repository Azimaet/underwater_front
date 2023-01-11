<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();
</script>

<template>
  <v-card-title :tag="'h2'" :class="['text-h5', 'font-weight-medium']">
    {{ props.label }}
  </v-card-title>
</template>

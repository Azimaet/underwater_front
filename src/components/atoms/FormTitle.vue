<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();
</script>

<template>
  <v-card-title :tag="'h2'" :class="['py-8', 'text-center']">
    {{ props.label }}
  </v-card-title>
</template>

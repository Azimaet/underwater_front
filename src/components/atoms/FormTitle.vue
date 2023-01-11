<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();
</script>

<template>
  <v-card-title
    :class="['text-h5', 'font-weight-medium', 'py-8', 'text-center']"
  >
    {{ props.label }}
  </v-card-title>
</template>

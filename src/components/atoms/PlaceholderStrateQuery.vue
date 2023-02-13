<script setup lang="ts">
const props = defineProps<{
  type?: "error" | "success" | "warning" | "info";
  title: string;
  text: string;
}>();
</script>

<template>
  <v-alert
    :type="props.type"
    :title="props.title"
    :text="props.text"
    variant="outlined"
    :class="['text-center']"
  >
    <slot name="progress"></slot>
    <slot name="button"></slot>
  </v-alert>
</template>

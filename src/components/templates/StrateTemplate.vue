<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle: string;
}>();
</script>

<template>
  <v-row :class="['mb-8']">
    <v-col>
      <v-card
        :title="props.title"
        :subtitle="props.subtitle"
        :elevation="10"
        border
        rounded
      >
        <slot name="strate"> </slot>
      </v-card>
    </v-col>
  </v-row>
</template>

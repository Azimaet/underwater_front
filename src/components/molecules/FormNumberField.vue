<script lang="ts">
export default { name: "FormNumberField" };
</script>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  rules?: any;
  options?: any;
}>();

const response = ref(0);
</script>

<template>
  <v-col cols="12" sm="6">
    <v-text-field
      v-model.number="response"
      :label="label"
      :rules="rules"
      persistent-hint
      variant="outlined"
    ></v-text-field>
  </v-col>
</template>

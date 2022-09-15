<script lang="ts">
export default { name: "FormButton" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { FormButtonInterface } from "@/types/components/form";

const props = defineProps<{
  button: FormButtonInterface;
  disabled: boolean;
}>();
</script>

<template>
  <v-btn :disabled="!disabled" :color="button.color" class="mr-4">
    {{ $t(button.label) }}
  </v-btn>
</template>

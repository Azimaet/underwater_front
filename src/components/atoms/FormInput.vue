<script lang="ts">
export default { name: "FormInput" };
</script>

<script setup lang="ts">
import { FormActions } from "@/composables/types/form";
import { computed } from "vue";

const props = defineProps<{
  label: string;
  action: FormActions;
}>();

const color = computed(() => {
  switch (props.action) {
    case FormActions.DIVE_CREATE:
      return "success";
    default:
      return "warning";
  }
});
</script>

<template>
  <v-btn :color="color"> {{ label }} </v-btn>
</template>

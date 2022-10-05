<script lang="ts">
export default { name: "FormControlGasGroup" };
</script>

<script setup lang="ts">
import { Dive } from "@/composables/classes/dive";
import FormControlGasPanel from "@/components/molecules/FormControlGasPanel.vue";

const props = defineProps<{
  id: string;
  label: string;
  instance: Dive;
}>();
</script>

<template>
  <div
    v-for="(item, index) in instance[id as keyof typeof instance]"
    :key="index"
  >
    <FormControlGasPanel
      :label="props.label"
      :index="index"
      :instance="props.instance"
    />
  </div>
</template>

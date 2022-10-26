<script lang="ts">
export default { name: "FormControlNumber" };
</script>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  value: number;
  type: string;
  index?: number;
}>();

const number = reactive({
  value: props.value,
});
</script>

<template>
  <v-col cols="12" sm="6">
    <v-text-field
      v-model.number="number.value"
      :label="props.label"
      :type="props.type"
      persistent-hint
      variant="outlined"
      @change="$emit('formInputChange', props.id, number.value, props.index)"
    ></v-text-field>
  </v-col>
</template>

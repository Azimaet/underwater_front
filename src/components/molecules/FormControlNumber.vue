<script lang="ts">
export default { name: "FormControlNumber" };
</script>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  value: number;
  index?: number;
}>();

const number = reactive({
  value: props.value,
});
</script>

<template>
  <v-text-field
    v-model.number="number.value"
    :label="props.label"
    :type="'number'"
    persistent-hint
    variant="outlined"
    @change="$emit('formInputChange', props.id, number.value, props.index)"
    :class="['pb-5']"
  ></v-text-field>
</template>

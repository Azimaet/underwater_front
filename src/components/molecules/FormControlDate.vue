<script lang="ts">
export default { name: "FormControlDate" };
</script>

<script setup lang="ts">
import { useReadablePropName } from "@/composables/utils/stringsResolvers";
import { Dive } from "@/composables/classes/dive";
import { reactive } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  index?: number;
  rules?: [];
  options?: any;
  instance: Dive;
}>();

const date = reactive({ value: props.instance.date });
</script>

<template>
  {{ label }}
  <input
    v-model="date"
    type="date"
    name="dateofbirth"
    id="dateofbirth"
    @change="
      $emit('formInputChange', useReadablePropName(props.id), date, props.index)
    "
  />
</template>

<style scoped>
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}

body {
  padding: 4em;
  font: 13px/1.4 Geneva, "Lucida Sans", "Lucida Grande", "Lucida Sans Unicode",
    Verdana, sans-serif;
}
label {
  display: block;
}
input {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  width: 190px;
}
</style>

<script lang="ts">
export default { name: "FormControlDate" };
</script>

<script setup lang="ts">
import { useReadablePropName } from "@/composables/utils/stringsResolvers";
import { Dive } from "@/types/contents/dive";
import { reactive } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  index?: number;
  rules?: [];
  options?: any;
  instance: Dive;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: string, index?: number): void;
}>();

const date = reactive({ value: props.instance.date });

const handleChange = (event: any) => {
  emit(
    "formInputChange",
    useReadablePropName(props.id),
    event.target.value,
    props.index
  );
};
</script>

<template>
  {{ label }}
  <input
    v-model="date"
    @change="handleChange"
    type="date"
    name="dateofbirth"
    id="dateofbirth"
  />
</template>

<style scoped>
[type="date"] {
  background: #fff
    url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)
    97% 50% no-repeat;
}
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}

body {
  padding: 4em;
  background: #e5e5e5;
  font: 13px/1.4 Geneva, "Lucida Sans", "Lucida Grande", "Lucida Sans Unicode",
    Verdana, sans-serif;
}
label {
  display: block;
}
input {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  width: 190px;
}
</style>
<script lang="ts">
export default { name: "FormControlGasGroup" };
</script>

<script setup lang="ts">
import { Dive } from "@/composables/classes/dive";
import FormControlGasPanel from "@/components/molecules/FormControlGasPanel.vue";
import FormControlNumber from "@/components/molecules/FormControlNumber.vue";
import { translations } from "@/i18n/index";

const { PRESSURE_END, PRESSURE_START } = translations.en.GAS;

const props = defineProps<{
  id: string;
  label: string;
  instance: Dive;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: number, index?: number, subId?: string): void;
}>();

const handleChange = (
  id: string,
  value: number,
  index?: number,
  subId?: string
) => {
  emit("formInputChange", id, value, index, subId);
};
</script>

<template>
  <div
    v-for="(item, index) in instance[id as keyof typeof instance]"
    :key="index"
  >
    <FormControlGasPanel
      :label="props.label"
      :index="Number(index)"
      :instance="props.instance"
    />
    <FormControlNumber
      :id="id"
      :sub-id="'_pressureStart'"
      :label="PRESSURE_START"
      :index="Number(index)"
      :instance="instance"
      @form-input-change="handleChange"
    />
    <FormControlNumber
      :id="id"
      :sub-id="'_pressureEnd'"
      :label="PRESSURE_END"
      :index="Number(index)"
      :instance="instance"
      @form-input-change="handleChange"
    />
  </div>
</template>

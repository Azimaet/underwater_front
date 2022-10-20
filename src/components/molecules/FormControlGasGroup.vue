<script lang="ts">
export default { name: "FormControlGasGroup" };
</script>

<script setup lang="ts">
import FormControlNumber from "@/components/molecules/FormControlNumber.vue";
import FormControlGasPanel from "@/components/molecules/FormControlGasPanel.vue";
import { translations } from "@/i18n/index";
import { GasTank } from "@/composables/types/gas";
import { GasMix } from "../../composables/types/gas";

const { PRESSURE_END, PRESSURE_START } = translations.en.GAS;

const props = defineProps<{
  id: string;
  label: string;
  value: GasTank[];
}>();

const emit = defineEmits<{
  (
    e: string,
    id: string,
    value: number | GasMix,
    index?: number,
    subId?: string
  ): void;
}>();

const handleChange = (
  subId: string,
  value: number | GasMix,
  index?: number
) => {
  emit("formInputChange", props.id, value, index, subId);
};
</script>

<template>
  <div v-for="(item, index) in value" :key="index">
    <FormControlGasPanel
      :id="'gasMix'"
      :index="index"
      :label="props.label"
      :value="props.value[index as number].gasMix"
      @form-input-change="handleChange"
    />
    <FormControlNumber
      :id="'pressureStart'"
      :index="index"
      :label="PRESSURE_START"
      :value="props.value[index as number].pressureStart"
      @form-input-change="handleChange"
    />
    <FormControlNumber
      :id="'pressureEnd'"
      :index="index"
      :label="PRESSURE_END"
      :value="props.value[index as number].pressureEnd"
      @form-input-change="handleChange"
    />
  </div>
</template>

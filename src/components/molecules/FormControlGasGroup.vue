<script setup lang="ts">
import { translations } from "@/i18n/index";
import { GasTank, GasMix } from "@/types/global/gas";
import { isMobile } from "@/composables/utils/isMobile";

const { PRESSURE_END, PRESSURE_START, GAS_MIX } = translations.en.GAS;

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
  <v-card :title="GAS_MIX" border rounded :elevation="5">
    <v-row>
      <template v-for="(item, index) in value" :key="index">
        <v-col :cols="isMobile.value ? 12 : 6">
          <v-card>
            <v-card-text>
              <FormControlNumber
                :id="'pressureStart'"
                :index="index"
                :label="PRESSURE_START"
                :value="props.value[index as number].pressureStart"
                @form-input-change="handleChange"
              />
            </v-card-text>
            <v-card-text>
              <FormControlNumber
                :id="'pressureEnd'"
                :index="index"
                :label="PRESSURE_END"
                :value="props.value[index as number].pressureEnd"
                @form-input-change="handleChange"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col :cols="isMobile.value ? 12 : 6">
          <FormControlGasPanel
            :id="'gasMix'"
            :index="index"
            :label="props.label"
            :value="props.value[index as number].gasMix"
            @form-input-change="handleChange"
          />
        </v-col>
      </template>
    </v-row>
  </v-card>
</template>

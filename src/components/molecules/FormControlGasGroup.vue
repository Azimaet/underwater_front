<script setup lang="ts">
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
  <v-card :title="'Gas Mix'" border rounded :elevation="5">
    <v-row>
      <template v-for="(item, index) in value" :key="index">
        <v-col>
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
        <v-col>
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

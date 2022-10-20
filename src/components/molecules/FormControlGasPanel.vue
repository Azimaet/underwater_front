<script lang="ts">
export default { name: "FormControlGasPanel" };
</script>

<script setup lang="ts">
import { useGasNameProvider } from "@/composables/gasNameProvider";
import { computed, reactive, ref } from "vue";
import { GasMix } from "@/composables/types/gas";
import { useGasMixUpdater } from "@/composables/gasMixUpdater";

const props = defineProps<{
  id: string;
  label: string;
  value: GasMix;
  index: number;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: GasMix, index?: number, subId?: string): void;
}>();

let oxygenIsLocked = ref(false);
let nitrogenIsLocked = ref(false);
let heliumIsLocked = ref(true);

const lockedGas = computed(() => {
  return oxygenIsLocked.value
    ? "oxygen"
    : nitrogenIsLocked.value
    ? "nitrogen"
    : heliumIsLocked.value
    ? "helium"
    : "";
});

const state = reactive({
  oxygen: props.value.oxygen,
  nitrogen: props.value.nitrogen,
  helium: props.value.helium,
  name: useGasNameProvider(props.value),
  disabledGas: lockedGas,
});

const handleChange = (value: number, propId: string) => {
  let newMix: GasMix = {
    helium: state.helium,
    oxygen: state.oxygen,
    nitrogen: state.nitrogen,
  };
  newMix[propId as keyof typeof newMix] = value;
  newMix = useGasMixUpdater(newMix, propId, state.disabledGas);
  state.oxygen = newMix.oxygen;
  state.nitrogen = newMix.nitrogen;
  state.helium = newMix.helium;
  state.name = useGasNameProvider(newMix);

  emit("formInputChange", props.id, newMix, props.index);
};

const checkChange = (value: boolean, context: string) => {
  if (!value) return;

  if (context === "oxygen") {
    nitrogenIsLocked.value = !oxygenIsLocked.value;
    heliumIsLocked.value = !oxygenIsLocked.value;
  } else if (context === "nitrogen") {
    oxygenIsLocked.value = !nitrogenIsLocked.value;
    heliumIsLocked.value = !nitrogenIsLocked.value;
  } else if (context === "helium") {
    oxygenIsLocked.value = !heliumIsLocked.value;
    nitrogenIsLocked.value = !heliumIsLocked.value;
  }
};
</script>

<template>
  <v-card width="400" style="margin: auto">
    {{ state.name }}
    <v-card-text>
      <v-slider
        v-model="state.oxygen"
        @update:model-value="handleChange(state.oxygen, 'oxygen')"
        :readonly="oxygenIsLocked"
        :max="100"
        :min="0"
        :step="1"
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="state.oxygen"
            @change="handleChange(state.oxygen, 'oxygen')"
            :readonly="oxygenIsLocked"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>

          <v-checkbox
            v-model="oxygenIsLocked"
            @change="checkChange(oxygenIsLocked, 'oxygen')"
            :label="`Lock gas`"
          ></v-checkbox>
        </template>
      </v-slider>

      <v-slider
        v-model="state.nitrogen"
        @update:model-value="handleChange(state.nitrogen, 'nitrogen')"
        :readonly="nitrogenIsLocked"
        :max="100"
        :min="0"
        :step="1"
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="state.nitrogen"
            @change="handleChange(state.nitrogen, 'nitrogen')"
            :readonly="nitrogenIsLocked"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>

          <v-checkbox
            v-model="nitrogenIsLocked"
            @change="checkChange(nitrogenIsLocked, 'nitrogen')"
            :label="`Lock gas`"
          ></v-checkbox>
        </template>
      </v-slider>

      <v-slider
        v-model="state.helium"
        @update:model-value="handleChange(state.helium, 'helium')"
        :readonly="heliumIsLocked"
        :max="100"
        :min="0"
        :step="1"
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="state.helium"
            @change="handleChange(state.helium, 'helium')"
            :readonly="heliumIsLocked"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>

          <v-checkbox
            v-model="heliumIsLocked"
            @change="checkChange(heliumIsLocked, 'helium')"
            :label="`Lock gas`"
          ></v-checkbox>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

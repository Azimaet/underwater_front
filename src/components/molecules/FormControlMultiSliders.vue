<script lang="ts">
export default { name: "FormControlMultiSliders" };
</script>

<script setup lang="ts">
import { Dive } from "@/composables/classes/dive";
import { computed, reactive, ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  index: number;
  rules?: [];
  options?: any;
  instance: Dive;
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
  oxygen: props.instance.gasTanks[props.index].gasMix.oxygen,
  nitrogen: props.instance.gasTanks[props.index].gasMix.nitrogen,
  helium: props.instance.gasTanks[props.index].gasMix.helium,
  name: props.instance.gasTanks[props.index].getGasName(),
  disabledGas: lockedGas,
});

const handleChange = (value: any, propId: string) => {
  let newMix = { ...props.instance.gasTanks[props.index].gasMix };
  newMix[propId as keyof typeof newMix] = value;
  props.instance.gasTanks[props.index].updateGasMix(newMix, state.disabledGas);

  state.oxygen = props.instance.gasTanks[props.index].gasMix.oxygen;
  state.nitrogen = props.instance.gasTanks[props.index].gasMix.nitrogen;
  state.helium = props.instance.gasTanks[props.index].gasMix.helium;
  state.name = props.instance.gasTanks[props.index].getGasName();
};

const checkChange = (value, context) => {
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

    <v-btn rounded="pill" color="primary"> Oxygen </v-btn>

    <v-btn rounded="pill" color="primary"> Air </v-btn>

    <v-btn rounded="pill" color="primary"> Nitrox36 </v-btn>
  </v-card>
</template>

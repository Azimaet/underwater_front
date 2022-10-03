<script lang="ts">
export default { name: "FormControlMultiSliders" };
</script>

<script setup lang="ts">
import { useReadablePropName } from "@/composables/utils/stringsResolvers";
import { Dive } from "@/types/contents/dive";
import { reactive, ref, watchEffect, computed } from "vue";
import { GasMix, GasTank } from "../../types/contents/gasTank";

const props = defineProps<{
  id: string;
  label: string;
  index?: number;
  rules?: [];
  options?: any;
  instance: Dive;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: any, index?: number): void;
}>();

const gasTank = reactive({
  value:
    props.instance[
      useReadablePropName(props.id) as keyof typeof props.instance
    ]?.[props.index as keyof typeof props.index],
});

// const oxygen = ref(gasTank.value?.gasMix.oxygen);
const oxygen = computed(() => {
  return gasTank.value?.gasMix.oxygen;
});

const nitrogen = computed(() => {
  return gasTank.value?.gasMix.nitrogen;
});

const helium = computed(() => {
  return gasTank.value?.gasMix.helium;
});

// const nitrogen = ref(gasTank.value?.gasMix.nitrogen);

// const helium = ref(gasTank.value?.gasMix.helium);

const handleChange = (value: any, propId: string) => {
  gasTank.value.gasMix[propId as keyof typeof gasTank] = value;
  gasTank.value.setGasMix(gasTank.value.gasMix, propId);

  console.log(props.instance);

  // emit(
  //   "formInputChange",
  //   useReadablePropName(props.id),
  //   gasTank.value,
  //   props.index
  // );
};

const currentGasMix = () => {
  return props.instance.gasTanks[
    props.index as keyof typeof props.index
  ].getGasName();
};
</script>

<template>
  <v-card width="400" style="margin: auto">
    <v-card-text>
      {{ currentGasMix() }}
      <v-slider
        v-model="oxygen"
        @update:model-value="handleChange(oxygen, 'oxygen')"
        :max="100"
        :step="1"
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="oxygen"
            @change="handleChange(oxygen, 'oxygen')"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="nitrogen"
        @change="handleChange(nitrogen, 'nitrogen')"
        :max="100"
        :step="1"
        label="G"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="nitrogen"
            @change="handleChange(nitrogen, 'nitrogen')"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="helium"
        @change="handleChange(helium, 'helium')"
        :max="100"
        :step="1"
        label="B"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="helium"
            @change="handleChange(helium, 'helium')"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>
    </v-card-text>

    <v-btn rounded="pill" color="primary"> Oxygen </v-btn>

    <v-btn rounded="pill" color="primary"> Air </v-btn>

    <v-btn rounded="pill" color="primary"> Nitrox36 </v-btn>
  </v-card>
</template>

<script lang="ts">
export default { name: "FormMultiSlidersField" };
</script>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  options?: any;
}>();

const oxygen = ref(21);
const nitrogen = ref(79);
const helium = ref(0);

const currentGasMix = () => {
  return "TODO";
};
</script>

<template>
  <v-card width="400" style="margin: auto">
    <v-card-text>
      {{ currentGasMix() }}
      <v-slider
        v-model="oxygen"
        :max="100"
        :step="1"
        label="R"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="oxygen"
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
        :max="100"
        :step="1"
        label="G"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="nitrogen"
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
        :max="100"
        :step="1"
        label="B"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="helium"
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

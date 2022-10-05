<script lang="ts">
export default { name: "FormControlComboBox" };
</script>

<script setup lang="ts">
import { queryDivingTypes } from "@/composables/graphql/queryDivingTypes";
import { ref } from "vue";
import { Dive } from "@/composables/classes/dive";

const props = defineProps<{
  id: string;
  label: string;
  index?: number;
  rules?: [];
  options?: any;
  instance: Dive;
}>();

const types = ref([]);
const items = queryDivingTypes();
</script>

<template>
  <v-col cols="12">
    <v-combobox
      v-model="types"
      :items="items"
      :label="label"
      multiple
      chips
      @change="$emit('formInputChange', props.id, types)"
    ></v-combobox>
  </v-col>
</template>

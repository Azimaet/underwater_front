<script lang="ts">
export default { name: "FormMComboBoxField" };
</script>

<script setup lang="ts">
import { queryDivingTypes } from "@/composables/graphql/queryDivingTypes";
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  options?: any;
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
    ></v-combobox>
  </v-col>
</template>

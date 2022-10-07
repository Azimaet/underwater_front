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

const types = ref();
const items = queryDivingTypes();
</script>

<template>
  <v-col cols="12">
    <v-combobox
      v-model="types"
      :items="items"
      :item-title="'label'"
      :item-value="'id'"
      :label="label"
      multiple
      chips
      @update:modelValue="
        $emit(
          'formInputChange',
          props.id,
          types.map((type: any) => type.id)
        )
      "
    ></v-combobox>
  </v-col>
</template>

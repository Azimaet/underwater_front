<script lang="ts">
export default { name: "FormControlNumber" };
</script>

<script setup lang="ts">
import { useReadablePropName } from "@/composables/utils/stringsResolvers";
import { Dive } from "@/composables/classes/dive";
import { computed, ref } from "vue";

const props = defineProps<{
  id: string;
  subId?: string;
  label: string;
  index?: number;
  instance: Dive;
}>();

const numberValue = computed(() => {
  if (
    props.id === "_gasTanks" &&
    props.subId !== undefined &&
    props.index !== undefined
  ) {
    let value: any =
      props.instance[
        useReadablePropName(props.id) as keyof typeof props.instance
      ];

    value = value[props.index][props.subId];
    return value;
  } else {
    return props.instance[
      useReadablePropName(props.id) as keyof typeof props.instance
    ];
  }
});

const number = ref(numberValue.value);
</script>

<template>
  <v-col cols="12" sm="6">
    <v-text-field
      v-model.number="number"
      :label="label"
      persistent-hint
      variant="outlined"
      @change="
        $emit('formInputChange', props.id, number, props.index, props.subId)
      "
    ></v-text-field>
  </v-col>
</template>

<script lang="ts">
export default { name: "FormControlNumber" };
</script>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  value: number;
  index?: number;
}>();

// const numberValue = computed(() => {
//   if (
//     props.id === "_gasTanks" &&
//     props.subId !== undefined &&
//     props.index !== undefined
//   ) {
//     return props.instance[props.id as keyof typeof props.instance][props.index][
//       props.subId
//     ];
//   } else {
//     return props.instance[props.id as keyof typeof props.instance];
//   }
// });

// const number = ref(numberValue.value);

const number = reactive({
  value: props.value,
});
</script>

<template>
  <v-col cols="12" sm="6">
    <v-text-field
      v-model.number="number.value"
      :label="label"
      persistent-hint
      variant="outlined"
      @change="$emit('formInputChange', props.id, number.value, props.index)"
    ></v-text-field>
  </v-col>
</template>

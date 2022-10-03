<script lang="ts">
export default { name: "FormControlNumber" };
</script>

<script setup lang="ts">
import { useReadablePropName } from "@/composables/utils/stringsResolvers";
import { Dive } from "@/types/contents/dive";
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  index?: number;
  rules?: [];
  options?: any;
  instance: Dive;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: string, index?: number): void;
}>();

const number = ref(
  props.instance[useReadablePropName(props.id) as keyof typeof props.instance]
);

const handleChange = (event: any) => {
  console.log("ok");
  emit(
    "formInputChange",
    useReadablePropName(props.id),
    event.target.value,
    props.index
  );
};
</script>

<template>
  <v-col cols="12" sm="6">
    <v-text-field
      v-model.number="number"
      @change="handleChange"
      :label="label"
      :rules="rules"
      persistent-hint
      variant="outlined"
    ></v-text-field>
  </v-col>
</template>

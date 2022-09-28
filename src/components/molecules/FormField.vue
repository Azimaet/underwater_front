<script lang="ts">
export default { name: "FormField" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { FormFieldInterface } from "@/types/components/form";

const props = defineProps<{
  field: FormFieldInterface;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

function updateValue(value: string | null) {
  emit("update:modelValue", value);
}
</script>

<template>
  <v-col cols="12" md="4">
    <!-- <v-text-field
      :placeholder="field.model"
      :value="props.modelValue"
      v-on:input="updateValue(($event.target as HTMLTextAreaElement).value)"
      :rules="field.rules"
      :label="field.label"
      required="{{ field.required }}"
    ></v-text-field> -->
  </v-col>
</template>

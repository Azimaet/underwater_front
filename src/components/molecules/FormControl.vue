<script lang="ts">
export default { name: "FormControl" };
</script>

<script setup lang="ts">
import { FormControl } from "@/composables/types/form";
import { Dive } from "@/composables/classes/dive";
import { defineAsyncComponent } from "vue";

const FormControlDate = defineAsyncComponent(
  () => import("@/components/molecules/FormControlDate.vue")
);
const FormControlSelect = defineAsyncComponent(
  () => import("@/components/molecules/FormControlSelect.vue")
);
const FormControlComboBox = defineAsyncComponent(
  () => import("@/components/molecules/FormControlComboBox.vue")
);
const FormControlMultiSliders = defineAsyncComponent(
  () => import("@/components/molecules/FormControlMultiSliders.vue")
);
const FormControlNumber = defineAsyncComponent(
  () => import("@/components/molecules/FormControlNumber.vue")
);

const props = defineProps<{
  component: FormControl;
  instance: Dive;
}>();
</script>

<template>
  <template v-if="component.isMultipliable">
    <component
      v-for="(item, index) in instance[component.id as keyof typeof instance]"
      :is="
        component.props?.name === 'FormControlDate'
          ? FormControlDate
          : component.props?.name === 'FormControlSelect'
          ? FormControlSelect
          : component.props?.name === 'FormControlComboBox'
          ? FormControlComboBox
          : component.props?.name === 'FormControlMultiSliders'
          ? FormControlMultiSliders
          : component.props?.name === 'FormControlNumber'
          ? FormControlNumber
          : ''
      "
      :key="index"
      :index="index"
      :id="component.id"
      :label="component.props?.label"
      :rules="component.props?.rules"
      :options="component.props?.options"
      :instance="props.instance"
    ></component>
  </template>
  <template v-else>
    <component
      :is="
        component.props?.name === 'FormControlDate'
          ? FormControlDate
          : component.props?.name === 'FormControlSelect'
          ? FormControlSelect
          : component.props?.name === 'FormControlComboBox'
          ? FormControlComboBox
          : component.props?.name === 'FormControlMultiSliders'
          ? FormControlMultiSliders
          : component.props?.name === 'FormControlNumber'
          ? FormControlNumber
          : ''
      "
      :id="component.id"
      :label="component.props?.label"
      :rules="component.props?.rules"
      :options="component.props?.options"
      :instance="props.instance"
    ></component>
  </template>
</template>

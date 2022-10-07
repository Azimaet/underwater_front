<script lang="ts">
export default { name: "FormDiveCreate" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { Dive } from "@/composables/classes/dive";
import { useFormFactory } from "@/composables/factory/formFactory";
import { FormActions } from "@/composables/types/form";
import { defineAsyncComponent } from "vue";
import { useReadablePropName } from "@/composables/utils/stringsResolvers";
import { GasTank } from "@/composables/classes/gasTank";

const FormControlDate = defineAsyncComponent(
  () => import("@/components/molecules/FormControlDate.vue")
);
const FormControlSelect = defineAsyncComponent(
  () => import("@/components/molecules/FormControlSelect.vue")
);
const FormControlComboBox = defineAsyncComponent(
  () => import("@/components/molecules/FormControlComboBox.vue")
);
const FormControlNumber = defineAsyncComponent(
  () => import("@/components/molecules/FormControlNumber.vue")
);
const FormControlGasGroup = defineAsyncComponent(
  () => import("@/components/molecules/FormControlGasGroup.vue")
);

const valid = ref(false);

const dive = new Dive();

const form = useFormFactory(FormActions.DIVE_CREATE, dive);

const handleChange = (id: string, value: any, index: number, subId: string) => {
  console.log(dive);
  if (useReadablePropName(id) === "date") {
    dive.date = value;
  } else if (useReadablePropName(id) === "maxDepth") {
    dive.maxDepth = parseInt(value);
  } else if (useReadablePropName(id) === "totalTime") {
    dive.totalTime = parseInt(value);
  } else if (useReadablePropName(id) === "gasTanks") {
    const tank: GasTank = dive.gasTanks[index as number];
    const prop: string = useReadablePropName(subId);
    tank[prop as keyof typeof tank] = value;
  } else if (useReadablePropName(id) === "divingEnvironment") {
    dive.divingEnvironment = value;
  } else if (useReadablePropName(id) === "divingRole") {
    dive.divingRole = value;
  } else if (useReadablePropName(id) === "divingType") {
    dive.divingType = value;
  }
  console.log(dive);
};
</script>

<template>
  <div>
    <v-form v-model="valid" lazy-validation>
      <component
        v-for="(component, index) in form.controls"
        :key="index"
        :is="
          component.props?.name === 'FormControlDate'
            ? FormControlDate
            : component.props?.name === 'FormControlSelect'
            ? FormControlSelect
            : component.props?.name === 'FormControlComboBox'
            ? FormControlComboBox
            : component.props?.name === 'FormControlGasGroup'
            ? FormControlGasGroup
            : component.props?.name === 'FormControlNumber'
            ? FormControlNumber
            : ''
        "
        :id="component.id"
        :label="component.props?.label"
        :rules="component.props?.rules"
        :options="component.props?.options"
        :instance="dive"
        @form-input-change="handleChange"
      ></component>
    </v-form>
  </div>
</template>

<script lang="ts">
export default { name: "FormAddDive" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { Dive } from "@/types/contents/dive";
import { GasInterface } from "@/types/contents/gas";
import { useFormFactory } from "../../composables/factory/formFactory";
import { defineAsyncComponent } from "vue";
import { FormActions } from "@/types/components/form";

const FormDateField = defineAsyncComponent(
  () => import("@/components/molecules/FormDateField.vue")
);
const FormSelectField = defineAsyncComponent(
  () => import("@/components/molecules/FormSelectField.vue")
);
const FormComboBoxField = defineAsyncComponent(
  () => import("@/components/molecules/FormComboBoxField.vue")
);
const FormMultiSlidersField = defineAsyncComponent(
  () => import("@/components/molecules/FormMultiSlidersField.vue")
);
const FormNumberField = defineAsyncComponent(
  () => import("@/components/molecules/FormNumberField.vue")
);
const valid = ref(false);

/* DIVE MANAGER */
const dive = new Dive();
const index = 1;
const tank: GasInterface = {
  gasMix: {
    helium: 0,
    oxygen: 21,
    nitrogen: 79,
  },
  pressureStart: 200,
  pressureEnd: 50,
};
dive.setGasTank(index, tank);

const form = useFormFactory(FormActions.DIVE_CREATE, dive);

console.log(form);
console.log(dive);
</script>

<template>
  <div>
    <v-form v-model="valid" lazy-validation>
      <component
        v-for="(component, index) in form.controls"
        :is="
          component.props?.name === 'FormDateField'
            ? FormDateField
            : component.props?.name === 'FormSelectField'
            ? FormSelectField
            : component.props?.name === 'FormComboBoxField'
            ? FormComboBoxField
            : component.props?.name === 'FormMultiSlidersField'
            ? FormMultiSlidersField
            : component.props?.name === 'FormNumberField'
            ? FormNumberField
            : ''
        "
        :key="index"
        :id="component.id"
        :label="component.props?.label"
        :rules="component.props?.rules"
        :options="component.props?.options"
      ></component>
    </v-form>
  </div>
</template>

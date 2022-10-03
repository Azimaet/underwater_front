<script lang="ts">
export default { name: "FormDiveCreate" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { Dive } from "@/types/contents/dive";
import { useFormFactory } from "../../composables/factory/formFactory";
import { FormActions } from "@/types/components/form";
import FormControl from "@/components/molecules/FormControl.vue";
import { useReadablePropName } from "@/composables/utils/stringsResolvers";

const valid = ref(false);

/* DIVE MANAGER */
const dive = new Dive();

const form = useFormFactory(FormActions.DIVE_CREATE, dive);

const handleChange = (id: string, value: any, index?: number) => {
  console.log(event);
  switch (id) {
    case "date":
      dive.date = value;
      break;
    case "maxDepth":
      dive.maxDepth = value;
      break;
    case "totalTime":
      dive.totalTime = value;
      break;
    case "gasTanks":
      dive.setGasTank(index, value);
      break;
    default:
      break;
  }
  console.log(dive);
};
</script>

<template>
  <div>
    <v-form v-model="valid" lazy-validation>
      <FormControl
        v-for="(component, index) in form.controls"
        :key="index"
        :component="component"
        :instance="dive"
        @form-input-change="handleChange"
      ></FormControl>
    </v-form>
  </div>
</template>

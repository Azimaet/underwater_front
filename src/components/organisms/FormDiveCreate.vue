<script lang="ts">
export default { name: "FormDiveCreate" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { Dive } from "@/composables/classes/dive";
import { useFormFactory } from "@/composables/factory/formFactory";
import { FormActions } from "@/composables/types/form";
import FormControl from "@/components/molecules/FormControl.vue";

const valid = ref(false);

const dive = new Dive();

const form = useFormFactory(FormActions.DIVE_CREATE, dive);

// const handleChange = (id: string, value: any, index?: number) => {
//   switch (id) {
//     case "date":
//       dive.date = value;
//       break;
//     case "maxDepth":
//       dive.maxDepth = value;
//       break;
//     case "totalTime":
//       dive.totalTime = value;
//       break;
//     // case "gasTanks":
//     //   dive.setGasTank(index, value);
//     // break;
//     default:
//       break;
//   }
//   console.log(dive);
// };
</script>

<template>
  <div>
    <v-form v-model="valid" lazy-validation>
      <FormControl
        v-for="(component, index) in form.controls"
        :key="index"
        :component="component"
        :instance="dive"
      ></FormControl>
    </v-form>
  </div>
</template>

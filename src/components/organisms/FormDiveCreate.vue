<script lang="ts">
export default { name: "FormDiveCreate" };
</script>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useFormFactory } from "@/composables/formFactory";
import { FormActions } from "@/composables/types/form";
import { defineAsyncComponent } from "vue";
import ButtonElement from "@/components/atoms/ButtonElement.vue";
import { useMutation } from "@vue/apollo-composable";

import { MUTATION_CREATE_DIVE } from "@/graphql/mutations/createDive";

import { DiveInterface } from "@/composables/types/dive";
import { DivingThemeInterface } from "@/composables/types/divingTheme";
import { GasMix } from "@/composables/types/gas";

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

const dive: DiveInterface = reactive({
  id: null,
  uuid: null,
  createdAt: null,
  updatedAt: null,
  date: new Date(),
  totalTime: 0,
  maxDepth: 0,
  gasTanks: [
    {
      gasMix: {
        helium: 0,
        oxygen: 21,
        nitrogen: 79,
      },
      pressureStart: 200,
      pressureEnd: 50,
    },
  ],
  divingType: [],
  divingEnvironment: null,
  divingRole: null,
  owner: null,
});

const payload = reactive({
  date: dive.date,
  totalTime: dive.totalTime,
  maxDepth: dive.maxDepth,
  gasTanks: dive.gasTanks,
  divingType: dive.divingType,
  divingEnvironment: dive.divingEnvironment,
  divingRole: dive.divingRole,
});

const form = useFormFactory(FormActions.DIVE_CREATE, dive);

const handleChange = (
  id: string,
  value:
    | Date
    | DivingThemeInterface
    | DivingThemeInterface[]
    | GasMix
    | number
    | null,
  index: number,
  subId: string
) => {
  switch (id) {
    case "date":
      dive.date = value as Date;
      break;
    case "maxDepth":
      dive.maxDepth = value as number;
      break;
    case "totalTime":
      dive.totalTime = value as number;
      break;
    case "divingRole":
      dive.divingRole = value as DivingThemeInterface | null;
      break;
    case "divingEnvironment":
      dive.divingEnvironment = value as DivingThemeInterface | null;
      break;
    case "divingType":
      dive.divingType = value as DivingThemeInterface[];
      break;
    case "gasTanks":
      switch (subId) {
        case "pressureEnd":
          dive.gasTanks[index as number].pressureEnd = value as number;
          break;
        case "pressureStart":
          dive.gasTanks[index as number].pressureStart = value as number;
          break;
        case "gasMix":
          dive.gasTanks[index as number].gasMix = value as GasMix;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};

const { mutate: createDive } = useMutation(MUTATION_CREATE_DIVE, {
  variables: {
    input: payload,
  },
});

watch(dive, async () => {
  payload.date = dive.date;
  payload.totalTime = dive.totalTime;
  payload.maxDepth = dive.maxDepth;
  payload.gasTanks = dive.gasTanks;
  payload.divingType = dive.divingType;
  payload.divingEnvironment = dive.divingEnvironment;
  payload.divingRole = dive.divingRole;
});
</script>

<template>
  <div class="py-15">
    <v-form v-model="valid" lazy-validation>
      <Suspense>
        <component
          v-for="(component, index) in form.controls"
          :key="index"
          :is="
            component.props?.name === 'FormControlDate'
              ? FormControlDate
              : component.props?.name === 'FormControlNumber'
              ? FormControlNumber
              : component.props?.name === 'FormControlSelect'
              ? FormControlSelect
              : component.props?.name === 'FormControlComboBox'
              ? FormControlComboBox
              : component.props?.name === 'FormControlGasGroup'
              ? FormControlGasGroup
              : ''
          "
          :id="component.id"
          :label="component.props?.label"
          :value="dive[component.id as keyof typeof dive]"
          :action="component.props?.options"
          @form-input-change="handleChange"
        ></component>
      </Suspense>
      <ButtonElement
        v-for="(input, index) in form.inputs"
        :key="index"
        :label="input.label"
        :action="input.action"
        @click="createDive"
      ></ButtonElement>
    </v-form>
  </div>
</template>

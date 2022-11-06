<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useFormFactory } from "@/composables/formFactory";
import { FormActions } from "@/composables/types/form";
import { defineAsyncComponent } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { MUTATION_CREATE_DIVE } from "@/graphql/mutations/createDive";
import router from "@/router";
import { DiveInterface } from "@/composables/types/dive";
import { DivingThemeInterface } from "@/composables/types/divingTheme";
import { GasMix } from "@/composables/types/gas";
import { useAlertFactory } from "@/composables/alertFactory";

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

const loading = ref(false);

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

const { mutate, onDone, onError } = useMutation(MUTATION_CREATE_DIVE, {
  variables: {
    input: payload,
  },
});

const load = () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 5000);
};

onError((error) => {
  useAlertFactory("error", error.toString());
});

onDone(() => {
  useAlertFactory("success", "New dive added!");
  router.push({ name: "dive_form" });
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
  <Suspense>
    <v-row justify="center">
      <v-col cols="12">
        <v-form v-model="valid">
          <v-card width="100%" :class="['px-15']" :color="'grey900'" rounded>
            <v-card-title>
              <div
                :class="[
                  'text-h4',
                  'font-weight-medium',
                  'text-center',
                  'mt-5',
                  'mb-10',
                ]"
              >
                {{ form.title }}
              </div>
            </v-card-title>
            <v-card-text>
              <template
                v-for="(component, index) in form.controls"
                :key="index"
              >
                <template v-if="component.props?.name">
                  <component
                    :is="
                      component.props?.name === 'FormControlDate'
                        ? FormControlDate
                        : component.props?.name === 'FormControlNumber'
                        ? FormControlNumber
                        : component.props?.name === 'FormControlSelect'
                        ? FormControlSelect
                        : component.props?.name === 'FormControlComboBox'
                        ? FormControlComboBox
                        : FormControlGasGroup
                    "
                    :id="component.id"
                    :value="dive[component.id as keyof typeof dive]"
                    :label="component.props?.label"
                    :query="component.props?.query"
                    :type="component.props?.type"
                    :rules="component.props?.rules"
                    :icon="component.props?.icon"
                    :subtitle="component.props?.subtitle"
                    :action="component.props?.query"
                    @form-input-change="handleChange"
                  ></component>
                </template>
              </template>
            </v-card-text>
            <v-card-actions>
              <ButtonComponent
                :label="'Add dive'"
                :color="'success'"
                :size="'x-large'"
                :btn-classes="['my-5', 'mx-5']"
                :loading="loading"
                :disabled="loading"
                @click="mutate(), load()"
              />
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </Suspense>
</template>

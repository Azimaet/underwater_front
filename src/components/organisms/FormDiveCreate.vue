<script setup lang="ts">
import { ref, reactive, watch, defineAsyncComponent } from "vue";
import { useFormFactory } from "@/composables/formFactory";
import { FormActions } from "@/types/models/form";
import { useMutation } from "@vue/apollo-composable";
import { MUTATION_CREATE_DIVE } from "@/graphql/mutations/createDive";
import { MUTATION_UPDATE_DIVE } from "@/graphql/mutations/updateDive";
import router from "@/router";
import { DiveInterface } from "@/types/global/dive";
import {
  DivingThemeEdgeInterface,
  DivingThemeInterface,
} from "@/types/global/divingTheme";
import { GasMix } from "@/types/global/gas";
import { useAlertFactory } from "@/composables/alertFactory";
import { isMobile } from "@/composables/utils/isMobile";
import { translations } from "@/i18n/index";
import { formatISO } from "date-fns";

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

const { NEW_DIVE, UPDATE_DIVE } = translations.en.ALERTS;
const { BUTTON_ADD, BUTTON_UPDATE } = translations.en.FORM_DIVING;

const isUpdating = !!window.history.state.dive;

const dive: DiveInterface = reactive({
  id: isUpdating ? window.history.state.dive.id : null,
  date: isUpdating ? new Date(window.history.state.dive.date) : new Date(),
  totalTime: isUpdating ? window.history.state.dive.totalTime : 0,
  maxDepth: isUpdating ? window.history.state.dive.maxDepth : 0,
  gasTanks: isUpdating
    ? window.history.state.dive.gasTanks
    : [
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
  divingType: isUpdating ? window.history.state.dive.divingType : { edges: [] },
  divingEnvironment: isUpdating
    ? window.history.state.dive.divingEnvironment
    : null,
  divingRole: isUpdating ? window.history.state.dive.divingRole : null,
  owner: null,
});
console.log("(FormDive)- Existing dive date: " + dive.date);

const form = useFormFactory(
  isUpdating ? FormActions.DIVE_UPDATE : FormActions.DIVE_CREATE,
  dive
);
const valid = ref(false);
const loading = ref(false);

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
      dive[id] = value as Date;
      break;
    case "maxDepth":
    case "totalTime":
      dive[id] = value as number;
      break;
    case "divingRole":
    case "divingEnvironment":
      dive[id] = value as DivingThemeInterface | null;
      break;
    case "divingType":
      dive[id] = value as {
        edges: DivingThemeEdgeInterface[];
      };
      break;
    case "gasTanks":
      switch (subId) {
        case "pressureStart":
        case "pressureEnd":
          dive.gasTanks[index as number][subId] = value as number;
          break;
        case "gasMix":
          dive.gasTanks[index as number][subId] = value as GasMix;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};

const load = () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 5000);
};

const payload = reactive({
  id: isUpdating ? dive.id : null,
  date: formatISO(new Date(dive.date), {
    representation: "complete",
  }),
  totalTime: dive.totalTime,
  maxDepth: dive.maxDepth,
  gasTanks: dive.gasTanks,
  divingType: dive.divingType.edges.map((item) => item.node.id),
  divingEnvironment: dive.divingEnvironment?.id,
  divingRole: dive.divingRole?.id,
});

const { mutate, onDone, onError } = useMutation(
  isUpdating ? MUTATION_UPDATE_DIVE : MUTATION_CREATE_DIVE,
  {
    variables: {
      input: payload,
    },
  }
);

onError((error) => {
  useAlertFactory("error", error.toString());
});

onDone(() => {
  useAlertFactory("success", isUpdating ? UPDATE_DIVE : NEW_DIVE);
  router.push({ name: "dive_form" });
  console.log("(FormDive)- On request: " + payload.date);
});

watch(dive, async () => {
  payload.date = formatISO(new Date(dive.date), {
    representation: "complete",
  });
  payload.totalTime = dive.totalTime;
  payload.maxDepth = dive.maxDepth;
  payload.gasTanks = dive.gasTanks;
  payload.divingType = dive.divingType.edges.map((item) => item.node.id);
  payload.divingEnvironment = dive.divingEnvironment?.id;
  payload.divingRole = dive.divingRole?.id;

  console.log(payload.date);
});
</script>

<template>
  <Suspense>
    <v-form v-model="valid">
      <v-card-title :class="['pb-8']">
        {{ form.title }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <template v-for="component in form.controls" :key="component">
            <v-col
              v-if="component.props?.name"
              :order="
                component.props?.name === 'FormControlDate'
                  ? 1
                  : component.props?.name === 'FormControlNumber'
                  ? 2
                  : component.props?.name === 'FormControlSelect'
                  ? 3
                  : component.props?.name === 'FormControlComboBox'
                  ? 4
                  : component.props?.name === 'FormControlGasGroup'
                  ? 5
                  : 10
              "
              :cols="
                !isMobile.value &&
                (component.props?.name === 'FormControlDate' ||
                  component.props?.name === 'FormControlNumber' ||
                  component.props?.name === 'FormControlSelect' ||
                  component.props?.name === 'FormControlComboBox')
                  ? 4
                  : 12
              "
            >
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
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <ButtonComponent
          :label="isUpdating ? BUTTON_UPDATE : BUTTON_ADD"
          :color="'success'"
          :size="'x-large'"
          :class="['my-5', 'mx-5']"
          :loading="loading"
          :disabled="loading"
          @click="mutate(), load()"
        />
      </v-card-actions>
    </v-form>
  </Suspense>
</template>

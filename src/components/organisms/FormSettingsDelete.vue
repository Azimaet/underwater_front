<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { Form, FormActions } from "@/types/models/form";
import { useFormFactory } from "@/composables/formFactory";
import { MUTATION_DELETE_USER } from "@/graphql/mutations/deleteUser";
import { useMutation } from "@vue/apollo-composable";
import store from "@/store";
import { useAuthLogout } from "@/composables/auth";
import router from "@/router";
import { useAlertFactory } from "@/composables/alertFactory";
import { translations } from "@/i18n/index";

const FormControlText = defineAsyncComponent(
  () => import("@/components/molecules/FormControlText.vue")
);

const loading = ref(false);
const valid = ref(false);
const formTemplate = ref();
const { REMOVE_ACCOUNT } = translations.en.ALERTS;
const { DELETE } = translations.en.FORM_WORDING;

const form: Form = useFormFactory(FormActions.ACCOUNT_DELETE);

const { mutate, onDone, onError } = useMutation(MUTATION_DELETE_USER, {
  variables: {
    input: { id: "/api/users/" + store.state.user.data.id },
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
  useAuthLogout();
  useAlertFactory("success", REMOVE_ACCOUNT);
  router.push({ name: "home" });
});

const onSubmit = async () => {
  const { valid } = await formTemplate.value.validate();

  if (valid) {
    mutate();
    load();
  }
};
</script>

<template>
  <v-form v-model="valid" ref="formTemplate" lazy-validation action="#">
    <PageTitle :label="form.title" />
    <v-card-text>
      <v-row>
        <v-col
          v-for="(component, index) in form.controls"
          cols="12"
          :key="index"
        >
          <component
            :is="FormControlText"
            :id="component.id"
            :label="component.props?.label"
            :action="component.props?.query"
            :type="component.props?.type"
            :rules="component.props?.rules"
          ></component>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        variant="flat"
        color="error"
        :size="'default'"
        :class="['my-2', 'mx-2']"
        :loading="loading"
        :disabled="loading"
        @click="onSubmit"
      >
        {{ DELETE }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

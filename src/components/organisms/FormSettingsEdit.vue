<script setup lang="ts">
import { ref, reactive } from "vue";
import { Form, FormActions } from "@/types/models/form";
import { useFormFactory } from "@/composables/formFactory";
import FormControlText from "@/components/molecules/FormControlText.vue";
import FormControlDoubleText from "@/components/molecules/FormControlDoubleText.vue";
import FormControlRadioList from "@/components/molecules/FormControlRadioList.vue";
import { MUTATION_UPDATE_USER } from "@/graphql/mutations/updateUser";
import { useMutation } from "@vue/apollo-composable";
import store from "@/store";
import { useAuthLogout } from "@/composables/auth";
import router from "@/router";
import { useAlertFactory } from "@/composables/alertFactory";
import { translations } from "@/i18n/index";

const loading = ref(false);
const { EDIT_ACCOUNT } = translations.en.ALERTS;
const { SUBMIT } = translations.en.FORM_WORDING;

const form: Form = useFormFactory(FormActions.ACCOUNT_UPDATE);

const payload = reactive({
  avatar: store.state.user.data.avatar ? store.state.user.data.avatar : "",
  email: store.state.user.data.email,
  id: "/api/users/" + store.state.user.data.id,
  password: "",
  username: store.state.user.data.username,
});

const { mutate, onDone, onError } = useMutation(MUTATION_UPDATE_USER, {
  variables: {
    input: payload,
  },
});

const handleChange = (id: string, value: string) => {
  if (id === "avatar") {
    payload.avatar = value.toString();
  } else if (id === "password") {
    payload.password = value;
  } else if (id === "username") {
    payload.username = value;
  }
};

const load = () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 5000);
};

onError((error) => {
  useAlertFactory("error", error.toString());
});

onDone(() => {
  useAuthLogout();
  useAlertFactory("success", EDIT_ACCOUNT);
  router.push({ name: "home" });
});
</script>

<template>
  <v-form action="#">
    <FormTitle :label="form.title" />
    <v-card-text>
      <v-row>
        <v-col
          v-for="(component, index) in form.controls"
          cols="12"
          :key="index"
        >
          <component
            :is="
              component.props?.name === 'FormControlRadioList'
                ? FormControlRadioList
                : component.props?.name === 'FormControlText'
                ? FormControlText
                : component.props?.name === 'FormControlDoubleText'
                ? FormControlDoubleText
                : ''
            "
            :id="component.id"
            :label="component.props?.label"
            :query="component.props?.query"
            :type="component.props?.type"
            :rules="component.props?.rules"
            :icon="component.props?.icon"
            :subtitle="component.props?.subtitle"
            @form-input-change="handleChange"
          ></component>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        variant="flat"
        color="success"
        :size="'large'"
        :class="['my-2', 'mx-2']"
        :loading="loading"
        :disabled="loading"
        @click="mutate(), load()"
      >
        {{ SUBMIT }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

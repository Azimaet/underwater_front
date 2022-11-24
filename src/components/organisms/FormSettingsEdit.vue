<script setup lang="ts">
import { ref, reactive } from "vue";
import { Form, FormActions } from "@/composables/types/form";
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

const form: Form = useFormFactory(FormActions.ACCOUNT_UPDATE);

const payload = reactive({
  avatar: store.state.user.data.avatar ? store.state.user.data.avatar : "",
  email: store.state.user.data.email,
  id: "/api/users/" + store.state.user.data.id,
  password: "",
  username: store.state.user.data.username,
});

const loading = ref(false);

const handleChange = (id: string, value: string) => {
  if (id === "avatar") {
    payload.avatar = value.toString();
  } else if (id === "password") {
    payload.password = value;
  } else if (id === "username") {
    payload.username = value;
  }
};

const { mutate, onDone, onError } = useMutation(MUTATION_UPDATE_USER, {
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
  useAuthLogout();
  useAlertFactory(
    "success",
    "Your account settings have been updated. Please re-login!"
  );
  router.push({ name: "home" });
});
</script>

<template>
  <v-form>
    <v-card-title :class="['pb-8']">
      {{ form.title }}
    </v-card-title>
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
      <ButtonComponent
        :label="'Submit'"
        :color="'success'"
        :size="'x-large'"
        :class="['my-5', 'mx-5']"
        :loading="loading"
        :disabled="loading"
        @click="mutate(), load()"
      />
    </v-card-actions>
  </v-form>
</template>

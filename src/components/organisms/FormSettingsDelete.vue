<script setup lang="ts">
import ButtonComponent from "@/components/atoms/ButtonComponent.vue";
import { ref } from "vue";
import { Form, FormActions } from "@/composables/types/form";
import { useFormFactory } from "@/composables/formFactory";
import FormControlText from "@/components/molecules/FormControlText.vue";
import { MUTATION_DELETE_USER } from "@/graphql/mutations/deleteUser";
import { useMutation } from "@vue/apollo-composable";
import store from "@/store";
import { useAuthLogout } from "@/composables/auth";
import router from "@/router";
import { useAlertFactory } from "@/composables/alertFactory";

const form: Form = useFormFactory(FormActions.ACCOUNT_DELETE);

const loading = ref(false);

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
  useAlertFactory("success", "Your account have been completely removed!");
  router.push({ name: "home" });
});
</script>

<template>
  <v-row justify="center">
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
        <v-row>
          <v-col
            v-for="(component, index) in form.controls"
            cols="12"
            :key="index"
          >
            <component
              :is="
                component.props?.name === 'FormControlText'
                  ? FormControlText
                  : ''
              "
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
        <ButtonComponent
          :label="'Delete'"
          :color="'error'"
          :size="'x-large'"
          :btn-classes="['my-5', 'mx-5']"
          :loading="loading"
          :disabled="loading"
          @click="mutate(), load()"
        />
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script></script>

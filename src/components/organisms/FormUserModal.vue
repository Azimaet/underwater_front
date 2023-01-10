<script setup lang="ts">
import { ref } from "vue";
import { reactive } from "vue";
import { FormActions, FormUserCredentials } from "@/types/models/form";
import { useAuthLogin } from "@/composables/auth";
import { useFormFactory } from "@/composables/formFactory";
import { MUTATION_CREATE_USER } from "@/graphql/mutations/createUser";
import { useMutation } from "@vue/apollo-composable";
import router from "@/router";
import { useAlertFactory } from "../../composables/alertFactory";
import { translations } from "@/i18n/index";

const { CREATE_USER, ERROR_CREATE_USER } = translations.en.ALERTS;

const props = defineProps<{
  action: FormActions;
}>();

const form = useFormFactory(props.action);

const label = props.action === FormActions.LOGIN ? "Login" : "Register";

const color = props.action === FormActions.LOGIN ? "success" : "primary";

const dialog = ref(false);

const credentials: FormUserCredentials = reactive(
  props.action === FormActions.LOGIN
    ? {
        email: "",
        password: "",
      }
    : {
        email: "",
        password: "",
        username: "",
      }
);

const handleChange = (id: string, text: string) => {
  if (id === "email") {
    credentials.email = text;
  } else if (id === "password") {
    credentials.password = text;
  } else if (id === "username") {
    credentials.username = text;
  }
};

const { mutate, onDone, onError } = useMutation(MUTATION_CREATE_USER, {
  variables: {
    input: credentials,
  },
});

onError((error) => {
  useAlertFactory("error", ERROR_CREATE_USER + error.toString());
  router.push({ name: "home" });
});

onDone(() => {
  useAlertFactory("success", CREATE_USER);
  router.push({ name: "home" });
});
</script>

<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
      <v-btn variant="flat" :size="'default'" :color="color" v-bind="props">
        {{ label }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5"> {{ label }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(component, index) in form.controls"
              cols="12"
              :key="index"
            >
              <FormControlText
                :id="component.id"
                :label="component.props!.label + '*'"
                :type="component.props!.type"
                :rules="component.props?.rules"
                :icon="component.props?.icon"
                @form-input-change="handleChange"
                required
              >
              </FormControlText
            ></v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" :size="'large'" @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          variant="flat"
          :size="'large'"
          :class="['my-2', 'mx-2']"
          :color="props.action === FormActions.LOGIN ? 'success' : 'secondary'"
          @click="
            props.action === FormActions.LOGIN
              ? useAuthLogin(credentials)
              : mutate(),
              (dialog = false)
          "
        >
          {{ label }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

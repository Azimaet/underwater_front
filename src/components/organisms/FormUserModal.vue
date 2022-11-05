<script lang="ts">
export default { name: "FormUserModal" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { reactive } from "vue";
import { FormActions, FormUserCredentials } from "@/composables/types/form";
import { useAuthLogin } from "@/composables/auth";
import { useFormFactory } from "@/composables/formFactory";
import { MUTATION_CREATE_USER } from "@/graphql/mutations/createUser";
import { useMutation } from "@vue/apollo-composable";
import router from "@/router";
import { useAlertFactory } from "../../composables/alertFactory";

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
  useAlertFactory("error", "Error on create User: " + error.toString());
  router.push({ name: "home" });
});

onDone(() => {
  useAlertFactory("success", "A new user have been created!");
  router.push({ name: "home" });
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <ButtonComponent
          :label="label"
          :color="color"
          :size="'x-large'"
          :btn-classes="['my-5', 'mx-5']"
          v-bind="props"
        />
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
          <v-btn color="blue-darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <ButtonComponent
            v-if="props.action === FormActions.LOGIN"
            :label="label"
            :color="color"
            :size="'x-large'"
            :btn-classes="['my-5', 'mx-5']"
            @click="useAuthLogin(credentials), (dialog = false)"
          />
          <ButtonComponent
            v-else
            :label="label"
            :color="color"
            :size="'x-large'"
            :btn-classes="['my-5', 'mx-5']"
            @click="mutate(), (dialog = false)"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

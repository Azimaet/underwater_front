<script lang="ts">
export default { name: "UserFormModal" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import ButtonComponent from "@/components/atoms/ButtonComponent.vue";

import { reactive } from "vue";
import { FormActions, FormLoginCredentials } from "@/composables/types/form";
import { useAuthLogin } from "@/composables/auth";
import { useFormFactory } from "@/composables/formFactory";
import FormControlText from "@/components/molecules/FormControlText.vue";
import { useReadablePropName } from "@/composables/utils/stringsResolvers";

const props = defineProps<{
  action: FormActions;
}>();

const label = props.action === FormActions.LOGIN ? "Login" : "Register";

const color = props.action === FormActions.LOGIN ? "success" : "primary";

const dialog = ref(false);
const form = useFormFactory(FormActions.LOGIN);

const credentials: FormLoginCredentials = reactive({
  email: "",
  password: "",
});

const handleChange = (id: string, text: string) => {
  if (useReadablePropName(id) === "email") {
    credentials.email = text;
  } else if (useReadablePropName(id) === "password") {
    credentials.password = text;
  }
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
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
            :label="'Login'"
            :color="'success'"
            :size="'x-large'"
            :btn-classes="['my-5', 'mx-5']"
            @click="useAuthLogin(credentials), (dialog = false)"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

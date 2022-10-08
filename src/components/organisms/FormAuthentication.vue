<script lang="ts">
export default { name: "FormAuthentication" };
</script>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { FormActions, FormLoginCredentials } from "@/composables/types/form";
import { useAuthLogin } from "@/composables/auth";
import { useFormFactory } from "@/composables/factory/formFactory";
import FormInput from "@/components/atoms/FormInput.vue";
import FormControlText from "@/components/molecules/FormControlText.vue";
import { useReadablePropName } from "@/composables/utils/stringsResolvers";

const valid = ref(false);

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
  <v-form v-model="valid" lazy-validation>
    <FormControlText
      v-for="(component, index) in form.controls"
      :key="index"
      :id="component.id"
      :label="component.props!.label"
      @form-input-change="handleChange"
    ></FormControlText>
    <FormInput
      v-for="(input, index) in form.inputs"
      :key="index"
      :label="input.label"
      :action="input.action"
      @click="useAuthLogin(credentials)"
    ></FormInput>
  </v-form>
</template>

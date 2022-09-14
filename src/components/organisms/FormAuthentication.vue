<script lang="ts">
declare var require: any;
export default { name: "FormAuthentication" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { FormInterface } from "@/types/forms/form_authentication";
import FormField from "@/components/molecules/FormField.vue";
import FormButton from "@/components/molecules/FormButton.vue";

const props = defineProps<{
  form: FormInterface;
}>();

const isValid = ref(props.form.valid);
const axios = require("axios").default;

const submitLogin = () => {
  axios
    .create({
      baseURL: "http://127.0.0.1:8000/api/",
    })
    .post("/login", {
      email: props.form.fields[0].model,
      password: props.form.fields[1].model,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<template>
  <v-form ref="form" v-model="isValid" lazy-validation>
    <FormField
      v-for="(field, index) in form.fields"
      v-model="field.model"
      :key="index"
      :field="field"
      :ref="field.model"
    />
    <FormButton
      v-for="(button, index) in form.buttons"
      @click="submitLogin"
      :disabled="isValid"
      :key="index"
      :button="button"
    />
  </v-form>
</template>

<script lang="ts">
export default { name: "FormAuthentication" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { FormInterface } from "@/types/components/form";
import FormField from "@/components/molecules/FormField.vue";
import FormButton from "@/components/molecules/FormButton.vue";
import { useAuthLogin } from "@/composables/auth";

const props = defineProps<{
  form: FormInterface;
}>();

const isValid = ref(props.form.valid);
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
      @click="
        useAuthLogin({
          email: props.form.fields?.[0].model,
          password: props.form.fields?.[1].model,
        })
      "
      :disabled="isValid"
      :key="index"
      :button="button"
    />
  </v-form>
</template>

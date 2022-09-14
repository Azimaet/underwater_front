<script lang="ts">
export default { name: "LoginTemplate" };
</script>

<script setup lang="ts">
import FormAuthentication from "@/components/organisms/FormAuthentication.vue";
import { useFormAuthentication } from "@/composables/formAuthentication";
import { FormActions, FormInterface } from "@/types/forms/form_authentication";

const form: FormInterface = useFormAuthentication(FormActions.LOGIN);
</script>

<template>
  <p>En cours</p>
  <FormAuthentication :form="form" />
</template>

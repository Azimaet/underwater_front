<script lang="ts">
export default { name: "LoginTemplate" };
</script>

<script setup lang="ts">
import FormAuthentication from "@/components/organisms/FormAuthentication.vue";
import { useFormBuilder } from "@/composables/formBuilder";
import { FormActions, FormInterface } from "@/composables/types/form";

const form: FormInterface = useFormBuilder(FormActions.LOGIN);
</script>

<template>
  <FormAuthentication :form="form" />
</template>

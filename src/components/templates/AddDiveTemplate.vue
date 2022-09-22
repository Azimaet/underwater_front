<script lang="ts">
export default { name: "AddDiveTemplate" };
</script>

<script setup lang="ts">
import FormAddDive from "@/components/organisms/FormAddDive.vue";
import { useFormBuilder } from "@/composables/formBuilder";
import { FormActions, FormInterface } from "@/types/components/form";

const form: FormInterface = useFormBuilder(FormActions.ADDADIVE);
</script>

<template>
  <p>Hello World</p>
  <FormAddDive :form="form" />
</template>

<script lang="ts">
export default { name: "FormControlSelect" };
</script>

<script setup lang="ts">
import { Dive } from "@/composables/classes/dive";
import { ref } from "vue";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import { useGQLFormatter } from "../../composables/utils/gqlResultFormatter";

const props = defineProps<{
  id: string;
  label: string;
  index?: number;
  rules?: [];
  options?: any;
  instance: Dive;
}>();

const key: string =
  props.options === GraphqlActions.DIVING_ROLES
    ? "divingRoles"
    : props.options === GraphqlActions.DIVING_ENVIRONMENTS
    ? "divingEnvironments"
    : props.options === GraphqlActions.DIVING_TYPES
    ? "divingTypes"
    : "";

const items = await useGqlQueryManager(props.options).then((result) => {
  return useGQLFormatter(result, key);
});

const value = ref();
</script>

<template>
  <v-col cols="12" sm="6">
    <v-select
      v-model="value"
      :items="items"
      :item-title="'label'"
      :item-value="'value'"
      :label="label"
      variant="outlined"
      persistent-hint
      return-object
      single-line
      @update:modelValue="$emit('formInputChange', props.id, value.id)"
    ></v-select>
  </v-col>
</template>

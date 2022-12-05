<script setup lang="ts">
import { ref } from "vue";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import { DivingThemeInterface } from "@/types/global/divingTheme";

const props = defineProps<{
  id: string;
  label: string;
  value: DivingThemeInterface;
  action: GraphqlActions;
}>();

const key: string =
  props.action === GraphqlActions.DIVING_ROLES
    ? "divingRoles"
    : props.action === GraphqlActions.DIVING_ENVIRONMENTS
    ? "divingEnvironments"
    : "";

const items = await useGqlQueryManager(props.action).then((result) => {
  return result[key as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});

const value = ref();
</script>

<template>
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
</template>

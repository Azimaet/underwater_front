<script setup lang="ts">
import { ref } from "vue";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import { useGQLFormatter } from "@/composables/utils/gqlResultFormatter";
import { DivingThemeInterface } from "@/composables/types/divingTheme";

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
  return useGQLFormatter(result, key);
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
    :class="['pb-5']"
  ></v-select>
</template>

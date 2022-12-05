<script setup lang="ts">
import { ref } from "vue";
import { GraphqlActions } from "@/types/models/graphql";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { DivingThemeInterface } from "@/types/global/divingTheme";

const props = defineProps<{
  id: string;
  label: string;
  value: DivingThemeInterface[];
  action: GraphqlActions;
}>();

const items = await useGqlQueryManager(props.action).then((result) => {
  return result["divingTypes" as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});

const types = ref();
</script>

<template>
  <v-combobox
    v-model="types"
    :items="items"
    :item-title="'label'"
    :item-value="'id'"
    :label="label"
    multiple
    chips
    @update:modelValue="
      $emit(
        'formInputChange',
        props.id,
        types.map((type: any) => type.id)
      )
    "
  ></v-combobox>
</template>

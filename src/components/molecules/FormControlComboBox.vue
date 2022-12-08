<script setup lang="ts">
import { ref } from "vue";
import { GraphqlActions } from "@/types/models/graphql";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import {
  DivingThemeEdgeInterface,
  DivingThemeInterface,
} from "@/types/global/divingTheme";

const props = defineProps<{
  id: string;
  label: string;
  value: {
    edges: DivingThemeEdgeInterface[];
  };
  action: GraphqlActions;
}>();

const items = await useGqlQueryManager(props.action).then((result) => {
  return result["divingTypes" as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});

const types = ref(props.value.edges.map((item) => item.node));
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

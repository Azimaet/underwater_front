<script lang="ts">
export default { name: "FormControlComboBox" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { GraphqlActions } from "@/composables/types/graphql";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { useGQLFormatter } from "@/composables/utils/gqlResultFormatter";
import { DivingThemeInterface } from "@/composables/types/divingTheme";

const props = defineProps<{
  id: string;
  label: string;
  value: DivingThemeInterface[];
  action: GraphqlActions;
}>();

const key: string =
  props.action === GraphqlActions.DIVING_TYPES ? "divingTypes" : "";

const items = await useGqlQueryManager(props.action).then((result) => {
  return useGQLFormatter(result, key);
});

const types = ref();
</script>

<template>
  <v-col cols="12">
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
  </v-col>
</template>

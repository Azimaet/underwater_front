<script lang="ts">
export default { name: "FormControlSelect" };
</script>

<script setup lang="ts">
import { queryDivingEnvironments } from "@/composables/graphql/queryDivingEnvironments";
import { queryDivingRoles } from "@/composables/graphql/queryDivingRoles";
import { Dive } from "@/composables/classes/dive";
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  index?: number;
  rules?: [];
  options?: any;
  instance: Dive;
}>();

let items: any;
switch (props.options) {
  case "QUERY_DIVING_ENVIRONMENTS":
    items = queryDivingEnvironments();
    break;
  case "QUERY_DIVING_ROLES":
    items = queryDivingRoles();
    break;
  default:
    items = [];
    break;
}

const value = ref();
</script>

<template>
  <v-col cols="12" sm="6">
    <v-select
      v-model="value"
      :items="items"
      :label="label"
      variant="outlined"
      @change="$emit('formInputChange', props.id, value)"
    ></v-select>
  </v-col>
</template>

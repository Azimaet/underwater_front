<script lang="ts">
export default { name: "FormSelectField" };
</script>

<script setup lang="ts">
import { queryDivingEnvironments } from "@/composables/graphql/queryDivingEnvironments";
import { queryDivingRoles } from "@/composables/graphql/queryDivingRoles";

const props = defineProps<{
  id: string;
  label: string;
  options?: any;
}>();

let items;
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
</script>

<template>
  <v-col cols="12" sm="6">
    <v-select :items="items" :label="label" variant="outlined"></v-select>
  </v-col>
</template>

<script lang="ts">
export default { name: "StrateDepthTimeCharts" };
</script>

<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import ChartDepthTimeLines from "@/components/molecules/ChartDepthTimeLines.vue";

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.DEPTH_TIME_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  return result;
});
</script>

<template>
  <ChartDepthTimeLines :dives-collection="divesCollection" />
</template>

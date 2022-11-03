<script lang="ts">
export default { name: "StrateDepthCharts" };
</script>

<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import ChartDepthTimeLines from "@/components/molecules/ChartDepthTimeLines.vue";
import ChartDepthPie from "@/components/molecules/ChartDepthPie.vue";

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
  <v-row>
    <v-col cols="4">
      <ChartDepthPie :dives-collection="divesCollection" />
    </v-col>
    <v-col cols="8">
      <ChartDepthTimeLines :dives-collection="divesCollection" />
    </v-col>
  </v-row>
</template>

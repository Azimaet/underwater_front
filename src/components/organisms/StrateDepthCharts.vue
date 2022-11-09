<script setup lang="ts">
import { useDepthDataProvider } from "@/composables/charts/depthDataProvider";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.DEPTH_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  return result;
});

const gasChartData = useDepthDataProvider(divesCollection);
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row>
        <v-col cols="4">
          <ChartDepthPie :data="gasChartData.pie" />
        </v-col>
        <v-col cols="8">
          <ChartDepthLine :data="gasChartData.line" />
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>

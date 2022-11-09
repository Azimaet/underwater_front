<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import { useGasDataProvider } from "@/composables/charts/gasDataProvider";

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.GAS_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  return result;
});

const gasChartData = useGasDataProvider(divesCollection);
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row>
        <v-col cols="3" :align-self="'center'">
          <PanelTemplate :data="gasChartData.panel" :class="['mb-4']" />
        </v-col>
        <v-col cols="3" :align-self="'center'">
          <ChartGasDoughnut :data="gasChartData.doughnut" />
        </v-col>
        <v-col cols="6" :align-self="'center'">
          <ChartGasBar :data="gasChartData.bar" />
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>

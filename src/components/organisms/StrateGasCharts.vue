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
          <v-row>
            <v-col>
              <PanelTemplate :data="gasChartData.panel" :class="['mb-4']" />
              <ChartGasDoughnut :data="gasChartData.doughnut" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>

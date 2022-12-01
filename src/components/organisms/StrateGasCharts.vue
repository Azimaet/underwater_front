<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import { useGasDataProvider } from "@/composables/charts/gasDataProvider";
import { ref } from "vue";

const isDives = ref(false);

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.GAS_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const gasChartData = isDives.value ? useGasDataProvider(divesCollection) : null;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row v-if="gasChartData">
        <v-col cols="3" :align-self="'center'">
          <PanelTemplate :data="gasChartData.panel" :class="['mb-4']" />
          <ChartDoughnut
            :data="gasChartData.doughnut"
            :context="'gas_doughnut'"
            :height="277"
          />
        </v-col>
        <v-col cols="9" :align-self="'center'">
          <ChartBar :data="gasChartData.bar" :context="'gas_bar'" />
        </v-col>
      </v-row>
      <v-card
        v-else
        title="Warning!"
        subtitle="Missing Dives"
        text="Impossible loading datas, because you didn't post dives yet."
        variant="tonal"
      ></v-card>
    </template>
  </StrateTemplate>
</template>

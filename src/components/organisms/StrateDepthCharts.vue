<script setup lang="ts">
import { useDepthDataProvider } from "@/composables/charts/depthDataProvider";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import { ref } from "vue";

const isDives = ref(false);

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.DEPTH_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const depthChartData = isDives.value
  ? useDepthDataProvider(divesCollection)
  : null;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row v-if="depthChartData">
        <v-col cols="3">
          <ChartPie
            :data="depthChartData.pie"
            :context="'depth_pie'"
            :height="277"
          />
          <PanelTemplate :data="depthChartData.panel" :class="['mb-4']" />
        </v-col>
        <v-col cols="9">
          <ChartLine :data="depthChartData.line" :context="'depth_line'" />
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

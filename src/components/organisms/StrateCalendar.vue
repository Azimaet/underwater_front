<script setup lang="ts">
import { useCalendarDataProvider } from "@/composables/charts/calendarDataProvider";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import { ref } from "vue";

const isDives = ref(false);

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.DATES_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const calendarChartDatas = isDives.value
  ? useCalendarDataProvider(divesCollection)
  : null;

console.log(calendarChartDatas);
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row v-if="calendarChartDatas">
        <v-col cols="8">
          <ChartCalendar :data="calendarChartDatas.heatmap" />
        </v-col>
        <v-col cols="4">
          <PanelTemplate :data="calendarChartDatas.panel" />
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

<script setup lang="ts">
import { useCalendarDataProvider } from "@/composables/charts/calendarDataProvider";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.DATES_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  return result;
});

const calendarChartDatas = useCalendarDataProvider(divesCollection);
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row>
        <v-col cols="8">
          <ChartCalendar :data="calendarChartDatas.heatmap" />
        </v-col>
        <v-col cols="4">
          <PanelTemplate :data="calendarChartDatas.panel" />
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>

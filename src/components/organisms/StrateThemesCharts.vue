<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import { useGQLFormatter } from "@/composables/utils/gqlResultFormatter";
import { useThemesDataProvider } from "@/composables/charts/themesDataProvider";
import { ref } from "vue";

const isDives = ref(false);

const divingEnvironmentsItems = await useGqlQueryManager(
  GraphqlActions.DIVING_ENVIRONMENTS
).then((result) => {
  return useGQLFormatter(result, "divingEnvironments");
});

const divingRolesItems = await useGqlQueryManager(
  GraphqlActions.DIVING_ROLES
).then((result) => {
  return useGQLFormatter(result, "divingRoles");
});

const divingTypesItems = await useGqlQueryManager(
  GraphqlActions.DIVING_TYPES
).then((result) => {
  return useGQLFormatter(result, "divingTypes");
});

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.THEMES_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const themesChartData = isDives.value
  ? useThemesDataProvider(divesCollection, [
      divingEnvironmentsItems,
      divingRolesItems,
      divingTypesItems,
    ])
  : null;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row v-if="themesChartData">
        <v-col cols="3">
          <ChartDoughnut
            :data="themesChartData.doughnuts[0]"
            :context="'themes_doughnut'"
          />
        </v-col>
        <v-col cols="3">
          <ChartDoughnut
            :data="themesChartData.doughnuts[1]"
            :context="'themes_doughnut'"
          />
        </v-col>
        <v-col cols="6">
          <ChartProgress :data="themesChartData.progress" />
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

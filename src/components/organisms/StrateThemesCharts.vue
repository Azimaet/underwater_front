<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import { useGQLFormatter } from "@/composables/utils/gqlResultFormatter";
import { useThemesDataProvider } from "@/composables/charts/themesDataProvider";

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
  return result;
});

const themesChartData = useThemesDataProvider(divesCollection, [
  divingEnvironmentsItems,
  divingRolesItems,
  divingTypesItems,
]);
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row>
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
          <!-- <ChartPie :data="themesChartData.pie" :context="'theme_pie'" /> -->
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>

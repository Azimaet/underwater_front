<script lang="ts">
export default { name: "StrateThemeCharts" };
</script>

<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import ChartThemePie from "@/components/molecules/ChartThemePie.vue";
import { useGQLFormatter } from "@/composables/utils/gqlResultFormatter";

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

const divesCollection: ApolloQueryResult<any> = await useGqlQueryManager(
  GraphqlActions.THEMES_BY_DIVES,
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
      <ChartThemePie
        :dives-collection="divesCollection"
        :query="divingEnvironmentsItems"
        :context="'divingEnvironment'"
      />
    </v-col>
    <v-col cols="4">
      <ChartThemePie
        :dives-collection="divesCollection"
        :query="divingRolesItems"
        :context="'divingRole'"
      />
    </v-col>
  </v-row>
</template>

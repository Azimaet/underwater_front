<script lang="ts">
export default { name: "StrateThemeCharts" };
</script>

<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
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
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <v-row>
        <v-col cols="3">
          <ChartThemePie
            :dives-collection="divesCollection"
            :query="divingEnvironmentsItems"
            :context="'divingEnvironment'"
          />
        </v-col>
        <v-col cols="3">
          <ChartThemePie
            :dives-collection="divesCollection"
            :query="divingRolesItems"
            :context="'divingRole'"
          />
        </v-col>
        <v-col cols="6">
          <ChartThemePie
            :dives-collection="divesCollection"
            :query="divingTypesItems"
            :context="'divingType'"
          />
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>

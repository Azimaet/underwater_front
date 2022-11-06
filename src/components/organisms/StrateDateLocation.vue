<script lang="ts">
export default { name: "StrateDateLocation" };
</script>

<script setup lang="ts">
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
</script>

<template>
  <v-row>
    <v-col cols="8">
      <ChartCalendar :dives-collection="divesCollection" />
    </v-col>
    <v-col cols="4"> </v-col>
  </v-row>
</template>

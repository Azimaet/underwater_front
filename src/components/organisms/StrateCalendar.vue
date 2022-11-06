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
  <StrateTemplate>
    <template #strate>
      <v-row>
        <v-col cols="9">
          <ChartCalendar :dives-collection="divesCollection" />
        </v-col>
        <v-col cols="3">
          <ChartPanel :dives-collection="divesCollection" />
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>

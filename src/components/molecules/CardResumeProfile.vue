<script lang="ts">
import { defineComponent } from "vue";
import { useTimeSinceFormatter } from "@/composables/timeSinceFormatter";
export default defineComponent({
  name: "CardResumeProfile",
});
</script>

<script setup lang="ts">
import AvatarProfileChip from "./AvatarProfileChip.vue";
import store from "@/store";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/composables/types/graphql";
import { ApolloQueryResult } from "@apollo/client";

const firstDive: ApolloQueryResult<any> | string = await useGqlQueryManager(
  GraphqlActions.FIRST_DIVE,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  return useTimeSinceFormatter(result.dives.edges[0].node.date);
});

const lastDive: ApolloQueryResult<any> | string = await useGqlQueryManager(
  GraphqlActions.LAST_DIVE,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  return useTimeSinceFormatter(result.dives.edges[0].node.date);
});
</script>

<template>
  <v-card width="100%" :color="'#804E15'" rounded>
    <v-row :class="['mb-5', 'mt-5']">
      <v-col :class="['text-center']">
        <AvatarProfileChip
          :avatar="store.state.user.data.avatar"
          :badge="false"
          :size="75"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="['text-center']">
        <p :class="['text-h6']">{{ store.state.user.data.username }}</p>
        <p :class="['text-subtitle-2']">{{ store.state.user.data.email }}</p>
        <p :class="['text-subtitle-2', 'pb-5']">Diver</p>

        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="['text-center']">
        <p :class="['text-subtitle-2']">First Dive: {{ firstDive }}</p>
        <p :class="['text-subtitle-2', 'pb-5']">Last Dive: {{ lastDive }}</p>

        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useTimeSinceFormatter } from "@/composables/timeSinceFormatter";
import { ApolloQueryResult } from "@apollo/client";
import { useDivesCollectionLoader } from "../../composables/utils/divesCollectionLoader";
import { useDateHighlighter } from "../../composables/charts/dateHighlighter";

const props = defineProps<{
  divesCollection: ApolloQueryResult<any>;
}>();

const dives = useDivesCollectionLoader(props.divesCollection);
const highlights = useDateHighlighter(dives);
</script>

<template>
  <v-card rounded border>
    <v-list>
      <v-list-item
        :title="'Last Dive:'"
        :subtitle="useTimeSinceFormatter(dives[dives.length - 1].date)"
      />
      <v-list-item
        :title="'First Dive:'"
        :subtitle="useTimeSinceFormatter(dives[0].date)"
      />
      <v-list-item
        :title="'Most Dived Month:'"
        :subtitle="
          highlights.month.title + ' (' + highlights.month.subtitle + 'dives)'
        "
      />
      <v-list-item :title="'Years Stats:'">
        <template v-for="year in highlights.years" :key="year">
          <div :class="['display-block', 'v-list-item-subtitle']">
            {{
              year.title +
              " (" +
              year.subtitle +
              "dive" +
              (year.subtitle > 1 ? "s)" : ")")
            }}
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { useTimeSinceFormatter } from "@/composables/timeSinceFormatter";
import { ApolloQueryResult } from "@apollo/client";
import { useDivesCollectionLoader } from "../../composables/utils/divesCollectionLoader";
import { useDateStats } from "@/composables/charts/dateStats";

const props = defineProps<{
  divesCollection: ApolloQueryResult<any>;
}>();

const dives = useDivesCollectionLoader(props.divesCollection);
const highlights = useDateStats(dives);
</script>

<template>
  <v-card rounded border>
    <v-list :style="{ overflow: 'hidden' }">
      <v-row dense>
        <v-col>
          <v-list-item
            :title="'Last Dive'"
            :subtitle="useTimeSinceFormatter(dives[dives.length - 1].date)"
          />
        </v-col>
        <v-col>
          <v-list-item
            :title="'First Dive'"
            :subtitle="useTimeSinceFormatter(dives[0].date)"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-list-item :title="'Most Dived Month'">
            <v-list-item-subtitle>
              <v-icon :icon="'mdi-star'" :size="16" :color="'gold'"></v-icon>
              {{
                highlights.highlightedMonth.title +
                " (" +
                highlights.highlightedMonth.subtitle +
                "dives)"
              }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item
            :title="'Most Dived Year'"
            :subtitle="
              highlights.highlightedYear.title +
              ' (' +
              highlights.highlightedYear.subtitle +
              'dives)'
            "
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-list-item
            :title="'Dives Per Months'"
            :subtitle="highlights.divesPerMonth.toFixed(2) + ' dives.'"
          />
        </v-col>
        <v-col :align-self="'center'" :class="['text-center', 'align-middle']">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props"> Years Stats </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="year in highlights.years" :key="year.title">
                <v-list-item-title>{{
                  year.title +
                  " (" +
                  year.subtitle +
                  "dive" +
                  (year.subtitle > 1 ? "s)" : ")")
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-list>
  </v-card>
</template>

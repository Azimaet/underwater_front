<script setup lang="ts">
import { ApolloQueryResult } from "@apollo/client";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import { useChartCalendatDataProvider } from "@/composables/chartCalendarDataProvider";

const props = defineProps<{
  divesCollection: ApolloQueryResult<any>;
}>();

const datesChartData = useChartCalendatDataProvider(props.divesCollection);
const endDate = new Date();
</script>

<template>
  <div>Current Year</div>
  <calendar-heatmap
    :values="datesChartData"
    :range-color="['#0A2525', '#002222', '#296262', '#99B8B8', '#FFFFFF']"
    :end-date="endDate"
    :round="5"
    :max="4"
  />
</template>

<style lang="scss">
.vch__container {
  .vch__legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .vch__external-legend-wrapper {
    margin: 0 8px;
  }
}
svg.vch__wrapper {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 10px;
  width: 100%;
  .vch__months__labels__wrapper text.vch__month__label {
    font-size: 10px;
  }
  .vch__days__labels__wrapper text.vch__day__label,
  .vch__legend__wrapper text {
    font-size: 9px;
  }
  text.vch__month__label,
  text.vch__day__label,
  .vch__legend__wrapper text {
    fill: #767676;
  }
  rect.vch__day__square:hover {
    stroke: #555;
    stroke-width: 2px;
    paint-order: stroke;
  }
  rect.vch__day__square:focus {
    outline: none;
  }
  &.dark-mode {
    text.vch__month__label,
    text.vch__day__label,
    .vch__legend__wrapper text {
      fill: #000;
    }
  }
}
</style>

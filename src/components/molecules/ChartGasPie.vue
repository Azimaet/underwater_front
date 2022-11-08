<script setup lang="ts">
import { GasData } from "@/types/charts/gas";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

const props = defineProps<{
  data: GasData["pie"];
}>();

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<template>
  <Pie
    :chart-options="{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'left',
        },
        tooltip: {
          enabled: true,
        },
      },
    }"
    :chart-data="{
      labels: props.data.labels,
      datasets: props.data.datasets,
    }"
    :chart-id="'pie-chart'"
  />
</template>

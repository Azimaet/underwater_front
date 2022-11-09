<script setup lang="ts">
import { GasData } from "@/types/charts/gas";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

const props = defineProps<{
  data: GasData["doughnut"];
}>();

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<template>
  <Doughnut
    :chart-options="{
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
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
    :chart-id="'doughnut'"
  />
</template>

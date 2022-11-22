<script setup lang="ts">
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { ThemesData } from "@/types/charts/themes";
import { DepthData } from "@/types/charts/depth";
import { globalOptionsProvider } from "@/composables/charts/globalOptionsProvider";

const props = defineProps<{
  data: ThemesData["pie"] | DepthData["pie"];
  context: string;
}>();

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<template>
  <Pie
    :chart-options="globalOptionsProvider(context, props.data)"
    :chart-data="props.data"
    :chart-id="'pie-chart'"
  />
</template>

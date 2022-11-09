<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
import Zoom from "chartjs-plugin-zoom";
import { DepthData } from "@/types/charts/depth";
import { globalOptionsProvider } from "@/composables/charts/globalOptionsProvider";

const props = defineProps<{
  data: DepthData["line"];
}>();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Zoom,
  TimeScale
);
</script>

<template>
  <Line
    :chart-options="globalOptionsProvider('depth_line', props.data)"
    :chart-data="props.data"
    :chart-id="'line-chart'"
    :style="{ cursor: 'pointer' }"
  />
</template>

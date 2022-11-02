<script lang="ts">
export default { name: "ChartDepthPie" };
</script>

<script setup lang="ts">
import { ApolloQueryResult } from "@apollo/client";
import { useChartDepthDataProvider } from "@/composables/chartDepthDataProvider";
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
  divesCollection: ApolloQueryResult<any>;
}>();

const depthChartData = useChartDepthDataProvider(props.divesCollection, "pie");

const chartData = {
  labels: depthChartData?.chart.labels,
  datasets: [
    {
      backgroundColor: depthChartData?.chart.datasets[0].backgroundColor,
      data: depthChartData?.chart.datasets[0].data,
    },
  ],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
    },
  },
};

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="'pie-chart'"
    :width="400"
    :height="400"
  />
</template>

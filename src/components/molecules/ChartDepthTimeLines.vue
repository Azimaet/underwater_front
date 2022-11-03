<script lang="ts">
export default { name: "ChartDepthLine" };
</script>

<script setup lang="ts">
import { useChartDepthDataProvider } from "@/composables/chartDepthDataProvider";
import { ApolloQueryResult } from "@apollo/client";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

const props = defineProps<{
  divesCollection: ApolloQueryResult<any>;
}>();

const depthChartData = useChartDepthDataProvider(
  props.divesCollection,
  "lines"
);

const chartData = {
  labels: depthChartData?.chart.labels,
  datasets: depthChartData?.chart.datasets,
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  // interaction: {
  //   mode: "index",
  //   intersect: false,
  // },
  stacked: false,
  plugins: {
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y1: {
      type: "linear",
      display: true,
      position: "left",
    },
    y2: {
      type: "linear",
      display: true,
      position: "right",
    },
  },

  //     // grid line settings
  //     grid: {
  //       drawOnChartArea: false, // only want the grid lines for one axis to show up
  //     },
  //   },
  // },
};

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);
</script>

<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="'line-chart'"
  />
</template>

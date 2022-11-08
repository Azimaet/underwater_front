<script setup lang="ts">
import { useChartDepthDataProvider } from "@/composables/chartDepthDataProvider";
import { ApolloQueryResult } from "@apollo/client";
import { Line } from "vue-chartjs";
import { Colors } from "@/plugins/utils/colors";
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
  stacked: false,
  plugins: {
    subtitle: {
      display: true,
      text: "This chart display the last 15 dives. You can zoom or drag to view the ancient ones.",
    },
    tooltip: {
      enabled: true,
    },
    zoom: {
      limits: {
        x: { minRange: 10 },
      },
      pan: {
        enabled: true,
        mode: "x" as const,
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x" as const,
      },
    },
  },
  scales: {
    x: {
      min: chartData.labels.length - 15,
      max: chartData.labels.length,
      ticks: {
        color: Colors.grey_02,
      },
      grid: {
        display: false,
      },
    },
    y: {
      type: "linear" as const,
      display: true,
      ticks: {
        color: Colors.grey_02,
      },
      grid: {
        color: Colors.grey_05,
      },
    },
  },
};

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
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="'line-chart'"
    :style="{ cursor: 'pointer' }"
  />
</template>

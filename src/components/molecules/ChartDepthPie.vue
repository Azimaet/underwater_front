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
    legend: {
      position: "left" as const,
    },
    tooltip: {
      enabled: true,
      bodyFont: {
        family: "Helvetica",
      },
      callbacks: {
        title: (data: any) => {
          return data[0].label + " zone:";
        },
        label: (data: any) => {
          const unit =
            data.dataset.data[data.dataIndex] > 1 ? " dives." : " dive.";
          return data.dataset.data[data.dataIndex] + unit;
        },
      },
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
  />
</template>

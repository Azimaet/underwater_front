<script setup lang="ts">
import { ApolloQueryResult } from "@apollo/client";
import { useThemesDataProvider } from "@/composables/chartThemesDataProvider";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { FormatedThemeQueryResult } from "@/composables/utils/gqlResultFormatter";

const props = defineProps<{
  divesCollection: ApolloQueryResult<any>;
  query: FormatedThemeQueryResult;
  context: string;
}>();

const depthChartData = useThemesDataProvider(
  props.divesCollection,
  props.query,
  props.context
);

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
      position: "bottom" as const,
      align: "start" as const,
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
    id="chart"
  />
</template>

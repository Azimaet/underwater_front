<script lang="ts">
export default { name: "ChartGasPie" };
</script>

<script setup lang="ts">
import { useGasChartDataProvider } from "@/composables/gasChartDataProvider";
import { ApolloQueryResult } from "@apollo/client";
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

const gasChartData = useGasChartDataProvider(props.divesCollection);

const chartData = {
  labels: gasChartData?.chart.labels,
  datasets: [
    {
      backgroundColor: gasChartData?.chart.datasets[0].backgroundColor,
      data: gasChartData?.chart.datasets[0].data,
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
  <div>
    <span>
      Average Consumption (bar per hour):
      {{ gasChartData?.computedDatas.averageConsumption }}bar/hour
    </span>
    <br />
    <span>
      Highest Consumption (bar per hour):
      {{
        gasChartData?.computedDatas.highestConsumption.averageBarPerHour
      }}bar/hour with
      {{ gasChartData?.computedDatas.highestConsumption.label }}
    </span>
    <br />
    <span>
      Lowest Consumption (bar per hour):
      {{
        gasChartData?.computedDatas.lowestConsumption.averageBarPerHour
      }}bar/hour with
      {{ gasChartData?.computedDatas.lowestConsumption.label }}
    </span>
    <br />
  </div>
</template>

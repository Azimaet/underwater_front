import { ApolloQueryResult } from "@apollo/client";
import { Colors } from "@/plugins/utils/colors";
import { useDivesCollectionLoader } from "./utils/divesCollectionLoader";

interface DataSet {
  label?: string;
  id?: string;
  borderColor?: string[];
  pointBackgroundColor?: string[];
  yAxisID?: string;
  backgroundColor: string[];
  data: number[];
}

interface DepthChartData {
  chart: {
    labels: string[];
    datasets: DataSet[];
  };
}

interface State {
  data: DepthChartData;
}

/**
 * GraphQL Requests Factory
 * @param {ApolloQueryResult} entry ApolloQueryResult
 * @param {string} context string
 */
export function useChartDepthDataProvider(
  entry: ApolloQueryResult<any>,
  context: string
) {
  function getDepthGroups(dives: any[]): any[] {
    const depthGroup = [0, 0, 0, 0, 0, 0];

    dives.forEach((dive) => {
      dive.maxDepth <= 19
        ? depthGroup[0]++
        : dive.maxDepth <= 29
        ? depthGroup[1]++
        : dive.maxDepth <= 39
        ? depthGroup[2]++
        : dive.maxDepth <= 49
        ? depthGroup[3]++
        : dive.maxDepth <= 59
        ? depthGroup[4]++
        : depthGroup[5]++;
    });

    return depthGroup;
  }

  /**
   * Gas data loader
   * @param {any[]} dives {any[]}
   */
  function chartDataLoader(dives: any[]) {
    if (context === "lines") {
      state.data.chart.datasets = [
        {
          label: "Max depth. (in meters)",
          id: "maxDepth",
          backgroundColor: [],
          borderColor: [],
          pointBackgroundColor: [],
          data: [],
        },
      ];

      dives.forEach((dive) => {
        state.data.chart.datasets[0].data.push(-Math.abs(dive.maxDepth));
        state.data.chart.labels.push(dive.date.split("T")[0]);
      });

      const highlight = Math.min(
        ...Object.values(state.data.chart.datasets[0].data)
      );

      Object.values(state.data.chart.datasets[0].data).forEach((value) => {
        const color = value === highlight ? Colors.warning : Colors.depth_02;
        state.data.chart.datasets[0].pointBackgroundColor?.push(color);
        state.data.chart.datasets[0].borderColor?.push(color);
        state.data.chart.datasets[0].backgroundColor?.push(color);
      });
    } else if (context === "pie") {
      state.data.chart.labels = [
        "-20m",
        "20-29m",
        "30-39m",
        "40-49m",
        "50-59m",
        "+60m",
      ];
      state.data.chart.datasets = [
        {
          backgroundColor: [
            Colors.depth_01,
            Colors.depth_02,
            Colors.depth_03,
            Colors.depth_04,
            Colors.depth_05,
            Colors.depth_06,
          ],
          data: [],
        },
      ];

      state.data.chart.datasets[0].data = getDepthGroups(dives);
    }
  }

  const state: State = {
    data: {
      chart: {
        labels: [],
        datasets: [],
      },
    },
  };

  function _init() {
    const dives = useDivesCollectionLoader(entry);

    chartDataLoader(dives);
  }

  _init();

  return state.data;
}

import { ApolloQueryResult } from "@apollo/client";

interface DataSet {
  label?: string;
  id?: string;
  borderColor?: string;
  pointBackgroundColor?: string;
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
  /**
   * Depth data loader
   */
  function depthDataLoader() {
    const key = "dives";
    const dives: any[] = [];

    entry[key as keyof typeof entry].edges
      .map((item: { node: unknown }) => item.node)
      .forEach((dive: any) => {
        dives.push(dive);
      });

    return dives;
  }

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
          backgroundColor: ["#D62828"],
          borderColor: "#D62828",
          pointBackgroundColor: "#D62828",
          data: [],
          yAxisID: "y1",
        },
        {
          label: "Total time. (in minutes)",
          id: "totalTime",
          backgroundColor: ["#003049"],
          borderColor: "#003049",
          pointBackgroundColor: "#003049",
          data: [],
          yAxisID: "y2",
        },
      ];

      dives.forEach((dive) => {
        state.data.chart.datasets[0].data.push(-Math.abs(dive.maxDepth));
        state.data.chart.datasets[1].data.push(dive.totalTime);
        state.data.chart.labels.push(dive.date);
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
            "#00a6fb",
            "#00a6fb",
            "#0582ca",
            "#006494",
            "#003554",
            "#051923",
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
    const dives = depthDataLoader();

    chartDataLoader(dives);
  }

  _init();

  return state.data;
}

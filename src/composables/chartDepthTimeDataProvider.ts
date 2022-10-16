import { ApolloQueryResult } from "@apollo/client";

interface LineDataSet {
  label: string;
  id: string;
  backgroundColor: string[];
  data: number[];
  yAxisID: string;
}

interface LineChart {
  labels: string[];
  datasets: LineDataSet[];
}

interface DepthChartData {
  chart: LineChart;
}

interface State {
  data: DepthChartData;
}

/**
 * GraphQL Requests Factory
 * @param {ApolloQueryResult} entry ApolloQueryResult
 */
export function useChartDepthTimeDataProvider(entry: ApolloQueryResult<any>) {
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

    dives.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return dives;
  }

  /**
   * Gas data loader
   * @param {any[]} dives {any[]}
   */
  function chartDataLoader(dives: any[]) {
    dives.forEach((dive) => {
      state.data.chart.datasets[0].data.push(-Math.abs(dive.maxDepth));
      state.data.chart.datasets[1].data.push(dive.totalTime);
      state.data.chart.labels.push(dive.date);
    });
  }

  const state: State = {
    data: {
      chart: {
        labels: [],
        datasets: [
          {
            label: "Max depth. (in meters)",
            id: "maxDepth",
            backgroundColor: [],
            data: [],
            yAxisID: "y1",
          },
          {
            label: "Total time. (in minutes)",
            id: "totalTime",
            backgroundColor: [],
            data: [],
            yAxisID: "y2",
          },
        ],
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

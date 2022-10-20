import { ApolloQueryResult } from "@apollo/client";
import { GasTank } from "@/composables/types/gas";
import { useGasColorGenerator } from "./gasColorGenerator";
import { useGasNameProvider } from "./gasNameProvider";

interface GasDataItem {
  label: string;
  color: string;
  quantity: number;
}

interface PieDataSet {
  backgroundColor: string[];
  data: number[];
}

interface PieChart {
  labels: string[];
  datasets: PieDataSet[];
}

interface ConsumptionData {
  pressure: number;
  label: string;
  averageBarPerHour: number;
}

interface ComputedDatas {
  averageConsumption: number | null;
  highestConsumption: ConsumptionData;
  lowestConsumption: ConsumptionData;
}

interface GasChartData {
  chart: PieChart;
  computedDatas: ComputedDatas;
}

interface State {
  data: GasChartData;
}

/**
 * GraphQL Requests Factory
 * @param {ApolloQueryResult} entry ApolloQueryResult
 */
export function useChartGasDataProvider(entry: ApolloQueryResult<any>) {
  /**
   * Computed Data setter function
   */
  function computedDatasSetter() {
    const key = "dives";
    const consumptions: ConsumptionData[] = [];

    entry[key as keyof typeof entry].edges
      .map((item: { node: unknown }) => item.node)
      .forEach((dive: any) => {
        const totalTime = dive.totalTime;
        const gasTanks = dive.gasTanks;
        const consumption: ConsumptionData = {
          pressure: 0,
          label: "",
          averageBarPerHour: 0,
        };

        gasTanks.forEach((tank: GasTank) => {
          const gasName = useGasNameProvider(tank.gasMix);
          const label = gasName.title + " " + gasName.subtitle;
          consumption.label =
            consumption.label === ""
              ? label
              : consumption.label + " & " + label;

          consumption.pressure += tank.pressureStart - tank.pressureEnd;
        });

        consumption.averageBarPerHour = Math.floor(
          (consumption.pressure / totalTime) * 60
        );

        consumptions.push(consumption);
      });

    state.data.computedDatas.averageConsumption = Math.floor(
      consumptions.reduce((total, next) => total + next.averageBarPerHour, 0) /
        consumptions.length
    );

    state.data.computedDatas.highestConsumption = consumptions.reduce(
      (prev, current) =>
        prev.averageBarPerHour > current.averageBarPerHour ? prev : current
    );

    state.data.computedDatas.lowestConsumption = consumptions.reduce(
      (prev, current) =>
        prev.averageBarPerHour < current.averageBarPerHour ? prev : current
    );
  }

  /**
   * Global GasTanks Retriever function
   * @return {GasTank[]}
   */
  function globalGasTanksRetriever(): GasTank[] {
    const items: GasTank[] = [];
    const key = "dives";

    entry[key as keyof typeof entry].edges
      .map((item: { node: unknown }) => item.node)
      .forEach((dive: any) => {
        const gasTanks = dive.gasTanks;

        gasTanks.forEach((tank: GasTank) => {
          items.push(tank);
        });
      });

    return items;
  }

  /**
   * Gas data loader
   * @param {GasTank[]} tanksCollection {GasTank[]}
   */
  function gasDataLoader(tanksCollection: GasTank[]) {
    const gasDataItemArray: GasDataItem[] = [];

    tanksCollection.forEach((tank: GasTank) => {
      const gasName = useGasNameProvider(tank.gasMix);
      const label = gasName.title + " " + gasName.subtitle;
      const color = useGasColorGenerator(tank.gasMix);

      if (
        gasDataItemArray.length &&
        gasDataItemArray.some((gas) => gas.label === label)
      ) {
        const item = gasDataItemArray.find((gas) => gas.label === label);
        item ? item.quantity++ : null;
      } else {
        gasDataItemArray.push({
          label: label,
          color: color,
          quantity: 1,
        });
      }
    });

    gasDataItemArray.sort((a, b) =>
      a.label > b.label ? 1 : b.label > a.label ? -1 : 0
    );

    gasDataItemArray.forEach((gas) => {
      state.data.chart.datasets[0].data.push(gas.quantity);
      state.data.chart.datasets[0].backgroundColor.push(gas.color);
      state.data.chart.labels.push(gas.label);
    });
  }

  const state: State = {
    data: {
      chart: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      computedDatas: {
        averageConsumption: null,
        highestConsumption: {
          pressure: 0,
          label: "",
          averageBarPerHour: 0,
        },
        lowestConsumption: {
          pressure: 0,
          label: "",
          averageBarPerHour: 0,
        },
      },
    },
  };

  function _init() {
    computedDatasSetter();

    const tanksCollection = globalGasTanksRetriever();

    gasDataLoader(tanksCollection);
  }

  _init();

  return state.data;
}

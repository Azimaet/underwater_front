import {
  GasConsumptionItem,
  GasData,
  GasDoughnutItem,
} from "@/types/charts/gas";

import { ApolloQueryResult } from "@apollo/client";
import { Colors } from "@/plugins/utils/colors";
import { GasTank } from "../types/gas";
import { PanelRow } from "@/types/charts/panel";
import { useDivesCollectionLoader } from "@/composables/utils/divesCollectionLoader";
import { useGasColorGenerator } from "../gasColorGenerator";
import { useGasNameProvider } from "../gasNameProvider";

/**
 * Gas Data Provider function.
 * @param {ApolloQueryResult} collection ApolloQueryResult
 * @return {GasData}
 */
export function useGasDataProvider(
  collection: ApolloQueryResult<any>
): GasData {
  function getConsumptions(dives: any[]): GasConsumptionItem[] {
    const consumptions: GasConsumptionItem[] = [];

    dives.forEach((dive) => {
      const totalTime = dive.totalTime === 0 ? 1 : dive.totalTime;
      const gasTanks = dive.gasTanks;
      const consumption: GasConsumptionItem = {
        startPressure: 0,
        endPressure: 0,
        pressure: 0,
        label: "",
        barPerHour: 0,
        date: dive.date.split("T")[0],
        tanks: 0,
        totalTime: dive.totalTime,
      };

      gasTanks.forEach((tank: GasTank) => {
        const gasName = useGasNameProvider(tank.gasMix);
        const label = gasName.title + " " + gasName.subtitle;

        consumption.tanks++;
        consumption.label =
          consumption.label === "" ? label : consumption.label + " & " + label;

        consumption.startPressure += tank.pressureStart;
        consumption.endPressure += tank.pressureEnd;
        consumption.pressure += tank.pressureStart - tank.pressureEnd;
      });

      consumption.barPerHour = Math.floor(
        (consumption.pressure / totalTime) * 60
      );

      consumptions.push(consumption);
    });

    return consumptions;
  }

  function loadDoughnutData(gasTanks: GasTank[]) {
    const gasDoughnutItems: GasDoughnutItem[] = [];
    const data: number[] = [];
    const labels: string[] = [];
    const backgroundColors: string[] = [];

    gasTanks.forEach((tank: GasTank) => {
      const gasName = useGasNameProvider(tank.gasMix);
      const label = gasName.title + " " + gasName.subtitle;
      const color = useGasColorGenerator(tank.gasMix);

      if (
        gasDoughnutItems.length &&
        gasDoughnutItems.some((gas) => gas.label === label)
      ) {
        const item = gasDoughnutItems.find((gas) => gas.label === label);
        item ? item.quantity++ : null;
      } else {
        gasDoughnutItems.push({
          label: label,
          color: color,
          quantity: 1,
        });
      }
    });

    gasDoughnutItems.sort((a, b) =>
      a.label > b.label ? 1 : b.label > a.label ? -1 : 0
    );

    gasDoughnutItems.forEach((gas) => {
      data.push(gas.quantity);
      backgroundColors.push(gas.color);
      labels.push(gas.label);
    });

    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data: data,
        },
      ],
    };
  }

  function loadBarData(consumptions: GasConsumptionItem[]) {
    const labels: string[] = [];
    const endPressure: number[] = [];
    const startPressure: number[] = [];
    const customData: object[] = [];

    consumptions.forEach((consumption) => {
      labels.push(consumption.date);
      endPressure.push(consumption.endPressure);
      startPressure.push(consumption.startPressure);
      customData.push({
        tanks: consumption.tanks,
        pressure: consumption.pressure,
        totalTime: consumption.totalTime,
        label: consumption.label,
      });
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "End dive pressure (in bar.)",
          backgroundColor: [Colors.gas_end_pressure],
          data: endPressure,
          customData: customData,
        },
        {
          fill: false,
          label: "Start dive pressure (in bar.)",
          backgroundColor: [Colors.gas_start_pressure],
          data: startPressure,
          customData: customData,
        },
      ],
    };
  }

  function loadPanelData(consumptions: GasConsumptionItem[]): PanelRow[] {
    const average =
      Math.floor(
        consumptions.reduce((total, next) => total + next.barPerHour, 0) /
          consumptions.length
      ) + "bar/hour";

    const highest = () => {
      const consumption = consumptions.reduce((prev, current) =>
        prev.barPerHour > current.barPerHour ? prev : current
      );

      return consumption.barPerHour + "bar/hour, with " + consumption.label;
    };

    const lowest = () => {
      const consumption = consumptions.reduce((prev, current) =>
        prev.barPerHour < current.barPerHour ? prev : current
      );

      return consumption.barPerHour + "bar/hour, with " + consumption.label;
    };

    return [
      {
        cols: [
          {
            title: "Average Consumption",
            subtitle: [average],
          },
        ],
      },
      {
        cols: [
          {
            title: "Highest Consumption",
            subtitle: [highest()],
          },
        ],
      },
      {
        cols: [
          {
            title: "Lowest Consumption",
            subtitle: [lowest()],
            highlight: true,
          },
        ],
      },
    ];
  }

  const dives = useDivesCollectionLoader(collection) as any[];
  const gasTanks = useDivesCollectionLoader(collection, "gasTanks") as any[];
  const consumptions = getConsumptions(dives);

  return {
    doughnut: loadDoughnutData(gasTanks),
    bar: loadBarData(consumptions),
    panel: {
      rows: loadPanelData(consumptions),
    },
  };
}

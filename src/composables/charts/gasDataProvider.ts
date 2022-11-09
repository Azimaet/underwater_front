import {
  GasConsumptionItem,
  GasData,
  GasDoughnutItem,
} from "@/types/charts/gas";

import { ApolloQueryResult } from "@apollo/client";
import { GasTank } from "../types/gas";
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

  function loadPanelData(dives: any[]) {
    const consumptions: GasConsumptionItem[] = [];

    dives.forEach((dive) => {
      const totalTime = dive.totalTime === 0 ? 1 : dive.totalTime;
      const gasTanks = dive.gasTanks;
      const consumption: GasConsumptionItem = {
        pressure: 0,
        label: "",
        barPerHour: 0,
      };

      gasTanks.forEach((tank: GasTank) => {
        const gasName = useGasNameProvider(tank.gasMix);
        const label = gasName.title + " " + gasName.subtitle;
        consumption.label =
          consumption.label === "" ? label : consumption.label + " & " + label;

        consumption.pressure += tank.pressureStart - tank.pressureEnd;
      });

      consumption.barPerHour = Math.floor(
        (consumption.pressure / totalTime) * 60
      );

      consumptions.push(consumption);
    });

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

    return {
      rows: [
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
      ],
    };
  }

  const dives = useDivesCollectionLoader(collection);
  const gasTanks = useDivesCollectionLoader(collection, "gasTanks");

  return {
    doughnut: loadDoughnutData(gasTanks),
    line: {},
    panel: loadPanelData(dives),
  };
}

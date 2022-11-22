import { ApolloQueryResult } from "@apollo/client";
import { ChartData } from "../../types/charts/globalChart";
import { FormatedThemeQueryResult } from "../utils/gqlResultFormatter";
import { GraphColors } from "../types/graphColors";
import { PanelRow } from "../../types/charts/panel";
import { ThemesData } from "@/types/charts/themes";
import { useDivesCollectionLoader } from "../utils/divesCollectionLoader";

/**
 * Themes Data Provider function.
 * @param {ApolloQueryResult} collection ApolloQueryResult
 * @param {FormatedThemeQueryResult[]} queries FormatedThemeQueryResult[]
 * @return {ThemesData}
 */
export function useThemesDataProvider(
  collection: ApolloQueryResult<any>,
  queries: FormatedThemeQueryResult[]
): ThemesData {
  function getLabels(data: object, query: FormatedThemeQueryResult) {
    const labels: string[] = [];

    Object.keys(data).forEach((key) => {
      const token = "%" + key + "%";
      const theme = query.filter((theme: any) => token === theme.token);
      labels.push(theme[0].label);
    });

    return labels;
  }

  function getKeys(data: object) {
    const keys: string[] = [];

    Object.keys(data).forEach((key) => {
      keys.push(key);
    });

    return keys;
  }

  function getColors(data: object) {
    const values: string[] = [];

    Object.keys(data).forEach((key) => {
      const colorKey = "THEME_" + key.toUpperCase();
      values.push(GraphColors[colorKey as keyof typeof GraphColors]);
    });

    return values;
  }

  function getDatas(data: object) {
    const values: number[] = [];

    Object.keys(data).forEach((key) => {
      values.push(data[key as keyof typeof data]);
    });

    return values;
  }

  function getProgressDatas(data: object) {
    const values: number[] = [];
    const sumValues = Object.values(data).reduce((a, b) => a + b, 0);

    Object.keys(data).forEach((key) => {
      const value = (data[key as keyof typeof data] * 100) / sumValues;
      values.push(Math.floor(value));
    });

    return values;
  }

  function loadDoughnutEnvironmentsData(data: any): ChartData {
    return {
      labels: getLabels(data, queries[0]),
      datasets: [
        {
          backgroundColor: getColors(data),
          data: getDatas(data),
        },
      ],
    };
  }

  function loadDoughnutRolesData(data: any): ChartData {
    return {
      labels: getLabels(data, queries[1]),
      datasets: [
        {
          backgroundColor: getColors(data),
          data: getDatas(data),
        },
      ],
    };
  }

  function loadProgressData(data: any): ChartData {
    return {
      labels: getLabels(data, queries[2]),
      datasets: [
        {
          backgroundColor: getColors(data),
          data: getDatas(data),
          percentage: getProgressDatas(data),
          token: getKeys(data),
        },
      ],
    };
  }

  function loadPanelData(data: any): PanelRow[] {
    return [
      {
        cols: [
          {
            title: "Deepest Dive",
            subtitle: ["-"],
            highlight: true,
          },
        ],
      },
      {
        cols: [
          {
            title: "Average Depths",
            subtitle: ["-m"],
          },
        ],
      },
    ];
  }

  const dataEnvs = Object.fromEntries(
    Object.entries(
      useDivesCollectionLoader(collection, "themesTokens", "divingEnvironment")
    ).sort(([, a], [, b]) => b - a)
  );

  const dataRoles = Object.fromEntries(
    Object.entries(
      useDivesCollectionLoader(collection, "themesTokens", "divingRole")
    ).sort(([, a], [, b]) => b - a)
  );

  const dataTypes = Object.fromEntries(
    Object.entries(
      useDivesCollectionLoader(collection, "themesTokens", "divingType")
    ).sort(([, a], [, b]) => b - a)
  );

  console.log(collection);

  return {
    doughnuts: [
      loadDoughnutEnvironmentsData(dataEnvs),
      loadDoughnutRolesData(dataRoles),
    ],
    progress: loadProgressData(dataTypes),
    panel: {
      rows: loadPanelData(dataTypes),
    },
  };
}

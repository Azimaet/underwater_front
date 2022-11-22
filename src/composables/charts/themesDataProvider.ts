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

  function loadPieData(data: any): ChartData {
    return {
      labels: getLabels(data, queries[2]),
      datasets: [
        {
          backgroundColor: getColors(data),
          data: getDatas(data),
        },
      ],
    };
  }

  function loadPanelData(data: any) {
    return {
      rows: [
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
      ],
    };
  }

  const dataEnvs = useDivesCollectionLoader(
    collection,
    "themesTokens",
    "divingEnvironment"
  );
  const dataRoles = useDivesCollectionLoader(
    collection,
    "themesTokens",
    "divingRole"
  );
  const dataTypes = useDivesCollectionLoader(
    collection,
    "themesTokens",
    "divingType"
  );

  return {
    doughnuts: [
      loadDoughnutEnvironmentsData(dataEnvs),
      loadDoughnutRolesData(dataRoles),
    ],
    pie: loadPieData(dataTypes),
    panel: loadPanelData(dataTypes),
  };
}

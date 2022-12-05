import { ApolloQueryResult } from "@apollo/client";
import { ChartData } from "@/types/charts/globalChart";
import { Colors } from "@/plugins/utils/colors";
import { DivingThemeInterface } from "@/types/global/divingTheme";
import { ThemesData } from "@/types/charts/themes";
import { useDivesCollectionLoader } from "../utils/divesCollectionLoader";
interface FormatedThemeQueryResult {
  [x: string]: any;
  id: string;
  label: string;
  token: string;
}

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
  function getLabels(
    data: Record<string, number>,
    query: FormatedThemeQueryResult
  ) {
    const labels: string[] = [];

    Object.keys(data).forEach((key) => {
      const token = "%" + key + "%";
      const theme = query.filter(
        (theme: DivingThemeInterface) => token === theme.token
      );
      labels.push(theme[0].label);
    });

    return labels;
  }

  function getKeys(data: Record<string, number>) {
    const keys: string[] = [];

    Object.keys(data).forEach((key) => {
      keys.push(key);
    });

    return keys;
  }

  function getColors(data: Record<string, number>) {
    const values: string[] = [];

    Object.keys(data).forEach((key) => {
      const colorKey = "theme_" + key;
      values.push(Colors[colorKey as keyof typeof Colors]);
    });

    return values;
  }

  function getDatas(data: Record<string, number>) {
    const values: number[] = [];

    Object.keys(data).forEach((key) => {
      values.push(data[key as keyof typeof data]);
    });

    return values;
  }

  function getProgressDatas(data: Record<string, number>) {
    const values: number[] = [];
    const sumValues = Object.values(data).reduce((a, b) => a + b, 0);

    Object.keys(data).forEach((key) => {
      const value = (data[key as keyof typeof data] * 100) / sumValues;
      values.push(Math.floor(value));
    });

    return values;
  }

  function loadData(context: string): ChartData {
    return {
      labels:
        context === "divingEnvironment"
          ? getLabels(dataEnvs, queries[0])
          : context === "divingRole"
          ? getLabels(dataRoles, queries[1])
          : getLabels(dataTypes, queries[2]),
      datasets: [
        {
          backgroundColor:
            context === "divingEnvironment"
              ? getColors(dataEnvs)
              : context === "divingRole"
              ? getColors(dataRoles)
              : getColors(dataTypes),
          data:
            context === "divingEnvironment"
              ? getDatas(dataEnvs)
              : context === "divingRole"
              ? getDatas(dataRoles)
              : getDatas(dataTypes),
          percentage:
            context === "divingType" ? getProgressDatas(dataTypes) : undefined,
          token: context === "divingType" ? getKeys(dataTypes) : undefined,
        },
      ],
    };
  }

  const dataEnvs = Object.fromEntries(
    Object.entries(
      useDivesCollectionLoader(collection, "themesTokens", "divingEnvironment")
    ).sort(([, a], [, b]) => b - a)
  ) as Record<string, number>;

  const dataRoles = Object.fromEntries(
    Object.entries(
      useDivesCollectionLoader(collection, "themesTokens", "divingRole")
    ).sort(([, a], [, b]) => b - a)
  ) as Record<string, number>;

  const dataTypes = Object.fromEntries(
    Object.entries(
      useDivesCollectionLoader(collection, "themesTokens", "divingType")
    ).sort(([, a], [, b]) => b - a)
  ) as Record<string, number>;

  return {
    doughnuts: [loadData("divingEnvironment"), loadData("divingRole")],
    progress: loadData("divingType"),
  };
}
